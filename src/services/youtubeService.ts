import { toast } from 'react-hot-toast';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const API_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideoMetadata {
  title: string;
  thumbnail: string;
  duration: number;
  channelTitle: string;
  publishedAt: string;
  viewCount: number;
}

export async function getVideoMetadata(youtubeId: string): Promise<YouTubeVideoMetadata> {
  if (!API_KEY) {
    throw new Error('YouTube API key is not configured');
  }

  try {
    // First, get video details
    const videoResponse = await fetch(
      `${API_URL}/videos?part=snippet,contentDetails,statistics&id=${youtubeId}&key=${API_KEY}`
    );

    if (!videoResponse.ok) {
      const error = await videoResponse.json();
      throw new Error(error.error?.message || 'Failed to fetch video details');
    }

    const videoData = await videoResponse.json();

    if (!videoData.items?.length) {
      throw new Error('Video not found');
    }

    const video = videoData.items[0];
    const snippet = video.snippet;
    const contentDetails = video.contentDetails;
    const statistics = video.statistics;

    // Convert ISO 8601 duration to seconds
    const durationMatch = contentDetails.duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = parseInt(durationMatch[1] || '0');
    const minutes = parseInt(durationMatch[2] || '0');
    const seconds = parseInt(durationMatch[3] || '0');
    const durationInSeconds = hours * 3600 + minutes * 60 + seconds;

    return {
      title: snippet.title,
      thumbnail: snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.default?.url,
      duration: durationInSeconds,
      channelTitle: snippet.channelTitle,
      publishedAt: snippet.publishedAt,
      viewCount: parseInt(statistics.viewCount) || 0,
    };
  } catch (error) {
    console.error('Error fetching YouTube video metadata:', error);
    toast.error('Failed to fetch video details');
    throw error;
  }
}

// Helper function to format duration
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Helper function to format view count
export function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M views`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K views`;
  }
  return `${count} views`;
}

// Helper function to format publish date
export function formatPublishDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
  const years = Math.floor(diffInSeconds / 31536000);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

// Test function to verify YouTube API response
export async function testYouTubeAPI() {
  // Test with a known YouTube video ID (e.g., "dQw4w9WgXcQ" - Rick Astley - Never Gonna Give You Up)
  const testVideoId = 'dQw4w9WgXcQ';
  
  try {
    console.log('Testing YouTube API with video ID:', testVideoId);
    const metadata = await getVideoMetadata(testVideoId);
    console.log('YouTube API Response:', {
      title: metadata.title,
      duration: `${formatDuration(metadata.duration)} (${metadata.duration} seconds)`,
      views: formatViewCount(metadata.viewCount),
      published: formatPublishDate(metadata.publishedAt),
      channel: metadata.channelTitle,
      thumbnail: metadata.thumbnail,
    });
    return metadata;
  } catch (error) {
    console.error('YouTube API Test Failed:', error);
    throw error;
  }
}


// You can test this by running in browser console:
// await import('@/services/youtubeService').then(m => m.testYouTubeAPI()) 