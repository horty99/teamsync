import { create } from 'zustand';
import type { CalendarStore, CalendarEvent } from '../types/calendar';
import { isWithinInterval } from 'date-fns';

export const useCalendarStore = create<CalendarStore>((set, get) => ({
  events: [],

  addEvent: (eventData) => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      ...eventData,
      responses: eventData.attendees.map(userId => ({
        userId,
        status: 'pending'
      }))
    };
    set(state => ({ events: [...state.events, newEvent] }));
  },

  updateEvent: (id, eventData) => {
    set(state => ({
      events: state.events.map(event =>
        event.id === id ? { ...event, ...eventData } : event
      )
    }));
  },

  deleteEvent: (id) => {
    set(state => ({
      events: state.events.filter(event => event.id !== id)
    }));
  },

  respondToEvent: (eventId, userId, status) => {
    set(state => ({
      events: state.events.map(event => {
        if (event.id !== eventId) return event;
        
        const responses = [...event.responses];
        const responseIndex = responses.findIndex(r => r.userId === userId);
        
        if (responseIndex >= 0) {
          responses[responseIndex] = { userId, status };
        } else {
          responses.push({ userId, status });
        }
        
        return { ...event, responses };
      })
    }));
  },

  getEventsByDateRange: (start, end) => {
    return get().events.filter(event =>
      isWithinInterval(event.startTime, { start, end }) ||
      isWithinInterval(event.endTime, { start, end })
    );
  }
}));