import type { TeamStats } from './stats';

export type PlanType = 'practice' | 'game';

export interface PracticeDrill {
  id: string;
  name: string;
  duration: number; // in minutes
  description: string;
  type: DrillType;
  notes?: string;
  intensity: 'low' | 'medium' | 'high';
}

export interface GamePlanGoal {
  id: string;
  category: 'offense' | 'defense' | 'rebounds' | 'other';
  metric: keyof TeamStats | string;
  target: number;
  description: string;
}

export interface GamePlanStrategy {
  id: string;
  type: 'offense' | 'defense' | 'special';
  name: string;
  description: string;
  plays: string[];
  notes?: string;
}

export interface BasePlan {
  id: string;
  type: PlanType;
  date: Date;
  opponent?: string;
  location?: string;
  isPublic: boolean;
  notes: string;
}

export interface PracticePlan extends BasePlan {
  type: 'practice';
  duration: number;
  sections: PracticeSection[];
}

export interface GamePlan extends BasePlan {
  type: 'game';
  goals: GamePlanGoal[];
  strategies: GamePlanStrategy[];
}

export type Plan = PracticePlan | GamePlan;

export interface PracticeSection {
  id: string;
  title: string;
  duration: number;
  drills: PracticeDrill[];
  notes?: string;
}

export type DrillType = 
  | 'warmup'
  | 'conditioning'
  | 'shooting'
  | 'ballhandling'
  | 'defense'
  | 'offense'
  | 'scrimmage'
  | 'teamwork'
  | 'special-teams'
  | 'cooldown'
  | 'custom';

export const DRILL_TEMPLATES: Record<DrillType, string[]> = {
  'warmup': [
    'Dynamic Stretching',
    'Light Jogging',
    'Form Shooting',
    'Partner Passing'
  ],
  'conditioning': [
    'Full Court Sprints',
    'Defensive Slides',
    'Suicide Runs',
    'Box Drills'
  ],
  'shooting': [
    '3-Point Shooting',
    'Free Throws',
    'Mid-Range Jumpers',
    'Catch and Shoot'
  ],
  'ballhandling': [
    'Figure 8 Dribbling',
    'Two-Ball Dribbling',
    'Crossover Series',
    'Speed Dribbling'
  ],
  'defense': [
    'Shell Drill',
    'Close-Out Drill',
    'Help Defense',
    'Box-Out Drill'
  ],
  'offense': [
    'Pick and Roll',
    'Motion Offense',
    'Fast Break',
    'Post Moves'
  ],
  'scrimmage': [
    '5-on-5 Full Court',
    '3-on-3 Half Court',
    'Situational Play',
    'Live Game'
  ],
  'teamwork': [
    'Communication Drill',
    'Trust Exercise',
    'Team Building',
    'Leadership Activity'
  ],
  'special-teams': [
    'Inbound Plays',
    'Press Break',
    'Free Throw Situations',
    'End of Game'
  ],
  'cooldown': [
    'Static Stretching',
    'Light Shooting',
    'Team Discussion',
    'Recovery'
  ],
  'custom': []
};