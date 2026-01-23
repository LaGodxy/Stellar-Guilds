#[cfg(test)]
mod tests {
    use soroban_sdk::{testutils::Address as _, Address, Env, String, Vec as SorobanVec};

    use crate::guild::membership::{add_member, create_guild};
    use crate::guild::types::Role;
    use crate::governance::execution::execute_proposal;
    use crate::governance::proposals::{create_proposal, get_proposal, get_active_proposals};
    use crate::governance::types::{ExecutionPayload, GovernanceConfig, ProposalStatus, ProposalType, VoteDecision};
    use crate::governance::voting::{delegate_vote, finalize_proposal, undelegate_vote, vote};
    use crate::guild::storage as guild_storage;

    fn setup_env() -> Env {
        let env = Env::default();
        env.budget().reset_unlimited();
        env
    }

    fn setup_guild_with_members(env: &Env) -> (u64, Address, Address, Address, Address) {
        let owner = Address::random(env);
        let admin = Address::random(env);
        let member = Address::random(env);
        let contributor = Address::random(env);

        owner.mock_all_auths();
        admin.mock_all_auths();
        member.mock_all_auths();
        contributor.mock_all_auths();

        let name = String::from_str(env, "Gov Guild");
        let desc = String::from_str(env, "Governance test guild");

        let guild_id = create_guild(env, name, desc, owner.clone()).unwrap();

        // add roles
        add_member(env, guild_id, admin.clone(), Role::Admin, owner.clone()).unwrap();
        add_member(env, guild_id, member.clone(), Role::Member, owner.clone()).unwrap();
        add_member(env, guild_id, contributor.clone(), Role::Contributor, owner.clone()).unwrap();

        (guild_id, owner, admin, member, contributor)
    }

    #[test]
    fn test_create_proposal_and_vote_weights() {
        let env = setup_env();
        let (guild_id, owner, admin, member, contributor) = setup_guild_with_members(&env);

        let payload = ExecutionPayload::GeneralDecision { meta: String::from_str(&env, "Test") };

        // owner creates proposal
        let proposal_id = create_proposal(
            &env,
            guild_id,
            owner.clone(),
            ProposalType::GeneralDecision,
            String::from_str(&env, "Test Proposal"),
            String::from_str(&env, "Description"),
            payload,
        );

        // voting: owner FOR, admin FOR, member AGAINST, contributor ABSTAIN
        vote(&env, proposal_id, owner.clone(), VoteDecision::For);
        vote(&env, proposal_id, admin.clone(), VoteDecision::For);
        vote(&env, proposal_id, member.clone(), VoteDecision::Against);
        vote(&env, proposal_id, contributor.clone(), VoteDecision::Abstain);

        // fast-forward time to after voting_end
        let mut proposal = get_proposal(&env, proposal_id);
        let end = proposal.voting_end;
        env.ledger().set_timestamp(end + 1);

        let status = finalize_proposal(&env, proposal_id);
        assert_eq!(status, ProposalStatus::Passed);

        proposal = get_proposal(&env, proposal_id);
        // weights: owner 10 + admin 5 for FOR = 15; member AGAINST 2; contributor ABSTAIN 1
        assert_eq!(proposal.votes_for, 15);
        assert_eq!(proposal.votes_against, 2);
        assert_eq!(proposal.votes_abstain, 1);
    }

    #[test]
    fn test_vote_delegation_chain() {
        let env = setup_env();
        let (guild_id, owner, admin, member, contributor) = setup_guild_with_members(&env);

        let payload = ExecutionPayload::GeneralDecision { meta: String::from_str(&env, "Delegation") };
        let proposal_id = create_proposal(
            &env,
            guild_id,
            owner.clone(),
            ProposalType::GeneralDecision,
            String::from_str(&env, "Delegation Proposal"),
            String::from_str(&env, "Delegation"),
            payload,
        );

        // member delegates to admin, contributor delegates to member (chain: contributor -> member -> admin)
        delegate_vote(&env, guild_id, member.clone(), admin.clone());
        delegate_vote(&env, guild_id, contributor.clone(), member.clone());

        // only admin votes FOR
        vote(&env, proposal_id, admin.clone(), VoteDecision::For);

        let mut proposal = get_proposal(&env, proposal_id);
        let end = proposal.voting_end;
        env.ledger().set_timestamp(end + 1);

        let status = finalize_proposal(&env, proposal_id);
        assert_eq!(status, ProposalStatus::Passed);

        proposal = get_proposal(&env, proposal_id);
        // weights: owner did not vote; admin FOR (weight 5) + member FOR via delegation (2) + contributor FOR via chain (1)
        assert_eq!(proposal.votes_for, 8);
    }

    #[test]
    fn test_add_member_proposal_execution() {
        let env = setup_env();
        let (guild_id, owner, admin, member, _contributor) = setup_guild_with_members(&env);

        let new_addr = Address::random(&env);
        new_addr.mock_all_auths();

        let payload = ExecutionPayload::AddMember { address: new_addr.clone(), role: Role::Member };
        let proposal_id = create_proposal(
            &env,
            guild_id,
            owner.clone(),
            ProposalType::AddMember,
            String::from_str(&env, "Add Member"),
            String::from_str(&env, "Add new member"),
            payload,
        );

        // owner and admin vote FOR to ensure passage
        vote(&env, proposal_id, owner.clone(), VoteDecision::For);
        vote(&env, proposal_id, admin.clone(), VoteDecision::For);

        let mut proposal = get_proposal(&env, proposal_id);
        let end = proposal.voting_end;
        env.ledger().set_timestamp(end + 1);

        let status = finalize_proposal(&env, proposal_id);
        assert_eq!(status, ProposalStatus::Passed);

        let exec_ok = execute_proposal(&env, proposal_id);
        assert!(exec_ok);

        // new member should exist now
        let added = guild_storage::get_member(&env, guild_id, &new_addr).unwrap();
        assert_eq!(added.role, Role::Member);

        proposal = get_proposal(&env, proposal_id);
        assert_eq!(proposal.status, ProposalStatus::Executed);
    }

    #[test]
    fn test_quorum_rejection() {
        let env = setup_env();
        let (guild_id, owner, admin, member, contributor) = setup_guild_with_members(&env);

        // only contributor (weight 1 of total 18) votes, below quorum 30%
        let payload = ExecutionPayload::GeneralDecision { meta: String::from_str(&env, "Low quorum") };
        let proposal_id = create_proposal(
            &env,
            guild_id,
            owner.clone(),
            ProposalType::GeneralDecision,
            String::from_str(&env, "Low Quorum"),
            String::from_str(&env, "Low quorum"),
            payload,
        );

        vote(&env, proposal_id, contributor.clone(), VoteDecision::For);

        let mut proposal = get_proposal(&env, proposal_id);
        let end = proposal.voting_end;
        env.ledger().set_timestamp(end + 1);

        let status = finalize_proposal(&env, proposal_id);
        assert_eq!(status, ProposalStatus::Rejected);
    }

    #[test]
    fn test_config_update_only_owner() {
        let env = setup_env();
        let (guild_id, owner, admin, _member, _contributor) = setup_guild_with_members(&env);

        let mut cfg = GovernanceConfig::default();
        cfg.quorum_percentage = 40;

        // owner can update
        let res = crate::governance::proposals::update_governance_config(&env, guild_id, owner.clone(), cfg.clone());
        assert!(res);

        // admin cannot update
        let result = std::panic::catch_unwind(|| {
            crate::governance::proposals::update_governance_config(&env, guild_id, admin.clone(), cfg.clone());
        });
        assert!(result.is_err());
    }
}
