import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useCalendarStore } from '../store/calendarStore';
import type { CalendarView } from '../types/calendar';
import EventModal from '../components/calendar/EventModal';
import DayView from '../components/calendar/DayView';
import WeekView from '../components/calendar/WeekView';
import MonthView from '../components/calendar/MonthView';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('month');
  const [showEventModal, setShowEventModal] = useState(false);
  const { currentUser } = useChatStore();
  const { events } = useCalendarStore();
  const isCoach = currentUser.role === 'coach';

  const navigateDate = (direction: 'prev' | 'next') => {
    switch (view) {
      case 'month':
        setSelectedDate(direction === 'prev' ? subMonths(selectedDate, 1) : addMonths(selectedDate, 1));
        break;
      case 'week':
        setSelectedDate(direction === 'prev' ? subWeeks(selectedDate, 1) : addWeeks(selectedDate, 1));
        break;
      case 'day':
        setSelectedDate(direction === 'prev' ? subDays(selectedDate, 1) : addDays(selectedDate, 1));
        break;
    }
  };

  const viewTitle = () => {
    switch (view) {
      case 'month':
        return format(selectedDate, 'MMMM yyyy');
      case 'week':
        const weekStart = startOfWeek(selectedDate);
        const weekEnd = endOfWeek(selectedDate);
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
      case 'day':
        return format(selectedDate, 'EEEE, MMMM d, yyyy');
    }
  };

  return (
    <div className="flex-1 p-8">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Team Calendar</h1>
          {isCoach && (
            <button
              onClick={() => setShowEventModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Event
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateDate('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">{viewTitle()}</h2>
            <button
              onClick={() => navigateDate('next')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setView('day')}
              className={`px-4 py-2 rounded-lg ${
                view === 'day'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 rounded-lg ${
                view === 'week'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 rounded-lg ${
                view === 'month'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {view === 'month' && (
          <MonthView
            selectedDate={selectedDate}
            events={events}
            onSelectDate={setSelectedDate}
          />
        )}
        {view === 'week' && (
          <WeekView
            selectedDate={selectedDate}
            events={events}
            onSelectDate={setSelectedDate}
          />
        )}
        {view === 'day' && (
          <DayView
            selectedDate={selectedDate}
            events={events}
            onSelectDate={setSelectedDate}
          />
        )}
      </div>

      {showEventModal && isCoach && (
        <EventModal onClose={() => setShowEventModal(false)} />
      )}
    </div>
  );
};

export default Calendar;