import React, { useState } from 'react';
import { Plus, Clock, CalendarDays, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { usePracticeStore } from '../store/practiceStore';
import { useChatStore } from '../store/chatStore';
import PracticePlanCreator from '../components/practice/PracticePlanCreator';
import GamePlanCreator from '../components/practice/GamePlanCreator';
import PlanList from '../components/practice/PlanList';
import { format } from 'date-fns';

const PracticePlan = () => {
  const [showCreator, setShowCreator] = useState(false);
  const [planType, setPlanType] = useState<'practice' | 'game'>('practice');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { plans, getUnplannedEvents } = usePracticeStore();
  const { currentUser } = useChatStore();

  const practicePlans = plans.filter(plan => plan.type === 'practice');
  const gamePlans = plans.filter(plan => plan.type === 'game');
  const unplannedEvents = getUnplannedEvents();

  const isCoach = currentUser.role === 'coach';
  const visiblePlans = isCoach 
    ? plans 
    : plans.filter(plan => plan.isPublic);

  const handleCreatePlan = (eventId?: string) => {
    if (eventId) {
      const event = unplannedEvents.find(e => e.id === eventId);
      if (event) {
        setPlanType(event.type);
        setSelectedEventId(eventId);
      }
    }
    setShowCreator(true);
  };

  return (
    <div className="flex-1 p-8">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Plans</h1>
            <p className="text-gray-600">Manage practice and game plans</p>
          </div>

          {isCoach && (
            <div className="flex gap-2">
              <select
                value={planType}
                onChange={(e) => setPlanType(e.target.value as 'practice' | 'game')}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="practice">Practice Plan</option>
                <option value="game">Game Plan</option>
              </select>
              <button
                onClick={() => handleCreatePlan()}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus className="w-5 h-5" />
                Create {planType === 'practice' ? 'Practice' : 'Game'} Plan
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Practice Plans</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {practicePlans.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <CalendarDays className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Game Plans</h3>
                <p className="text-2xl font-bold text-gray-900">{gamePlans.length}</p>
              </div>
            </div>
          </div>

          {isCoach && (
            <>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <Eye className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-600 text-sm">Public Plans</h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {plans.filter(plan => plan.isPublic).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-600 text-sm">Unplanned Events</h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {unplannedEvents.length}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {isCoach && unplannedEvents.length > 0 && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-yellow-900 mb-2">
              Upcoming Events Without Plans
            </h3>
            <div className="space-y-2">
              {unplannedEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between bg-white p-3 rounded-lg border border-yellow-200"
                >
                  <div>
                    <div className="font-medium text-yellow-900">
                      {event.title}
                    </div>
                    <div className="text-sm text-yellow-700">
                      {format(event.date, 'MMMM d, yyyy')} - {event.type}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCreatePlan(event.id)}
                    className="px-3 py-1.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
                  >
                    Create Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      <PlanList plans={visiblePlans} isCoach={isCoach} />

      {showCreator && planType === 'practice' && (
        <PracticePlanCreator 
          onClose={() => {
            setShowCreator(false);
            setSelectedEventId(null);
          }}
          eventId={selectedEventId}
        />
      )}

      {showCreator && planType === 'game' && (
        <GamePlanCreator 
          onClose={() => {
            setShowCreator(false);
            setSelectedEventId(null);
          }}
          eventId={selectedEventId}
        />
      )}
    </div>
  );
};

export default PracticePlan;