import { create } from 'zustand';
import type { ScoutingStore, ScoutingVideo, VideoProgress } from '../types/scouting';

export const useScoutingStore = create<ScoutingStore>((set, get) => ({
  videos: [],
  progress: [],

  addVideo: (videoData) => {
    const newVideo: ScoutingVideo = {
      id: Date.now().toString(),
      ...videoData,
      uploadedAt: new Date(),
    };
    set((state) => ({
      videos: [...state.videos, newVideo],
    }));
  },

  updateProgress: (progressData) => {
    set((state) => {
      const existingIndex = state.progress.findIndex(
        (p) => p.userId === progressData.userId && p.videoId === progressData.videoId
      );

      const newProgress: VideoProgress = {
        ...progressData,
        lastWatched: new Date(),
      };

      const progress = [...state.progress];
      if (existingIndex >= 0) {
        progress[existingIndex] = newProgress;
      } else {
        progress.push(newProgress);
      }

      return { progress };
    });
  },

  getVideoProgress: (videoId, userId) => {
    return get().progress.find(
      (p) => p.videoId === videoId && p.userId === userId
    );
  },
}));