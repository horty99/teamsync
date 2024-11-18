import { create } from 'zustand';
import type { InviteLink } from '../types/chat';

interface InviteState {
  invites: InviteLink[];
  createInvite: (params: {
    role: 'player' | 'admin';
    createdBy: string;
    expiresIn?: number;
  }) => InviteLink;
  getInvite: (code: string) => InviteLink | undefined;
  useInvite: (code: string) => boolean;
  deactivateInvite: (id: string) => void;
  getActiveInvites: () => InviteLink[];
}

export const useInviteStore = create<InviteState>((set, get) => ({
  invites: [],

  createInvite: ({ role, createdBy, expiresIn = 7 * 24 * 60 * 60 * 1000 }) => {
    const code = generateInviteCode();
    const invite: InviteLink = {
      id: Date.now().toString(),
      code,
      createdBy,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + expiresIn),
      uses: 0,
      role,
      active: true,
    };

    set(state => ({
      invites: [...state.invites, invite],
    }));

    return invite;
  },

  getInvite: (code) => {
    return get().invites.find(invite => invite.code === code);
  },

  useInvite: (code) => {
    const invite = get().getInvite(code);
    if (!invite || !invite.active) return false;

    if (invite.expiresAt < new Date()) {
      get().deactivateInvite(invite.id);
      return false;
    }

    set(state => ({
      invites: state.invites.map(inv =>
        inv.id === invite.id ? { ...inv, uses: inv.uses + 1 } : inv
      ),
    }));

    return true;
  },

  deactivateInvite: (id) => {
    set(state => ({
      invites: state.invites.map(invite =>
        invite.id === id ? { ...invite, active: false } : invite
      ),
    }));
  },

  getActiveInvites: () => {
    const now = new Date();
    return get().invites.filter(invite => 
      invite.active && 
      invite.expiresAt > now
    );
  },
}));

function generateInviteCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}