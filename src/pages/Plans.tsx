import React, { useState } from 'react';
import { Plus, Clock, CalendarDays, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { usePracticeStore } from '../store/practiceStore';
import { useChatStore } from '../store/chatStore';
import PracticePlanCreator from '../components/practice/PracticePlanCreator';
import GamePlanCreator from '../components/practice/GamePlanCreator';
import PlanList from '../components/practice/PlanList';

const Plans = () => {
  const [showPlanTypeModal, setShowPlanTypeModal] = useState(false);
  const [showPracticePlanCreator, setShowPracticePlanCreator] = useState(false);
  const [showGamePlanCreator, setShowGamePlanCreator] = useState(false);
  const { plans } = usePracticeStore();
  const { currentUser } = useChatStore();

  const isCoach = currentUser.role === 'coach';
  const visiblePlans = isCoach 
    ? plans 
    : plans.filter(plan => plan.isPublic);

  const practicePlans = visiblePlans.filter(plan => plan.type === 'practice');
  const gamePlans = visiblePlans.filter(plan => plan.type === 'game');

  const handleCreatePlan = (type: 'practice' | 'game') => {
    setShowPlanTypeModal(false);
    if (type === 'practice') {
      setShowPracticePlanCreator(true);
    } else {
      setShowGamePlanCreator(true);
    }
  };

  return (
    <div className="flex-1 p-8">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Plans</h1>
            <p className="text-gray-600">View and manage practice and game plans</p>
          </div>

          {isCoach && (
            <button
              onClick={() => setShowPlanTypeModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create New Plan
            </button>
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
                    <h3 className="text-gray-600 text-sm">Draft Plans</h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {plans.filter(plan => !plan.isPublic).length}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      <PlanList plans={visiblePlans} isCoach={isCoach} />

      {showPlanTypeModal && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Plan Type</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleCreatePlan('practice')}
                className="p-6 border border-gray-200 rounded-xl hover:border-indigo-500 text-center transition-colors"
              >
                <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900">Practice Plan</h3>
                <p className="text-sm text-gray-500">Create a new practice plan</p>
              </button>
              <button
                onClick={() => handleCreatePlan('game')}
                className="p-6 border border-gray-200 rounded-xl hover:border-indigo-500 text-center transition-colors"
              >
                <CalendarDays className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900">Game Plan</h3>
                <p className="text-sm text-gray-500">Create a new game plan</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {showPracticePlanCreator && (
        <PracticePlanCreator onClose={() => setShowPracticePlanCreator(false)} />
      )}

      {showGamePlanCreator && (
        <GamePlanCreator onClose={() => setShowGamePlanCreator(false)} />
      )}
    </div>
  );
};

export default Plans;