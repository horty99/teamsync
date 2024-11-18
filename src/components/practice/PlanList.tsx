import React from 'react';
import { usePracticeStore } from '../../store/practiceStore';
import { format } from 'date-fns';
import { Clock, ChevronRight, Eye, EyeOff, Target, Shield } from 'lucide-react';
import type { Plan } from '../../types/practice';

interface PlanListProps {
  plans: Plan[];
  isCoach: boolean;
}

const PlanList: React.FC<PlanListProps> = ({ plans, isCoach }) => {
  const { publishPlan, unpublishPlan } = usePracticeStore();

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
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {plan.type === 'game' ? 'Game Plan' : 'Practice Plan'} - {format(plan.date, 'MMMM d, yyyy')}
                  </h3>
                  {isCoach && (
                    <button
                      onClick={() => plan.isPublic ? unpublishPlan(plan.id) : publishPlan(plan.id)}
                      className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                        plan.isPublic 
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {plan.isPublic ? (
                        <>
                          <Eye className="w-4 h-4" />
                          Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Draft
                        </>
                      )}
                    </button>
                  )}
                </div>
                {plan.type === 'game' && (
                  <div className="text-gray-600 mt-1">
                    vs {plan.opponent} {plan.location && `@ ${plan.location}`}
                  </div>
                )}
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {plan.type === 'practice' && (
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
            )}

            {plan.type === 'game' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-indigo-600" />
                      Game Goals
                    </h4>
                    <ul className="space-y-2">
                      {plan.goals.map((goal) => (
                        <li key={goal.id} className="text-sm text-gray-600">
                          • {goal.description} ({goal.target})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-indigo-600" />
                      Strategies
                    </h4>
                    <ul className="space-y-2">
                      {plan.strategies.map((strategy) => (
                        <li key={strategy.id} className="text-sm text-gray-600">
                          • {strategy.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

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
            No Plans Available
          </h3>
          <p className="text-gray-600">
            {isCoach 
              ? "Create your first plan by clicking the 'Create New Plan' button above."
              : "No plans have been shared with the team yet."}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlanList;