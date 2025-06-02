import { supabase } from '@/lib/supabase';
import { getVideoMetadata } from './youtubeService';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Helper function to extract YouTube ID from URL
function extractYoutubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
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
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      console.log('Fetching playlists for user:', user.id);
      const response = await fetch(`${API_URL}/playlists`, {
        headers: {
          'user-id': user.id,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Failed to fetch playlists:', error);
        throw new Error(error.message || 'Failed to fetch playlists');
      }

      const playlists = await response.json();
      console.log('Fetched playlists:', playlists);
      return playlists;
    } catch (error) {
      console.error('Error in getPlaylists:', error);
      throw error;
    }
  },

  async getPlaylistById(playlistId: string): Promise<Playlist> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      console.log('Fetching playlist:', playlistId);
      const response = await fetch(`${API_URL}/playlists/${playlistId}`, {
        headers: {
          'user-id': user.id,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Failed to fetch playlist:', error);
        throw new Error(error.message || 'Failed to fetch playlist');
      }

      const playlist = await response.json();
      console.log('Fetched playlist:', playlist);
      return playlist;
    } catch (error) {
      console.error('Error in getPlaylistById:', error);
      throw error;
    }
  },

  async addVideoToPlaylist(playlistId: string, youtubeUrl: string): Promise<Video> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Extract YouTube ID from URL
      const youtubeId = extractYoutubeId(youtubeUrl);
      if (!youtubeId) {
        throw new Error('Invalid YouTube URL');
      }

      console.log('Adding video to playlist:', { playlistId, youtubeId });
      
      // Get video metadata from YouTube API
      const metadata = await getVideoMetadata(youtubeId);
      console.log('Fetched video metadata:', metadata);

      // Create the video
      const videoResponse = await fetch(`${API_URL}/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': user.id,
        },
        body: JSON.stringify({
          youtubeId,
          title: metadata.title,
          thumbnail: metadata.thumbnail,
          duration: metadata.duration,
        }),
      });

      if (!videoResponse.ok) {
        const error = await videoResponse.json();
        console.error('Failed to create video:', error);
        throw new Error(error.message || 'Failed to create video');
      }

      const video = await videoResponse.json();
      console.log('Created video:', video);

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
        console.error('Failed to add video to playlist:', error);
        throw new Error(error.message || 'Failed to add video to playlist');
      }

      console.log('Successfully added video to playlist');
      return video;
    } catch (error) {
      console.error('Error in addVideoToPlaylist:', error);
      throw error;
    }
  },
}; 