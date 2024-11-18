import React, { useState } from 'react';
import { useStatsStore } from '../store/statsStore';
import { useChatStore } from '../store/chatStore';
import TeamStatsView from '../components/stats/TeamStatsView';
import PlayerStatsView from '../components/stats/PlayerStatsView';
import TeamLeaders from '../components/stats/TeamLeaders';
import GameList from '../components/stats/GameList';
import { Users, User } from 'lucide-react';

const Stats = () => {
  const { currentUser } = useChatStore();
  const [view, setView] = useState<'team' | 'individual'>(currentUser.role === 'coach' ? 'team' : 'individual');

  return (
    <div className="flex-1 p-8">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Statistics</h1>
            <p className="text-gray-600">Track and analyze performance</p>
          </div>

          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('team')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                view === 'team'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="w-5 h-5" />
              Team Stats
            </button>
            <button
              onClick={() => setView('individual')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                view === 'individual'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="w-5 h-5" />
              Individual Stats
            </button>
          </div>
        </div>
      </header>

      {view === 'team' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <TeamStatsView />
            </div>
            <div className="lg:col-span-1">
              <GameList />
            </div>
          </div>

          <TeamLeaders />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <PlayerStatsView defaultPlayer={currentUser.role === 'player' ? currentUser.id : undefined} />
          </div>
          <div className="lg:col-span-1">
            <GameList />
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;