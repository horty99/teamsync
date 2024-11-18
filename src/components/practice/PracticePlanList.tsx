import React from 'react';
import { usePracticeStore } from '../../store/practiceStore';
import { format } from 'date-fns';
import { Clock, ChevronRight } from 'lucide-react';

const PracticePlanList = () => {
  const { plans } = usePracticeStore();

  return (
    <div className="space-y-4">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-indigo-500 transition-colors"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Practice Plan - {format(plan.date, 'MMMM d, yyyy')}
                </h3>
                <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <Clock className="w-4 h-4" />
                  <span>{plan.duration} minutes</span>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {plan.sections.map((section) => (
                <div key={section.id} className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-medium text-gray-900">{section.title}</h4>
                  <div className="text-sm text-gray-500 mt-1">
                    {section.duration} minutes - {section.drills.length} drills
                  </div>
                </div>
              ))}
            </div>

            {plan.notes && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">{plan.notes}</div>
              </div>
            )}
          </div>
        </div>
      ))}

      {plans.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Practice Plans Yet
          </h3>
          <p className="text-gray-600">
            Create your first practice plan by clicking the button above.
          </p>
        </div>
      )}
    </div>
  );
};

export default PracticePlanList;