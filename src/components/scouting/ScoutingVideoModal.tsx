import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { X } from 'lucide-react';
import { useScoutingStore } from '../../store/scoutingStore';
import { useChatStore } from '../../store/chatStore';

interface ScoutingVideoModalProps {
  videoId: string;
  onClose: () => void;
}

const ScoutingVideoModal: React.FC<ScoutingVideoModalProps> = ({ videoId, onClose }) => {
  const { videos, updateProgress, getVideoProgress } = useScoutingStore();
  const { currentUser } = useChatStore();
  const video = videos.find((v) => v.id === videoId);
  const [played, setPlayed] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  const progress = getVideoProgress(videoId, currentUser.id);
  const [initialSeek, setInitialSeek] = useState(true);

  useEffect(() => {
    if (initialSeek && progress?.watchedSeconds && playerRef.current) {
      playerRef.current.seekTo(progress.watchedSeconds, 'seconds');
      setInitialSeek(false);
    }
  }, [progress, initialSeek]);

  if (!video) return null;

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    setPlayed(playedSeconds);
    updateProgress({
      userId: currentUser.id,
      videoId,
      watchedSeconds: playedSeconds,
      completed: playedSeconds >= video.duration * 0.9, // Mark as completed if watched 90%
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">{video.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="aspect-video bg-black">
          <ReactPlayer
            ref={playerRef}
            url={video.url}
            width="100%"
            height="100%"
            controls
            playing
            onProgress={handleProgress}
          />
        </div>
        <div className="p-4">
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${(played / video.duration) * 100}%` }}
              />
            </div>
          </div>
          <p className="text-gray-600">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoutingVideoModal;