export interface ScoutingVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: number; // in seconds
  uploadedAt: Date;
  tags: string[];
}

export interface VideoProgress {
  userId: string;
  videoId: string;
  watchedSeconds: number;
  lastWatched: Date;
  completed: boolean;
}

export interface ScoutingStore {
  videos: ScoutingVideo[];
  progress: VideoProgress[];
  addVideo: (video: Omit<ScoutingVideo, 'id' | 'uploadedAt'>) => void;
  updateProgress: (progress: Omit<VideoProgress, 'lastWatched'>) => void;
  getVideoProgress: (videoId: string, userId: string) => VideoProgress | undefined;
}