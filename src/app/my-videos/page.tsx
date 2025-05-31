'use client';

import { useState } from 'react';
import VideoInput from '@/components/videos/VideoInput';
import VideoPlayer from '@/components/videos/VideoPlayer';
import PlaylistSection from '@/components/videos/PlaylistSection';

export default function MyVideosPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoUrl) {
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Videos</h1>
          <p className="text-white/60 mt-2">Watch and manage your YouTube videos</p>
        </div>

        <VideoInput 
          videoUrl={videoUrl}
          onVideoUrlChange={setVideoUrl}
          onPlay={handlePlayVideo}
        />

        {isPlaying && <VideoPlayer videoUrl={videoUrl} />}

        <PlaylistSection />
      </div>
    </div>
  );
} 