import React from 'react';
import { useStatsStore } from '../../store/statsStore';
import StatsCard from './StatsCard';
import StatsUploadSection from './StatsUploadSection';
import { Trophy, Target, Percent } from 'lucide-react';

const TeamStatsView = () => {
  const { getTeamSeasonAverages, games } = useStatsStore();
  const stats = getTeamSeasonAverages();
  const wins = games.filter(game => game.result === 'W').length;
  const winPercentage = games.length > 0 ? (wins / games.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <StatsUploadSection type="team" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Win-Loss Record"
          value={`${wins}-${games.length - wins}`}
          trend={`${winPercentage.toFixed(1)}%`}
          icon={<Trophy className="w-6 h-6 text-yellow-600" />}
        />
        <StatsCard
          title="Points Per Game"
          value={stats.score?.toFixed(1) || '0'}
          trend={`${((stats.score || 0) - (stats.opponentScore || 0)).toFixed(1)} margin`}
          icon={<Target className="w-6 h-6 text-green-600" />}
        />
        <StatsCard
          title="Field Goal %"
          value={`${stats.fieldGoals?.percentage.toFixed(1) || '0'}%`}
          trend={`${stats.threePointers?.percentage.toFixed(1) || '0'}% 3PT`}
          icon={<Percent className="w-6 h-6 text-blue-600" />}
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Rebounds</div>
              <div className="text-2xl font-bold text-gray-900">{stats.rebounds?.total.toFixed(1) || '0'}</div>
              <div className="text-sm text-gray-500">
                {stats.rebounds?.offensive.toFixed(1) || '0'} OFF / {stats.rebounds?.defensive.toFixed(1) || '0'} DEF
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Assists</div>
              <div className="text-2xl font-bold text-gray-900">{stats.assists?.toFixed(1) || '0'}</div>
              <div className="text-sm text-gray-500">Per Game</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Steals</div>
              <div className="text-2xl font-bold text-gray-900">{stats.steals?.toFixed(1) || '0'}</div>
              <div className="text-sm text-gray-500">Per Game</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Blocks</div>
              <div className="text-2xl font-bold text-gray-900">{stats.blocks?.toFixed(1) || '0'}</div>
              <div className="text-sm text-gray-500">Per Game</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStatsView;