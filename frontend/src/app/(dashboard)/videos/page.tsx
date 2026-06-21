'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Video as VideoIcon, Search, Trash2, Edit } from 'lucide-react';
import { videosApi } from '@/lib/videos';
import { Video } from '@/types';
import toast from 'react-hot-toast';

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: '', url: '', platform: 'youtube' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await videosApi.getVideos();
      setVideos(response.data);
    } catch (error) {
      toast.error('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this video?')) {
      try {
        await videosApi.deleteVideo(id);
        toast.success('Video deleted successfully');
        setVideos(videos.filter(v => v.id !== id));
      } catch (error) {
        toast.error('Failed to delete video');
      }
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await videosApi.createVideo(newVideo);
      setVideos([response.data, ...videos]);
      toast.success('Video added successfully');
      setIsAddModalOpen(false);
      setNewVideo({ title: '', url: '', platform: 'youtube' });
    } catch (error) {
      toast.error('Failed to add video');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Videos</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">Manage your saved video sources.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="mt-4 sm:mt-0">
          <Plus className="mr-2 h-4 w-4" /> Add Video
        </Button>
      </div>

      <div className="mb-6 flex items-center rounded-md border border-slate-200 bg-white px-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Search className="h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search videos..."
          className="w-full border-0 bg-transparent py-2 pl-3 focus:ring-0 sm:text-sm dark:text-white"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Platform</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Added Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-slate-500">Loading...</td>
              </tr>
            ) : videos.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-slate-500">No videos found. Add one to get started!</td>
              </tr>
            ) : (
              videos.map((video) => (
                <tr key={video.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <VideoIcon className="mr-3 h-5 w-5 text-slate-400" />
                      <a href={video.url} target="_blank" rel="noopener noreferrer" className="font-medium text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
                        {video.title}
                      </a>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-200 capitalize">
                      {video.platform}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {new Date(video.created_at).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(video.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Add Video</h2>
            <form onSubmit={handleAddVideo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
                <input required type="text" value={newVideo.title} onChange={e => setNewVideo({...newVideo, title: e.target.value})} className="mt-1 w-full rounded-md border border-slate-300 p-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">URL</label>
                <input required type="url" value={newVideo.url} onChange={e => setNewVideo({...newVideo, url: e.target.value})} className="mt-1 w-full rounded-md border border-slate-300 p-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Platform</label>
                <select value={newVideo.platform} onChange={e => setNewVideo({...newVideo, platform: e.target.value})} className="mt-1 w-full rounded-md border border-slate-300 p-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>Add Video</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
