import React from 'react';
import type { CalendarEvent } from '../../types/calendar';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';

interface WeekViewProps {
  selectedDate: Date;
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ selectedDate, events, onSelectDate }) => {
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex border-b border-gray-200">
        <div className="w-20" /> {/* Time column spacer */}
        {weekDays.map(day => (
          <div
            key={day.toString()}
            className="flex-1 text-center py-2"
          >
            <button
              onClick={() => onSelectDate(day)}
              className={`inline-flex flex-col items-center p-2 rounded-lg ${
                isSameDay(day, selectedDate)
                  ? 'bg-indigo-100 text-indigo-900'
                  : 'hover:bg-gray-100'
              }`}
            >
              <span className="text-sm font-medium">
                {format(day, 'EEE')}
              </span>
              <span className="text-lg">
                {format(day, 'd')}
              </span>
            </button>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {hours.map(hour => (
          <div key={hour} className="flex min-h-[60px] group">
            <div className="w-20 py-2 px-2 text-sm text-gray-500 text-right">
              {format(new Date().setHours(hour, 0, 0, 0), 'h:mm a')}
            </div>
            <div className="flex flex-1">
              {weekDays.map(day => {
                const dayEvents = events.filter(event => 
                  isSameDay(event.startTime, day) &&
                  new Date(event.startTime).getHours() === hour
                );

                return (
                  <div
                    key={day.toString()}
                    className="flex-1 border-l border-gray-200 group-hover:bg-gray-50"
                  >
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        className={`mx-1 my-1 p-1 rounded text-sm ${
                          event.type === 'game' 
                            ? 'bg-red-100 text-red-800'
                            : event.type === 'practice'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;