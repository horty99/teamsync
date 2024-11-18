import React from 'react';
import type { CalendarEvent } from '../../types/calendar';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek
} from 'date-fns';

interface MonthViewProps {
  selectedDate: Date;
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ selectedDate, events, onSelectDate }) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div
          key={day}
          className="bg-gray-50 p-2 text-sm font-medium text-gray-500 text-center"
        >
          {day}
        </div>
      ))}

      {days.map(day => {
        const dayEvents = events.filter(event => isSameDay(event.startTime, day));
        const isCurrentMonth = isSameMonth(day, selectedDate);

        return (
          <div
            key={day.toString()}
            className={`min-h-[100px] bg-white p-2 ${
              !isCurrentMonth && 'bg-gray-50'
            }`}
          >
            <button
              onClick={() => onSelectDate(day)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isSameDay(day, selectedDate)
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {format(day, 'd')}
            </button>

            <div className="mt-1 space-y-1">
              {dayEvents.slice(0, 3).map(event => (
                <div
                  key={event.id}
                  className={`px-2 py-1 rounded text-sm truncate ${
                    event.type === 'game' 
                      ? 'bg-red-100 text-red-800'
                      : event.type === 'practice'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-gray-500 pl-2">
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MonthView;