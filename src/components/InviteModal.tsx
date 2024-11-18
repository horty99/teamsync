import React, { useState } from 'react';
import { X, Copy, UserMinus, Shield, User, AlertCircle } from 'lucide-react';
import { useInviteStore } from '../store/inviteStore';
import { useChatStore } from '../store/chatStore';
import { format } from 'date-fns';

interface InviteModalProps {
  onClose: () => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ onClose }) => {
  const [role, setRole] = useState<'player' | 'admin'>('player');
  const [expiresIn, setExpiresIn] = useState('7'); // days
  const [activeTab, setActiveTab] = useState<'invite' | 'manage'>('invite');
  const { createInvite, getActiveInvites } = useInviteStore();
  const { currentUser, users } = useChatStore();
  const activeInvites = getActiveInvites();

  // Get current subscription tier limits
  const tierLimits = {
    free: { players: 20, admins: 1 },
    pro: { players: 25, admins: 3 },
    club: { players: 60, admins: 9 },
    enterprise: { players: 200, admins: 999 },
  };

  // For demo, assume Pro tier
  const currentTier = 'pro';
  const limits = tierLimits[currentTier];

  // Count current members
  const currentPlayers = users.filter(u => u.role === 'player').length;
  const currentAdmins = users.filter(u => u.role === 'admin' || u.role === 'coach').length;

  // Calculate remaining slots
  const remainingPlayers = limits.players - currentPlayers;
  const remainingAdmins = limits.admins - currentAdmins;

  const handleCreateInvite = () => {
    if (role === 'player' && remainingPlayers <= 0) {
      alert('Player limit reached for your current plan. Please upgrade to add more players.');
      return;
    }
    if (role === 'admin' && remainingAdmins <= 0) {
      alert('Admin limit reached for your current plan. Please upgrade to add more admins.');
      return;
    }

    createInvite({
      role,
      createdBy: currentUser.id,
      expiresIn: parseInt(expiresIn) * 24 * 60 * 60 * 1000,
    });
  };

  const copyToClipboard = (code: string) => {
    const baseUrl = window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/join/${code}`);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Team Management</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('invite')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                activeTab === 'invite'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Invite
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                activeTab === 'manage'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Manage
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'invite' ? (
            <div className="space-y-4">
              {/* Tier Status */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Current Plan: {currentTier.toUpperCase()}</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Players ({currentPlayers}/{limits.players})</span>
                      <span>{remainingPlayers} remaining</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(currentPlayers / limits.players) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Admins ({currentAdmins}/{limits.admins})</span>
                      <span>{remainingAdmins} remaining</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(currentAdmins / limits.admins) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'player' | 'admin')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="player">Player {remainingPlayers <= 0 && '(Full)'}</option>
                  <option value="admin">Admin {remainingAdmins <= 0 && '(Full)'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expires After (days)
                </label>
                <input
                  type="number"
                  value={expiresIn}
                  onChange={(e) => setExpiresIn(e.target.value)}
                  min="1"
                  max="30"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {(role === 'player' && remainingPlayers <= 0) || (role === 'admin' && remainingAdmins <= 0) ? (
                <div className="flex items-center gap-2 p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span>
                    {role === 'player' ? 'Player' : 'Admin'} limit reached. 
                    <a href="#pricing" className="underline ml-1">Upgrade your plan</a> to add more members.
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleCreateInvite}
                  className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Generate New Invite Link
                </button>
              )}

              <div className="pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Active Invite Links</h3>
                <div className="space-y-3">
                  {activeInvites.map((invite) => (
                    <div
                      key={invite.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium break-all">{invite.code}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            invite.role === 'admin' 
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {invite.role}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {invite.uses} uses · 
                          Expires {format(invite.expiresAt, 'MMM d, yyyy')}
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(invite.code)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg shrink-0"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  {activeInvites.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      No active invite links
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Admins ({currentAdmins}/{limits.admins})
                </h3>
                <div className="space-y-2">
                  {users
                    .filter(user => user.role === 'admin' || user.role === 'coach')
                    .map((admin) => (
                      <div
                        key={admin.id}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={admin.avatar}
                            alt={admin.name}
                            className="w-8 h-8 rounded-full shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-medium truncate">{admin.name}</div>
                            <div className="text-sm text-gray-500 truncate">{admin.email}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Players ({currentPlayers}/{limits.players})
                </h3>
                <div className="space-y-2">
                  {users
                    .filter(user => user.role === 'player')
                    .map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={player.avatar}
                            alt={player.name}
                            className="w-8 h-8 rounded-full shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-medium truncate">{player.name}</div>
                            <div className="text-sm text-gray-500 truncate">{player.email}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteModal;