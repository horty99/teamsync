import React, { useState } from 'react';
import { Search, ChevronDown, Video, Upload } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

type PlayCategory = 'out-of-bounds' | 'offense' | 'defense' | 'full-court-press' | 'zone' | 'last-second';

interface Play {
  id: string;
  name: string;
  description: string;
  category: PlayCategory;
  type: 'diagram' | 'video';
  content: string; // diagram URL or video URL
  tags: string[];
}

interface VideoUploadModalProps {
  onClose: () => void;
  onUpload: (videoData: { name: string; url: string; category: PlayCategory; description: string }) => void;
}

const VideoUploadModal: React.FC<VideoUploadModalProps> = ({ onClose, onUpload }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<PlayCategory>('offense');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpload({ name, url, category, description });
    onClose();
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add Video</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Play Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              YouTube URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://youtube.com/watch?v=..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as PlayCategory)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="offense">Offense</option>
              <option value="defense">Defense</option>
              <option value="out-of-bounds">Out of Bounds</option>
              <option value="full-court-press">Full Court Press</option>
              <option value="zone">Zone</option>
              <option value="last-second">Last Second</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Playbook = () => {
  const [selectedCategory, setSelectedCategory] = useState<PlayCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const { currentUser } = useChatStore();

  const categories: { id: PlayCategory; name: string }[] = [
    { id: 'out-of-bounds', name: 'Out of Bounds (Side & Baseline)' },
    { id: 'offense', name: 'Offense' },
    { id: 'defense', name: 'Defense' },
    { id: 'full-court-press', name: 'Full Court Press' },
    { id: 'zone', name: 'Zone' },
    { id: 'last-second', name: 'Last Second' },
  ];

  const plays: Play[] = [
    {
      id: '1',
      name: 'Quick Corner Release',
      description: 'Baseline out of bounds play designed for a quick corner three-point shot.',
      category: 'out-of-bounds',
      type: 'diagram',
      content: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
      tags: ['baseline', 'three-point', 'quick release'],
    },
    {
      id: '2',
      name: 'Zone Defense Basics',
      description: 'Fundamental principles of running a 2-3 zone defense.',
      category: 'defense',
      type: 'video',
      content: 'https://www.youtube.com/embed/example',
      tags: ['zone', 'defense', 'basics'],
    },
  ];

  const [allPlays, setAllPlays] = useState<Play[]>(plays);

  const handleVideoUpload = (videoData: { name: string; url: string; category: PlayCategory; description: string }) => {
    const newPlay: Play = {
      id: Date.now().toString(),
      name: videoData.name,
      description: videoData.description,
      category: videoData.category,
      type: 'video',
      content: videoData.url,
      tags: videoData.category.split('-'),
    };
    setAllPlays([...allPlays, newPlay]);
  };

  const filteredPlays = allPlays.filter(play => 
    (!selectedCategory || play.category === selectedCategory) &&
    (!searchQuery || 
      play.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      play.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <div className="flex-1 p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Playbook</h1>
          <p className="text-gray-600">Browse and learn team strategies and plays</p>
        </div>
        {currentUser.role === 'coach' && (
          <button
            onClick={() => setShowVideoUpload(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Video className="w-5 h-5" />
            Add Video
          </button>
        )}
      </header>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search plays..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="relative">
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value as PlayCategory)}
            className="appearance-none bg-white pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlays.map((play) => (
          <PlayCard key={play.id} play={play} />
        ))}
      </div>

      {showVideoUpload && (
        <VideoUploadModal
          onClose={() => setShowVideoUpload(false)}
          onUpload={handleVideoUpload}
        />
      )}
    </div>
  );
};

const PlayCard = ({ play }: { play: Play }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {play.type === 'video' ? (
        <div className="aspect-video">
          <iframe
            src={play.content}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <img
          src={play.content}
          alt={play.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{play.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{play.description}</p>
        <div className="flex flex-wrap gap-2">
          {play.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playbook;