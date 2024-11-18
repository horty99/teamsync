import React from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

interface PlayControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  onPlayPause: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}

const PlayControls: React.FC<PlayControlsProps> = ({
  isPlaying,
  currentStep,
  totalSteps,
  onPlayPause,
  onPrevStep,
  onNextStep,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onPlayPause}
        className="p-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
      <button
        onClick={onPrevStep}
        disabled={currentStep === 0}
        className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span className="text-sm text-gray-600">
        Step {currentStep + 1} of {totalSteps}
      </span>
      <button
        onClick={onNextStep}
        disabled={currentStep === totalSteps - 1}
        className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PlayControls;