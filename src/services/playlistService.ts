import { supabase } from '@/lib/supabase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Helper function to extract YouTube ID from URL
function extractYoutubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Helper function to get video metadata from YouTube
async function getYoutubeVideoMetadata(youtubeId: string) {
  // For now, we'll use a simple format. In production, you should use the YouTube Data API
  return {
    title: `Video ${youtubeId}`, // This should be fetched from YouTube API
    thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
    duration: 0, // This should be fetched from YouTube API
  };
}

export interface CreatePlaylistData {
  name: string;
  description: string;
  isPublic: boolean;
}

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  thumbnail: string;
  duration: number;
  addedAt: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string | null;
  isPublic: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  videos: Video[];
}

export const playlistService = {
  async createPlaylist(data: CreatePlaylistData): Promise<Playlist> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const response = await fetch(`${API_URL}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-id': user.id,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create playlist');
    }

    return response.json();
  },

  async getPlaylists(): Promise<Playlist[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const response = await fetch(`${API_URL}/playlists`, {
      headers: {
        'user-id': user.id,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch playlists');
    }

    return response.json();
  },

  async addVideoToPlaylist(playlistId: string, youtubeUrl: string): Promise<Video> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Extract YouTube ID from URL
    const youtubeId = extractYoutubeId(youtubeUrl);
    if (!youtubeId) {
      throw new Error('Invalid YouTube URL');
    }

    // Get video metadata
    const metadata = await getYoutubeVideoMetadata(youtubeId);

    // Create the video
    const videoResponse = await fetch(`${API_URL}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-id': user.id,
      },
      body: JSON.stringify({
        youtubeId,
        ...metadata,
      }),
    });

    if (!videoResponse.ok) {
      const error = await videoResponse.json();
      throw new Error(error.message || 'Failed to create video');
    }

    const video = await videoResponse.json();

    // Add it to the playlist
    const playlistResponse = await fetch(`${API_URL}/playlists/${playlistId}/videos/${video.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-id': user.id,
      },
    });

    if (!playlistResponse.ok) {
      const error = await playlistResponse.json();
      throw new Error(error.message || 'Failed to add video to playlist');
    }

    return video;
  },

  async getPlaylistById(playlistId: string): Promise<Playlist> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get all playlists and find the one we want
    const playlists = await this.getPlaylists();
    const playlist = playlists.find(p => p.id === playlistId);
    
    if (!playlist) {
      throw new Error('Playlist not found');
    }

    return playlist;
  },
}; 