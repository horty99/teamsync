import React, { useState } from 'react';
import { Shield, User, UserMinus, UserPlus, Users, AlertCircle } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import InviteModal from '../components/InviteModal';

const Members = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { users, currentUser, removeUser } = useChatStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToRemove, setUserToRemove] = useState<{ id: string; name: string; role: string } | null>(null);

  const isAdmin = currentUser.role === 'admin' || currentUser.role === 'coach';
  const isCoach = currentUser.role === 'coach';
  const admins = users.filter(user => user.role === 'admin' || user.role === 'coach');
  const players = users.filter(user => user.role === 'player');

  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveClick = (userId: string, name: string, role: string) => {
    setUserToRemove({ id: userId, name, role });
    setShowConfirmModal(true);
  };

  const handleConfirmRemove = () => {
    if (userToRemove) {
      removeUser(userToRemove.id);
      setShowConfirmModal(false);
      setUserToRemove(null);
    }
  };

  const ConfirmModal = () => {
    if (!userToRemove) return null;

    return (
      <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
          <div className="flex items-center gap-3 mb-4 text-red-600">
            <AlertCircle className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Confirm Removal</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            Are you sure you want to remove <span className="font-medium text-gray-900">{userToRemove.name}</span> from the team? 
            This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmRemove}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Remove Member
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 p-8">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
            <p className="text-gray-600">Manage your team roster and administrators</p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <UserPlus className="w-5 h-5" />
              Invite Members
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Total Members</h3>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Administrators</h3>
                <p className="text-2xl font-bold text-gray-900">{admins.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Players</h3>
                <p className="text-2xl font-bold text-gray-900">{players.length}</p>
              </div>
            </div>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-8"
        />
      </header>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            Administrators
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="divide-y divide-gray-200">
              {filteredAdmins.map((admin) => (
                <div key={admin.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={admin.avatar}
                      alt={admin.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{admin.name}</div>
                      <div className="text-sm text-gray-500">{admin.email}</div>
                      <div className="text-xs text-primary-600 font-medium">
                        {admin.role === 'coach' ? 'Head Coach' : 'Administrator'}
                      </div>
                    </div>
                  </div>
                  {isCoach && admin.id !== currentUser.id && admin.role !== 'coach' && (
                    <button
                      onClick={() => handleRemoveClick(admin.id, admin.name, 'administrator')}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                      title="Only the head coach can remove administrators"
                    >
                      <UserMinus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Players
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="divide-y divide-gray-200">
              {filteredPlayers.map((player) => (
                <div key={player.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{player.name}</div>
                      <div className="text-sm text-gray-500">{player.email}</div>
                    </div>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => handleRemoveClick(player.id, player.name, 'player')}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                    >
                      <UserMinus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showInviteModal && (
        <InviteModal onClose={() => setShowInviteModal(false)} />
      )}

      {showConfirmModal && <ConfirmModal />}
    </div>
  );
};

export default Members;