import { CosmicBackground } from './components/CosmicBackground';
import { GraduationCap, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: () => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="h-full relative font-sans text-slate-200 selection:bg-cyan-500/30 selection:text-white overflow-hidden flex flex-col">
      <CosmicBackground />

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-8 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/10 backdrop-blur-md">
            <GraduationCap className="text-white w-4 h-4" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-slate-300 uppercase">AwardScope</span>
        </div>
        <button
          onClick={onNavigate}
          className="pointer-events-auto bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-xs font-bold py-2 px-4 rounded-lg transition-all shadow-lg shadow-cyan-500/20 active:scale-95 uppercase tracking-wider"
        >
          Launch App
        </button>
      </header>

      <main className="relative z-10 flex-1 w-full flex flex-col items-center justify-center px-4 md:px-8 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 text-[10px] uppercase tracking-widest font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            v2.0 Now Live
          </div>

          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-tight">
            Scholarships,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-semibold">Decoded.</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            AwardScope uses advanced AI to match UBC students with financial aid opportunities they actually qualify for. No more endless searching.
          </p>

          <div className="pt-8 flex justify-center gap-4">
            <button
              onClick={onNavigate}
              className="group relative px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg shadow-2xl shadow-white/10 hover:shadow-cyan-500/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2"
            >
              Find My Awards
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-6 w-full text-center pointer-events-none z-10">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-medium">Built for HackTheCoast 2026</p>
      </footer>
    </div>
  );
}