import { create } from 'zustand';
import type { PlayerGoal, GoalProgress, GoalMetric } from '../types/goals';
import { useStatsStore } from './statsStore';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

interface GoalsState {
  goals: PlayerGoal[];
  addGoal: (goal: Omit<PlayerGoal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<PlayerGoal>) => void;
  deleteGoal: (id: string) => void;
  getPlayerGoals: (playerId: string) => PlayerGoal[];
  getGoalProgress: (goal: PlayerGoal) => GoalProgress;
}

export const useGoalsStore = create<GoalsState>((set, get) => ({
  goals: [],

  addGoal: (goal) => {
    const newGoal: PlayerGoal = {
      ...goal,
      id: Date.now().toString(),
    };
    set((state) => ({
      goals: [...state.goals, newGoal],
    }));
  },

  updateGoal: (id, updates) => {
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === id ? { ...goal, ...updates } : goal
      ),
    }));
  },

  deleteGoal: (id) => {
    set((state) => ({
      goals: state.goals.filter((goal) => goal.id !== id),
    }));
  },

  getPlayerGoals: (playerId) => {
    return get().goals.filter((goal) => goal.playerId === playerId);
  },

  getGoalProgress: (goal) => {
    const { getPlayerStats, getSeasonAverages } = useStatsStore.getState();
    const stats = getPlayerStats(goal.playerId);

    let current = 0;
    let previousValue = 0;

    switch (goal.period) {
      case 'game':
        // Get the latest game stats
        const latestStats = stats[stats.length - 1];
        if (latestStats) {
          current = getStatValue(latestStats, goal.metric);
          previousValue = stats[stats.length - 2] 
            ? getStatValue(stats[stats.length - 2], goal.metric)
            : current;
        }
        break;

      case 'month':
        const now = new Date();
        const monthStart = startOfMonth(now);
        const monthEnd = endOfMonth(now);
        const monthStats = stats.filter((stat) =>
          isWithinInterval(new Date(stat.gameId), {
            start: monthStart,
            end: monthEnd,
          })
        );
        if (monthStats.length > 0) {
          current = monthStats.reduce((acc, stat) => acc + getStatValue(stat, goal.metric), 0) / monthStats.length;
          // Get previous month's average for trend
          const prevMonthStats = stats.filter((stat) =>
            isWithinInterval(new Date(stat.gameId), {
              start: startOfMonth(monthStart),
              end: monthEnd,
            })
          );
          previousValue = prevMonthStats.length > 0
            ? prevMonthStats.reduce((acc, stat) => acc + getStatValue(stat, goal.metric), 0) / prevMonthStats.length
            : current;
        }
        break;

      case 'season':
        const seasonAvg = getSeasonAverages(goal.playerId);
        current = getStatValue(seasonAvg, goal.metric);
        // Calculate trend based on first half vs second half of available stats
        const midpoint = Math.floor(stats.length / 2);
        const firstHalf = stats.slice(0, midpoint);
        const secondHalf = stats.slice(midpoint);
        if (firstHalf.length > 0) {
          previousValue = firstHalf.reduce((acc, stat) => acc + getStatValue(stat, goal.metric), 0) / firstHalf.length;
        }
        break;
    }

    return {
      current,
      target: goal.target,
      percentage: (current / goal.target) * 100,
      trend: current - previousValue,
    };
  },
}));

function getStatValue(stats: any, metric: GoalMetric): number {
  const parts = metric.split('.');
  let value = stats[parts[0]];
  if (parts.length > 1) {
    value = value[parts[1]];
  }
  return value || 0;
}