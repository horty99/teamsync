import React from 'react';
import { useStatsStore } from '../../store/statsStore';
import { useChatStore } from '../../store/chatStore';
import { Crown, Award } from 'lucide-react';

interface StatLeader {
  playerId: string;
  playerName: string;
  avatar: string;
  value: number;
}

const TeamLeaders = () => {
  const { playerStats } = useStatsStore();
  const { users } = useChatStore();

  const getLeaderForStat = (statKey: string): StatLeader | null => {
    if (playerStats.length === 0) return null;

    const playerAverages = playerStats.reduce((acc, stat) => {
      if (!acc[stat.playerId]) {
        acc[stat.playerId] = {
          total: 0,
          count: 0,
        };
      }
      acc[stat.playerId].total += getStatValue(stat, statKey);
      acc[stat.playerId].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    let leader: StatLeader | null = null;
    let maxValue = -1;

    Object.entries(playerAverages).forEach(([playerId, { total, count }]) => {
      const average = total / count;
      if (average > maxValue) {
        const player = users.find(u => u.id === playerId);
        if (player) {
          maxValue = average;
          leader = {
            playerId,
            playerName: player.name,
            avatar: player.avatar,
            value: average,
          };
        }
      }
    });

    return leader;
  };

  const categories = [
    { key: 'points', label: 'Points' },
    { key: 'rebounds.total', label: 'Rebounds' },
    { key: 'assists', label: 'Assists' },
    { key: 'steals', label: 'Steals' },
    { key: 'blocks', label: 'Blocks' },
    { key: 'fieldGoals.percentage', label: 'FG%' },
    { key: 'threePointers.percentage', label: '3PT%' },
    { key: 'freeThrows.percentage', label: 'FT%' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        <Crown className="w-5 h-5 text-yellow-500" />
        <h2 className="text-lg font-semibold text-gray-900">Team Leaders</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {categories.map(({ key, label }) => {
          const leader = getLeaderForStat(key);
          if (!leader) return null;

          return (
            <div key={key} className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-3">{label}</div>
              <div className="flex items-center gap-3">
                <img
                  src={leader.avatar}
                  alt={leader.playerName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {leader.playerName}
                  </div>
                  <div className="text-lg font-bold text-indigo-600">
                    {key.includes('percentage')
                      ? `${leader.value.toFixed(1)}%`
                      : leader.value.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const getStatValue = (stats: any, key: string): number => {
  const parts = key.split('.');
  let value = stats[parts[0]];
  if (parts.length > 1) {
    value = value[parts[1]];
  }
  return value || 0;
};

export default TeamLeaders;