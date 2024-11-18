import React, { useState } from 'react';
import { X, Upload, Link, AlertCircle } from 'lucide-react';
import { useStatsStore } from '../../store/statsStore';
import type { TeamStats, PlayerStats, Game } from '../../types/stats';

interface StatsUploadModalProps {
  onClose: () => void;
}

const StatsUploadModal: React.FC<StatsUploadModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'source'>('manual');
  const [file, setFile] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState('');
  const [error, setError] = useState('');
  const { addTeamStats, addPlayerStats, addGame } = useStatsStore();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/json' && !file.type.includes('spreadsheet')) {
        setError('Please upload a JSON or spreadsheet file');
        return;
      }
      setFile(file);
      setError('');
    }
  };

  const handleSourceConnect = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement the logic to connect to the stats source
    console.log('Connecting to:', sourceUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'manual' && file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          // Process and validate the data
          if (data.teamStats) addTeamStats(data.teamStats);
          if (data.playerStats) addPlayerStats(data.playerStats);
          if (data.game) addGame(data.game);
          onClose();
        } catch (err) {
          setError('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Upload Team Stats</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                activeTab === 'manual'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Manual Upload
            </button>
            <button
              onClick={() => setActiveTab('source')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                activeTab === 'source'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Connect Source
            </button>
          </div>

          {activeTab === 'manual' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".json,.csv,.xlsx"
                        onChange={handleFileUpload}
                      />
                    </label>
                    <p className="text-sm text-gray-500">
                      or drag and drop
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    JSON or spreadsheet files only
                  </p>
                </div>
              </div>

              {file && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Upload className="w-4 h-4" />
                  {file.name}
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!file}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  Upload Stats
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSourceConnect} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stats Source URL
                </label>
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://stats-provider.com/api/team/123"
                  required
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-2">
                  Supported Stats Providers
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• MaxPreps</li>
                  <li>• GameChanger</li>
                  <li>• HUDL</li>
                  <li>• SportsEngine</li>
                </ul>
              </div>

              <div className="flex justify-end gap-2">
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
                  Connect Source
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsUploadModal;