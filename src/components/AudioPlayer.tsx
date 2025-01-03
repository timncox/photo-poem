import React, { useState, useRef } from 'react';
import { Play, Pause, Download } from 'lucide-react';
import { generateAudio } from '../services/api/tts';

interface AudioPlayerProps {
  text: string;
}

export function AudioPlayer({ text }: AudioPlayerProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      const audioBlob = await generateAudio(text);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      
      if (audioRef.current) {
        audioRef.current.load();
      }
    } catch (error) {
      console.error('Failed to generate audio:', error);
      alert('Failed to generate audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const audioBlob = await generateAudio(text);
      const url = URL.createObjectURL(audioBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'poem.mp3';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download audio:', error);
      alert('Failed to download audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {audioUrl && (
        <audio
          ref={audioRef}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        >
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      )}
      
      <button
        onClick={audioUrl ? togglePlay : handleGenerate}
        disabled={isLoading}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
      >
        {isLoading ? (
          <span>Generating...</span>
        ) : (
          <>
            {audioUrl ? (
              isPlaying ? <Pause size={20} /> : <Play size={20} />
            ) : (
              'Generate Audio'
            )}
          </>
        )}
      </button>

      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
      >
        <Download size={20} />
        Download MP3
      </button>
    </div>
  );
}