import React, { useState } from 'react';
import { useGoalsStore } from '../../store/goalsStore';
import { useChatStore } from '../../store/chatStore';
import { Plus, X, TrendingUp, TrendingDown } from 'lucide-react';
import type { GoalMetric, GoalPeriod } from '../../types/goals';

const metricOptions: { value: GoalMetric; label: string }[] = [
  { value: 'points', label: 'Points' },
  { value: 'assists', label: 'Assists' },
  { value: 'rebounds.total', label: 'Total Rebounds' },
  { value: 'rebounds.offensive', label: 'Offensive Rebounds' },
  { value: 'rebounds.defensive', label: 'Defensive Rebounds' },
  { value: 'steals', label: 'Steals' },
  { value: 'blocks', label: 'Blocks' },
  { value: 'fieldGoals.percentage', label: 'Field Goal %' },
  { value: 'threePointers.percentage', label: '3PT %' },
  { value: 'freeThrows.percentage', label: 'Free Throw %' },
];

const periodOptions: { value: GoalPeriod; label: string }[] = [
  { value: 'game', label: 'Per Game' },
  { value: 'month', label: 'Monthly Average' },
  { value: 'season', label: 'Season Average' },
];

const PlayerGoals = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const { currentUser } = useChatStore();
  const { goals, addGoal, deleteGoal, getPlayerGoals, getGoalProgress } = useGoalsStore();

  const playerGoals = getPlayerGoals(currentUser.id);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Performance Goals</h2>
        <button
          onClick={() => setShowAddGoal(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          Add Goal
        </button>
      </div>

      <div className="p-4 space-y-4">
        {playerGoals.map((goal) => {
          const progress = getGoalProgress(goal);
          const metric = metricOptions.find((m) => m.value === goal.metric);
          const period = periodOptions.find((p) => p.value === goal.period);

          return (
            <div key={goal.id} className="relative bg-gray-50 rounded-lg p-4">
              <button
                onClick={() => deleteGoal(goal.id)}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-2">
                <h3 className="font-medium text-gray-900">
                  {metric?.label} - {period?.label}
                </h3>
                <div className="text-sm text-gray-500">
                  Target: {goal.target}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">
                    {progress.current.toFixed(1)} / {progress.target}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(100, progress.percentage)}%` }}
                  />
                </div>

                <div className="flex items-center gap-1 text-sm">
                  {progress.trend > 0 ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-green-600">
                        +{progress.trend.toFixed(1)} improvement
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      <span className="text-red-600">
                        {progress.trend.toFixed(1)} decline
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {playerGoals.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No goals set. Click "Add Goal" to get started.
          </div>
        )}
      </div>

      {showAddGoal && (
        <AddGoalModal onClose={() => setShowAddGoal(false)} />
      )}
    </div>
  );
};

const AddGoalModal = ({ onClose }: { onClose: () => void }) => {
  const { currentUser } = useChatStore();
  const { addGoal } = useGoalsStore();
  const [metric, setMetric] = useState<GoalMetric>('points');
  const [period, setPeriod] = useState<GoalPeriod>('game');
  const [target, setTarget] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal({
      playerId: currentUser.id,
      metric,
      period,
      target: Number(target),
      startDate: new Date(),
      active: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Add New Goal</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statistic
            </label>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value as GoalMetric)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {metricOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Period
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as GoalPeriod)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Value
            </label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              step="0.1"
              min="0"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerGoals;