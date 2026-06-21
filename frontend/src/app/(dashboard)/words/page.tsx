'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Search, Trash2, Edit } from 'lucide-react';
import { wordsApi } from '@/lib/words';
import { categoriesApi } from '@/lib/categories';
import { videosApi } from '@/lib/videos';
import { Word, Category, Video } from '@/types';
import toast from 'react-hot-toast';

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [videoSearchQuery, setVideoSearchQuery] = useState('');

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    word: '',
    meaning: '',
    category_id: '',
    video_ids: [] as number[],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [wordsRes, catsRes, videosRes] = await Promise.all([
        wordsApi.getWords(),
        categoriesApi.getCategories(),
        videosApi.getVideos()
      ]);
      setWords(wordsRes.data);
      setCategories(catsRes.data);
      setVideos(videosRes.data);
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

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ word: '', meaning: '', category_id: '', video_ids: [] });
    setVideoSearchQuery('');
    setIsModalOpen(true);
  };

  const openEditModal = (word: Word) => {
    setEditingId(word.id);
    setFormData({
      word: word.word,
      meaning: word.meaning,
      category_id: word.category_id ? word.category_id.toString() : '',
      video_ids: word.videos?.map(v => v.id) || [],
    });
    setVideoSearchQuery('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        category_id: formData.category_id ? parseInt(formData.category_id) : undefined,
      };

      if (editingId) {
        const res = await wordsApi.updateWord(editingId, payload);
        setWords(words.map(w => w.id === editingId ? res.data : w));
        toast.success('Word updated successfully');
      } else {
        const res = await wordsApi.createWord(payload);
        setWords([res.data, ...words]);
        toast.success('Word added successfully');
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error(`Failed to ${editingId ? 'update' : 'add'} word`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredWords = useMemo(() => {
    return words.filter((word) => {
      const matchesSearch = word.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            word.meaning.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? word.category?.id?.toString() === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [words, searchQuery, selectedCategory]);

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Words</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">Your personal vocabulary library.</p>
        </div>
        <Button onClick={openAddModal} className="mt-4 sm:mt-0">
          <Plus className="mr-2 h-4 w-4" /> Add Word
        </Button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex flex-1 items-center rounded-md border border-slate-200 bg-white px-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search words..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-0 bg-transparent py-2 pl-3 focus:ring-0 sm:text-sm dark:text-white"
          />
        </div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        >
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
      ) : filteredWords.length === 0 ? (
        <div className="text-center text-slate-500 py-12">No words found matching your filters.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWords.map((word) => (
            <div key={word.id} className="group relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100 flex gap-2">
                <button onClick={() => openEditModal(word)} className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
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

              {word.videos && word.videos.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 mb-2">Found in {word.videos.length} videos</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">{editingId ? 'Edit Word' : 'Add Word'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Word</label>
                <input required type="text" value={formData.word} onChange={e => setFormData({...formData, word: e.target.value})} className="mt-1 w-full rounded-md border border-slate-300 p-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Meaning</label>
                <textarea required rows={2} value={formData.meaning} onChange={e => setFormData({...formData, meaning: e.target.value})} className="mt-1 w-full rounded-md border border-slate-300 p-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                <select required value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} className="mt-1 w-full rounded-md border border-slate-300 p-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Videos</label>
                <input 
                  type="text" 
                  placeholder="Search videos..." 
                  value={videoSearchQuery}
                  onChange={(e) => setVideoSearchQuery(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 p-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <div className="mt-2 max-h-40 overflow-y-auto rounded-md border border-slate-200 p-2 dark:border-slate-800">
                  {videos.filter(v => v.title.toLowerCase().includes(videoSearchQuery.toLowerCase())).map(video => (
                    <label key={video.id} className="flex items-center space-x-2 py-1 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.video_ids.includes(video.id)}
                        onChange={(e) => {
                          const newVideoIds = e.target.checked 
                            ? [...formData.video_ids, video.id] 
                            : formData.video_ids.filter(id => id !== video.id);
                          setFormData({ ...formData, video_ids: newVideoIds });
                        }}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{video.title}</span>
                    </label>
                  ))}
                  {videos.filter(v => v.title.toLowerCase().includes(videoSearchQuery.toLowerCase())).length === 0 && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 p-2 text-center">No videos found.</p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>{editingId ? 'Save Changes' : 'Add Word'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
