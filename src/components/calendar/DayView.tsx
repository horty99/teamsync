import React from 'react';
import type { CalendarEvent } from '../../types/calendar';
import { format, isSameDay } from 'date-fns';

interface DayViewProps {
  selectedDate: Date;
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
}

const DayView: React.FC<DayViewProps> = ({ selectedDate, events, onSelectDate }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const dayEvents = events.filter(event => isSameDay(event.startTime, selectedDate));

  return (
    <div className="flex flex-col h-[600px] overflow-y-auto">
      {hours.map(hour => {
        const timeLabel = format(new Date().setHours(hour, 0, 0, 0), 'h:mm a');
        const hourEvents = dayEvents.filter(event => 
          new Date(event.startTime).getHours() === hour
        );

        return (
          <div key={hour} className="flex min-h-[60px] group">
            <div className="w-20 py-2 px-2 text-sm text-gray-500 text-right">
              {timeLabel}
            </div>
            <div className="flex-1 border-l border-gray-200 group-hover:bg-gray-50">
              {hourEvents.map(event => (
                <div
                  key={event.id}
                  className={`mx-2 my-1 p-2 rounded-lg text-sm ${
                    event.type === 'game' 
                      ? 'bg-red-100 text-red-800'
                      : event.type === 'practice'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  <div className="font-medium">{event.title}</div>
                  {event.location && (
                    <div className="text-xs opacity-75">{event.location}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DayView;