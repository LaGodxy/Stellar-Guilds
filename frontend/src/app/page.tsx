import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex flex-col gap-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Stellar Guilds</h1>
        <p className="text-xl text-gray-600">User Profile & Reputation Dashboard</p>
        
        <Link 
          href="/profile/GABX...9KLM"
          className="group flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-all hover:bg-blue-700"
        >
          View Demo Profile
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        
        <p className="mt-4 text-gray-400">
           Demo Address: GABX...9KLM
        </p>
      </div>
    </main>
  );
}
