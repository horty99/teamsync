import React, { useState } from 'react';
import { X, Plus, Target, Shield } from 'lucide-react';
import { usePracticeStore } from '../../store/practiceStore';
import type { GamePlanGoal, GamePlanStrategy } from '../../types/practice';

interface GamePlanCreatorProps {
  onClose: () => void;
}

const GamePlanCreator: React.FC<GamePlanCreatorProps> = ({ onClose }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [opponent, setOpponent] = useState('');
  const [location, setLocation] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [goals, setGoals] = useState<Omit<GamePlanGoal, 'id'>[]>([]);
  const [strategies, setStrategies] = useState<Omit<GamePlanStrategy, 'id'>[]>([]);
  const [notes, setNotes] = useState('');
  const { addPlan } = usePracticeStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPlan({
      type: 'game',
      date: new Date(date),
      opponent,
      location,
      isPublic,
      goals,
      strategies,
      notes,
    });
    onClose();
  };

  const handleAddGoal = () => {
    setGoals([
      ...goals,
      {
        category: 'offense',
        metric: 'points',
        target: 0,
        description: '',
      },
    ]);
  };

  const handleUpdateGoal = (index: number, updates: Partial<GamePlanGoal>) => {
    const updatedGoals = [...goals];
    updatedGoals[index] = { ...updatedGoals[index], ...updates };
    setGoals(updatedGoals);
  };

  const handleDeleteGoal = (index: number) => {
    const updatedGoals = [...goals];
    updatedGoals.splice(index, 1);
    setGoals(updatedGoals);
  };

  const handleAddStrategy = () => {
    setStrategies([
      ...strategies,
      {
        type: 'offense',
        name: '',
        description: '',
        plays: [],
      },
    ]);
  };

  const handleUpdateStrategy = (index: number, updates: Partial<GamePlanStrategy>) => {
    const updatedStrategies = [...strategies];
    updatedStrategies[index] = { ...updatedStrategies[index], ...updates };
    setStrategies(updatedStrategies);
  };

  const handleDeleteStrategy = (index: number) => {
    const updatedStrategies = [...strategies];
    updatedStrategies.splice(index, 1);
    setStrategies(updatedStrategies);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl my-8">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Create Game Plan</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Game Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opponent
              </label>
              <input
                type="text"
                value={opponent}
                onChange={(e) => setOpponent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">
                  Make plan visible to players
                </span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Game Goals</h3>
              <button
                type="button"
                onClick={handleAddGoal}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus className="w-4 h-4" />
                Add Goal
              </button>
            </div>

            <div className="space-y-4">
              {goals.map((goal, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <select
                    value={goal.category}
                    onChange={(e) => handleUpdateGoal(index, { category: e.target.value as any })}
                    className="px-3 py-2 border border-gray-200 rounded-lg"
                  >
                    <option value="offense">Offense</option>
                    <option value="defense">Defense</option>
                    <option value="rebounds">Rebounds</option>
                    <option value="other">Other</option>
                  </select>

                  <div className="flex-1">
                    <input
                      type="text"
                      value={goal.description}
                      onChange={(e) => handleUpdateGoal(index, { description: e.target.value })}
                      placeholder="Goal description..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    />
                  </div>

                  <input
                    type="number"
                    value={goal.target}
                    onChange={(e) => handleUpdateGoal(index, { target: Number(e.target.value) })}
                    className="w-24 px-3 py-2 border border-gray-200 rounded-lg"
                    placeholder="Target"
                  />

                  <button
                    type="button"
                    onClick={() => handleDeleteGoal(index)}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Game Strategies</h3>
              <button
                type="button"
                onClick={handleAddStrategy}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus className="w-4 h-4" />
                Add Strategy
              </button>
            </div>

            <div className="space-y-4">
              {strategies.map((strategy, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex gap-4 mb-4">
                    <select
                      value={strategy.type}
                      onChange={(e) => handleUpdateStrategy(index, { type: e.target.value as any })}
                      className="px-3 py-2 border border-gray-200 rounded-lg"
                    >
                      <option value="offense">Offense</option>
                      <option value="defense">Defense</option>
                      <option value="special">Special Teams</option>
                    </select>

                    <div className="flex-1">
                      <input
                        type="text"
                        value={strategy.name}
                        onChange={(e) => handleUpdateStrategy(index, { name: e.target.value })}
                        placeholder="Strategy name..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteStrategy(index)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <textarea
                    value={strategy.description}
                    onChange={(e) => handleUpdateStrategy(index, { description: e.target.value })}
                    placeholder="Strategy description..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg mb-4 h-24"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Plays (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={strategy.plays.join(', ')}
                      onChange={(e) => handleUpdateStrategy(index, { 
                        plays: e.target.value.split(',').map(p => p.trim()).filter(Boolean)
                      })}
                      placeholder="Play 1, Play 2, Play 3..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg h-32"
              placeholder="Add any additional notes or instructions..."
            />
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
              Create Game Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GamePlanCreator;