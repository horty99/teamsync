import React, { useState } from 'react';
import { useStatsStore } from '../../store/statsStore';
import { useChatStore } from '../../store/chatStore';
import StatsCard from './StatsCard';
import PlayerGoals from './PlayerGoals';
import StatsUploadSection from './StatsUploadSection';
import { Search, Award, Zap, Timer } from 'lucide-react';

interface PlayerStatsViewProps {
  defaultPlayer?: string;
}

const PlayerStatsView: React.FC<PlayerStatsViewProps> = ({ defaultPlayer }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(defaultPlayer || null);
  const { getSeasonAverages } = useStatsStore();
  const { currentUser } = useChatStore();
  const stats = selectedPlayer ? getSeasonAverages(selectedPlayer) : null;

  return (
    <div className="space-y-6">
      {!defaultPlayer && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search players..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}

      {currentUser.role === 'coach' ? (
        <StatsUploadSection type="individual" />
      ) : (
        <PlayerGoals />
      )}

      {stats && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard
              title="Points Per Game"
              value={stats.points?.toFixed(1) || '0'}
              trend="+2.1 last 5 games"
              icon={<Award className="w-6 h-6 text-yellow-600" />}
            />
            <StatsCard
              title="Field Goal %"
              value={`${stats.fieldGoals?.percentage.toFixed(1)}%` || '0%'}
              trend={`${stats.threePointers?.percentage.toFixed(1)}% 3PT`}
              icon={<Zap className="w-6 h-6 text-green-600" />}
            />
            <StatsCard
              title="Minutes Per Game"
              value={stats.minutesPlayed?.toFixed(1) || '0'}
              trend="Team high"
              icon={<Timer className="w-6 h-6 text-blue-600" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shooting Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Field Goals</span>
                    <span>{stats.fieldGoals?.made || 0}/{stats.fieldGoals?.attempted || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${stats.fieldGoals?.percentage || 0}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Three Pointers</span>
                    <span>{stats.threePointers?.made || 0}/{stats.threePointers?.attempted || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${stats.threePointers?.percentage || 0}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Free Throws</span>
                    <span>{stats.freeThrows?.made || 0}/{stats.freeThrows?.attempted || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${stats.freeThrows?.percentage || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Rebounds</div>
                  <div className="text-2xl font-bold text-gray-900">{stats.rebounds?.total.toFixed(1)}</div>
                  <div className="text-sm text-gray-500">
                    {stats.rebounds?.offensive.toFixed(1)} OFF / {stats.rebounds?.defensive.toFixed(1)} DEF
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Assists</div>
                  <div className="text-2xl font-bold text-gray-900">{stats.assists?.toFixed(1)}</div>
                  <div className="text-sm text-gray-500">Per Game</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Steals</div>
                  <div className="text-2xl font-bold text-gray-900">{stats.steals?.toFixed(1)}</div>
                  <div className="text-sm text-gray-500">Per Game</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Blocks</div>
                  <div className="text-2xl font-bold text-gray-900">{stats.blocks?.toFixed(1)}</div>
                  <div className="text-sm text-gray-500">Per Game</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerStatsView;