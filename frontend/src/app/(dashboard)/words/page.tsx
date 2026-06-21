'use client';

import { Button } from '@/components/ui/Button';
import { Plus, BookOpen, Search, Trash2, Edit } from 'lucide-react';

export default function WordsPage() {
  // Mock data for UI
  const mockWords = [
    { id: 1, word: 'hug', meaning: 'يعانق', category: 'Verb', notes: 'Common in daily conversations' },
    { id: 2, word: 'ephemeral', meaning: 'عابر / مؤقت', category: 'Adjective', notes: 'Advanced vocabulary' },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Words</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">Your personal vocabulary library.</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="mr-2 h-4 w-4" /> Add Word
        </Button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex flex-1 items-center rounded-md border border-slate-200 bg-white px-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search words..."
            className="w-full border-0 bg-transparent py-2 pl-3 focus:ring-0 sm:text-sm dark:text-white"
          />
        </div>
        <select className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
          <option value="">All Categories</option>
          <option value="Noun">Noun</option>
          <option value="Verb">Verb</option>
          <option value="Adjective">Adjective</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockWords.map((word) => (
          <div key={word.id} className="group relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100 flex gap-2">
              <button className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Edit className="h-4 w-4" />
              </button>
              <button className="text-slate-400 hover:text-red-600 dark:hover:text-red-400">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {word.category}
            </span>
            <h3 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">{word.word}</h3>
            <p className="mb-4 text-lg text-slate-600 dark:text-slate-400">{word.meaning}</p>
            
            {word.notes && (
              <div className="mt-4 rounded-md bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
                <span className="font-medium">Note:</span> {word.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
