import UniversitySelection from './components/UniversitySelection';

interface HomePageProps {
    onNavigate: (university: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
    return (
        /* This container provides the background gradient and centers content */
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center justify-center p-6 text-center">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-400/10" />
            <div className="pointer-events-none absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-indigo-300/40 blur-3xl dark:bg-indigo-400/10" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.75),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.65),rgba(2,6,23,0))]" />

            <div className="relative w-full max-w-3xl rounded-[28px] border border-white/60 bg-white/80 p-10 shadow-[0_25px_80px_-45px_rgba(15,23,42,0.5)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/80">
                <span className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 shadow-sm dark:border-slate-600/70 dark:bg-slate-900/60 dark:text-slate-200">
                    Scholarships, simplified
                </span>

                <h1 className="font-display text-5xl md:text-6xl font-semibold text-slate-900 dark:text-white mb-6 leading-tight">
                    Welcome to AwardScope
                </h1>

                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
                    A full-stack web application that helps UBC students discover
                    scholarships, bursaries, and financial aid opportunities
                    they're eligible for.
                </p>

                <div className="w-full">
                    <UniversitySelection onSelect={onNavigate} />
                </div>
            </div>
        </div>
    );
}
