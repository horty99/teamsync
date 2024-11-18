export type GoalPeriod = 'game' | 'month' | 'season';
export type GoalMetric = keyof PlayerStats | 'rebounds.offensive' | 'rebounds.defensive' | 'rebounds.total' |
  'fieldGoals.percentage' | 'threePointers.percentage' | 'freeThrows.percentage';

export interface PlayerGoal {
  id: string;
  playerId: string;
  metric: GoalMetric;
  target: number;
  period: GoalPeriod;
  startDate: Date;
  endDate?: Date;
  active: boolean;
}

export interface GoalProgress {
  current: number;
  target: number;
  percentage: number;
  trend: number; // Positive or negative number indicating improvement
}