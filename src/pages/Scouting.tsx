import React, { useState } from 'react';
import { Search, Upload, Play, CheckCircle, Clock } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useScoutingStore } from '../store/scoutingStore';
import ScoutingVideoModal from '../components/scouting/ScoutingVideoModal';
import UploadVideoModal from '../components/scouting/UploadVideoModal';
import { formatDistanceToNow } from 'date-fns';

const Scouting = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { currentUser } = useChatStore();
  const { videos, progress } = useScoutingStore();

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getProgressStats = (videoId: string) => {
    const videoProgress = progress.filter((p) => p.videoId === videoId);
    const totalWatchers = videoProgress.length;
    const completedWatchers = videoProgress.filter((p) => p.completed).length;
    return { totalWatchers, completedWatchers };
  };

  return (
    <div className="flex-1 p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scouting Videos</h1>
          <p className="text-gray-600">Watch and analyze opponent gameplay</p>
        </div>
        {currentUser.role === 'coach' && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Upload className="w-5 h-5" />
            Upload Video
          </button>
        )}
      </header>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => {
          const { totalWatchers, completedWatchers } = getProgressStats(video.id);
          const userProgress = useScoutingStore.getState().getVideoProgress(video.id, currentUser.id);
          
          return (
            <div
              key={video.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className="aspect-video bg-gray-100 relative group cursor-pointer"
                onClick={() => setSelectedVideo(video.id)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white">
                    <Play className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
                {userProgress?.completed && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{video.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{formatDistanceToNow(video.uploadedAt, { addSuffix: true })}</span>
                  {currentUser.role === 'coach' && (
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {completedWatchers}/{totalWatchers}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {Math.floor(video.duration / 60)}min
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedVideo && (
        <ScoutingVideoModal
          videoId={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {showUploadModal && (
        <UploadVideoModal onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
};

export default Scouting;