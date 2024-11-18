import React from 'react';
import { useStatsStore } from '../../store/statsStore';
import { format } from 'date-fns';

const GameList = () => {
  const { games } = useStatsStore();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Games</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {games.map((game) => (
          <div key={game.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">
                {format(game.date, 'MMM d, yyyy')}
              </span>
              <span
                className={`text-sm font-medium ${
                  game.result === 'W' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {game.result}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">
                vs {game.opponent}
              </span>
              <span className="text-gray-900">
                {game.score.team}-{game.score.opponent}
              </span>
            </div>
            <div className="text-sm text-gray-500">{game.location}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;