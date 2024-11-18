import React, { useState } from 'react';
import { Video, Calendar, MessageSquare, Clock } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';

const CoachConnect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useChatStore();
  const isCoach = currentUser.role === 'coach';

  const handleVideoCall = () => {
    // Video call implementation would go here
    console.log('Starting video call...');
  };

  const scheduleOptions = [
    { time: '3:00 PM', date: 'Today', available: true },
    { time: '4:00 PM', date: 'Today', available: false },
    { time: '3:00 PM', date: 'Tomorrow', available: true },
    { time: '5:00 PM', date: 'Tomorrow', available: true },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-4 bg-indigo-600 text-white">
            <h3 className="text-lg font-semibold">
              {isCoach ? 'Player Communications' : 'Talk to Coach'}
            </h3>
          </div>

          <div className="p-4 space-y-4">
            <button
              onClick={handleVideoCall}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
            >
              <Video className="w-5 h-5" />
              <span>Start Video Call</span>
            </button>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Calendar className="w-4 h-4" />
                Schedule a Meeting
              </h4>
              <div className="space-y-2">
                {scheduleOptions.map((slot, index) => (
                  <button
                    key={index}
                    disabled={!slot.available}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-sm ${
                      slot.available
                        ? 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {slot.time}
                    </span>
                    <span>{slot.date}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full p-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachConnect;