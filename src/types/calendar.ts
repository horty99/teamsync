export type CalendarView = 'day' | 'week' | 'month';

export type EventType = 'practice' | 'game' | 'meeting' | 'other';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  type: EventType;
  location?: string;
  mandatory: boolean;
  attendees: string[]; // User IDs
  responses: {
    userId: string;
    status: 'accepted' | 'declined' | 'pending';
  }[];
}

export interface CalendarStore {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id' | 'responses'>) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  respondToEvent: (eventId: string, userId: string, status: 'accepted' | 'declined') => void;
  getEventsByDateRange: (start: Date, end: Date) => CalendarEvent[];
}