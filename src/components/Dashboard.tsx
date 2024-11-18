import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, MessageSquare, Trophy, Users, UserPlus, 
  TrendingUp, Activity, Target, Clock, AlertCircle,
  CheckCircle, XCircle, Bell
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';
import InviteModal from './InviteModal';
import StatCard from './StatCard';
import CreateSection from './CreateSection';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { currentUser } = useChatStore();
  const { users } = useChatStore();
  const isCoachOrAdmin = currentUser.role === 'coach' || currentUser.role === 'admin';

  const notifications = [
    { id: 1, type: 'practice', message: 'Practice plan for tomorrow needs review', urgent: true },
    { id: 2, type: 'stats', message: 'New game stats available for analysis', urgent: false },
    { id: 3, type: 'chat', message: '5 unread messages in Team Chat', urgent: false },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Team Practice', time: 'Today, 4:00 PM', type: 'practice', status: 'confirmed' },
    { id: 2, title: 'Game vs Eagles', time: 'Tomorrow, 2:00 PM', type: 'game', status: 'pending' },
    { id: 3, title: 'Strategy Review', time: 'Wed, 6:00 PM', type: 'meeting', status: 'confirmed' },
  ];

  const recentActivities = [
    { id: 1, user: 'Mike Johnson', action: 'uploaded game footage', time: '2h ago' },
    { id: 2, user: 'Sarah Williams', action: 'completed practice plan', time: '3h ago' },
    { id: 3, user: 'Coach Thompson', action: 'updated team strategy', time: '4h ago' },
  ];

  return (
    <div className="flex-1 p-8">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isCoachOrAdmin ? "Coach Dashboard" : "Player Dashboard"}
            </h1>
            <p className="text-gray-600">
              Welcome back, {isCoachOrAdmin ? "Coach " : ""}{currentUser.name}!
            </p>
          </div>
          {isCoachOrAdmin && (
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <UserPlus className="w-5 h-5" />
              Add Team Member
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Trophy className="w-6 h-6 text-yellow-600" />}
            title="Season Record"
            value="8-2"
            trend="Won last 3"
            onClick={() => navigate('/stats')}
          />
          <StatCard
            icon={<MessageSquare className="w-6 h-6 text-blue-600" />}
            title="Unread Messages"
            value="12"
            trend="5 new today"
            onClick={() => navigate('/chat')}
          />
          <StatCard
            icon={<Activity className="w-6 h-6 text-green-600" />}
            title="Team PPG"
            value="78.5"
            trend="+5.2 last 5 games"
            onClick={() => navigate('/stats')}
          />
          <StatCard
            icon={<Target className="w-6 h-6 text-purple-600" />}
            title="Goals Progress"
            value="6/8"
            trend="75% completed"
            onClick={() => navigate('/stats')}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {isCoachOrAdmin && <CreateSection />}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
              <button
                onClick={() => navigate('/calendar')}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View Calendar
              </button>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      event.type === 'practice' ? 'bg-blue-500' :
                      event.type === 'game' ? 'bg-red-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.time}</p>
                    </div>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    event.status === 'confirmed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-500" />
                  <div>
                    <span className="font-medium text-gray-900">{activity.user}</span>
                    <span className="text-gray-600"> {activity.action}</span>
                    <span className="text-sm text-gray-500"> · {activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-3 rounded-lg ${
                    notification.urgent 
                      ? 'bg-red-50 border border-red-100' 
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {notification.urgent && (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                    <p className={`text-sm ${
                      notification.urgent ? 'text-red-800' : 'text-gray-600'
                    }`}>
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
              <button
                onClick={() => navigate('/members')}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {users.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.role}</div>
                  </div>
                  <div className={`ml-auto w-2 h-2 rounded-full ${
                    user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-yellow-900">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/calendar')}
                className="w-full text-left px-4 py-2 bg-white text-yellow-800 rounded-lg hover:bg-yellow-100"
              >
                View upcoming schedule
              </button>
              <button
                onClick={() => navigate('/stats')}
                className="w-full text-left px-4 py-2 bg-white text-yellow-800 rounded-lg hover:bg-yellow-100"
              >
                Check latest stats
              </button>
              <button
                onClick={() => navigate('/chat')}
                className="w-full text-left px-4 py-2 bg-white text-yellow-800 rounded-lg hover:bg-yellow-100"
              >
                Message team
              </button>
            </div>
          </div>
        </div>
      </div>

      {showInviteModal && (
        <InviteModal onClose={() => setShowInviteModal(false)} />
      )}
    </div>
  );
};

export default Dashboard;