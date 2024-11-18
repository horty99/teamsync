import React, { useState } from 'react';
import { Upload, Link, AlertCircle, FileSpreadsheet, Table } from 'lucide-react';
import { useStatsStore } from '../../store/statsStore';

interface StatsUploadSectionProps {
  type: 'team' | 'individual';
}

const StatsUploadSection: React.FC<StatsUploadSectionProps> = ({ type }) => {
  const [showManualEntry, setShowManualEntry] = useState(false);
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
      // Handle file upload
      setError('');
    }
  };

  const handleSourceConnect = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement stats source connection
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Upload {type === 'team' ? 'Team' : 'Player'} Stats
        </h2>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 hover:border-indigo-500 cursor-pointer transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Upload Spreadsheet</h3>
                <p className="text-sm text-gray-500">Import from Excel or CSV</p>
              </div>
            </div>
            <label className="block">
              <input
                type="file"
                className="hidden"
                accept=".csv,.xlsx"
                onChange={handleFileUpload}
              />
              <span className="text-sm text-indigo-600 hover:text-indigo-700">
                Choose file
              </span>
            </label>
          </div>

          <div 
            className="border rounded-lg p-4 hover:border-indigo-500 cursor-pointer transition-colors"
            onClick={() => setShowManualEntry(true)}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Table className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Manual Entry</h3>
                <p className="text-sm text-gray-500">Input stats directly</p>
              </div>
            </div>
            <span className="text-sm text-indigo-600 hover:text-indigo-700">
              Enter stats
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Connect Stats Source
          </h3>
          <form onSubmit={handleSourceConnect} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="Enter stats provider URL"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Connect
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Supported providers: MaxPreps, GameChanger, HUDL, SportsEngine
            </div>
          </form>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsUploadSection;