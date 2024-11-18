import { create } from 'zustand';
import type { Plan, PracticePlan, GamePlan } from '../types/practice';
import { useCalendarStore } from './calendarStore';

interface PracticeState {
  plans: Plan[];
  addPlan: (plan: Omit<PracticePlan | GamePlan, 'id'>) => void;
  updatePlan: (id: string, updates: Partial<Plan>) => void;
  deletePlan: (id: string) => void;
  publishPlan: (id: string) => void;
  unpublishPlan: (id: string) => void;
  getPlanForEvent: (eventId: string) => Plan | undefined;
  getUnplannedEvents: () => { id: string; title: string; date: Date; type: 'practice' | 'game' }[];
}

export const usePracticeStore = create<PracticeState>((set, get) => ({
  plans: [],

  addPlan: (planData) => {
    const newPlan = {
      ...planData,
      id: Date.now().toString(),
      isPublic: false,
    };

    set((state) => ({
      plans: [...state.plans, newPlan as Plan],
    }));
  },

  updatePlan: (id, updates) => {
    set((state) => ({
      plans: state.plans.map((plan) =>
        plan.id === id ? { ...plan, ...updates } : plan
      ),
    }));
  },

  deletePlan: (id) => {
    set((state) => ({
      plans: state.plans.filter((plan) => plan.id !== id),
    }));
  },

  publishPlan: (id) => {
    set((state) => ({
      plans: state.plans.map((plan) =>
        plan.id === id ? { ...plan, isPublic: true } : plan
      ),
    }));
  },

  unpublishPlan: (id) => {
    set((state) => ({
      plans: state.plans.map((plan) =>
        plan.id === id ? { ...plan, isPublic: false } : plan
      ),
    }));
  },

  getPlanForEvent: (eventId) => {
    const { events } = useCalendarStore.getState();
    const event = events.find(e => e.id === eventId);
    if (!event) return undefined;

    return get().plans.find(
      plan => 
        plan.date.getTime() === event.startTime.getTime() &&
        plan.type === event.type
    );
  },

  getUnplannedEvents: () => {
    const { events } = useCalendarStore.getState();
    const plans = get().plans;

    return events
      .filter(event => 
        event.type === 'practice' || event.type === 'game'
      )
      .filter(event => !plans.some(
        plan => 
          plan.date.getTime() === event.startTime.getTime() &&
          plan.type === event.type
      ))
      .map(event => ({
        id: event.id,
        title: event.title,
        date: event.startTime,
        type: event.type as 'practice' | 'game'
      }));
  },
}));