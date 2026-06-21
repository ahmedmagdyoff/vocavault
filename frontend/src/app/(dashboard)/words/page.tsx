'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Search, Trash2, Edit } from 'lucide-react';
import { wordsApi } from '@/lib/words';
import { categoriesApi } from '@/lib/categories';
import { Word, Category } from '@/types';
import toast from 'react-hot-toast';

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [wordsRes, catsRes] = await Promise.all([
        wordsApi.getWords(),
        categoriesApi.getCategories()
      ]);
      setWords(wordsRes.data);
      setCategories(catsRes.data);
    } catch (error) {
      toast.error('Failed to load vocabulary');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this word?')) {
      try {
        await wordsApi.deleteWord(id);
        toast.success('Word deleted successfully');
        setWords(words.filter(w => w.id !== id));
      } catch (error) {
        toast.error('Failed to delete word');
      }
    }
  };

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
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center text-slate-500 py-12">Loading vocabulary...</div>
      ) : words.length === 0 ? (
        <div className="text-center text-slate-500 py-12">No words found. Start building your library!</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {words.map((word) => (
            <div key={word.id} className="group relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100 flex gap-2">
                <button className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(word.id)} className="text-slate-400 hover:text-red-600 dark:hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <span className="mb-4 inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {word.category?.name || 'Unknown'}
              </span>
              <h3 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">{word.word}</h3>
              <p className="mb-4 text-lg text-slate-600 dark:text-slate-400">{word.meaning}</p>
              
              {word.notes && (
                <div className="mt-4 rounded-md bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
                  <span className="font-medium">Note:</span> {word.notes}
                </div>
              )}

              {word.videos && word.videos.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 mb-2">Found in {word.videos.length} videos</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
