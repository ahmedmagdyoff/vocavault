'use client';

import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Video, FolderTree } from 'lucide-react';
import { useEffect, useState } from 'react';
import { videosApi } from '@/lib/videos';
import { wordsApi } from '@/lib/words';
import { categoriesApi } from '@/lib/categories';

export default function DashboardPage() {
  const { user } = useAuth();
  const [statsData, setStatsData] = useState({ words: 0, videos: 0, categories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [wordsRes, videosRes, categoriesRes] = await Promise.all([
          wordsApi.getWords(),
          videosApi.getVideos(),
          categoriesApi.getCategories()
        ]);
        
        setStatsData({
          words: wordsRes.data.length,
          videos: videosRes.data.length,
          categories: categoriesRes.data.length,
        });
      } catch (error) {
        console.error('Failed to load stats', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  const stats = [
    { name: 'Total Words', value: loading ? '...' : statsData.words.toString(), icon: BookOpen, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400' },
    { name: 'Total Videos', value: loading ? '...' : statsData.videos.toString(), icon: Video, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400' },
    { name: 'Categories', value: loading ? '...' : statsData.categories.toString(), icon: FolderTree, color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Here's an overview of your vocabulary library.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-12 rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
          <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">Start learning today</h3>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
          Add a new video and start extracting vocabulary words to build your personal library.
        </p>
      </div>
    </div>
  );
}
