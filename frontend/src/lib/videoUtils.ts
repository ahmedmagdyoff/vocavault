export interface VideoProviderInfo {
  provider: 'youtube' | 'tiktok' | 'other';
  videoId: string | null;
  embedUrl: string | null;
}

export function parseVideoUrl(url: string): VideoProviderInfo {
  if (!url) {
    return { provider: 'other', videoId: null, embedUrl: null };
  }

  // YouTube Shorts or Regular YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return {
      provider: 'youtube',
      videoId: ytMatch[1],
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`
    };
  }

  // TikTok
  const tiktokMatch = url.match(/tiktok\.com\/(?:@[^\/]+\/video\/|v\/)([\d]+)/i);
  if (tiktokMatch && tiktokMatch[1]) {
    return {
      provider: 'tiktok',
      videoId: tiktokMatch[1],
      embedUrl: `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}`
    };
  }

  return { provider: 'other', videoId: null, embedUrl: null };
}
