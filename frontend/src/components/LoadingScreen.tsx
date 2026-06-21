'use client';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="relative mb-6 flex items-center justify-center">
        <div className="absolute h-24 w-24 animate-ping rounded-full bg-blue-500 opacity-20"></div>
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-xl shadow-blue-900/50">
          <span className="text-3xl font-black tracking-tighter text-white">VV</span>
        </div>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">VocaVault</h2>
      <p className="mb-8 text-sm font-medium text-slate-500 dark:text-slate-400">Loading your vocabulary library...</p>
      <div className="flex gap-2">
        <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '0ms' }}></div>
        <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '150ms' }}></div>
        <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}
