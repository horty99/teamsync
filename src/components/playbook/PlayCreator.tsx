import React, { useState, useEffect, useRef } from 'react';
import { Save, Plus } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import BasketballCourt from './BasketballCourt';
import PlayerMarker from './PlayerMarker';
import PlayControls from './PlayControls';

interface Player {
  id: string;
  x: number;
  y: number;
  type: 'offense' | 'defense';
  number: number;
}

interface PlayStep {
  id: string;
  players: Player[];
  description: string;
  duration: number;
}

const PlayCreator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 }); // Default dimensions
  const { currentUser } = useChatStore();
  const [courtType, setCourtType] = useState<'full' | 'half'>('half');
  const [steps, setSteps] = useState<PlayStep[]>([
    { id: '1', players: [], description: '', duration: 2000 }
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [playName, setPlayName] = useState('');
  const [playCategory, setPlayCategory] = useState('offense');
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewStep, setPreviewStep] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ 
          width: Math.max(width, 400), 
          height: Math.max(height, 300) 
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPreviewStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, steps[previewStep]?.duration || 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps, previewStep]);

  const addPlayer = (type: 'offense' | 'defense') => {
    const newPlayer: Player = {
      id: Date.now().toString(),
      x: 50,
      y: type === 'offense' ? 70 : 30,
      type,
      number: steps[currentStep].players.filter(p => p.type === type).length + 1
    };

    const updatedSteps = [...steps];
    updatedSteps[currentStep].players.push(newPlayer);
    setSteps(updatedSteps);
  };

  const movePlayer = (playerId: string, x: number, y: number) => {
    const updatedSteps = [...steps];
    const player = updatedSteps[currentStep].players.find(p => p.id === playerId);
    if (player) {
      player.x = x;
      player.y = y;
    }
    setSteps(updatedSteps);
  };

  const addStep = () => {
    setSteps([...steps, { 
      id: Date.now().toString(),
      players: [...steps[currentStep].players],
      description: '',
      duration: 2000
    }]);
    setCurrentStep(steps.length);
  };

  if (currentUser.role !== 'coach') return null;

  const currentPlayers = isPlaying ? steps[previewStep].players : steps[currentStep].players;
  const nextStepPlayers = isPlaying || currentStep >= steps.length - 1 
    ? null 
    : steps[currentStep + 1].players;

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Create New Play</h2>
          <PlayControls
            isPlaying={isPlaying}
            currentStep={previewStep}
            totalSteps={steps.length}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onPrevStep={() => setPreviewStep(Math.max(0, previewStep - 1))}
            onNextStep={() => setPreviewStep(Math.min(steps.length - 1, previewStep + 1))}
          />
        </div>

        <div className="p-4 grid grid-cols-3 gap-4">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Play Name"
              value={playName}
              onChange={(e) => setPlayName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg"
            />

            <select
              value={playCategory}
              onChange={(e) => setPlayCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg"
            >
              <option value="offense">Offense</option>
              <option value="defense">Defense</option>
              <option value="out-of-bounds">Out of Bounds</option>
              <option value="special">Special Plays</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setCourtType('half')}
                className={`flex-1 py-2 px-3 rounded-lg ${
                  courtType === 'half' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Half Court
              </button>
              <button
                onClick={() => setCourtType('full')}
                className={`flex-1 py-2 px-3 rounded-lg ${
                  courtType === 'full' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Full Court
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => addPlayer('offense')}
                className="w-full py-2 px-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                Add Offensive Player
              </button>
              <button
                onClick={() => addPlayer('defense')}
                className="w-full py-2 px-3 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
              >
                Add Defensive Player
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Step Duration (seconds)
              </label>
              <input
                type="number"
                min="0.5"
                max="10"
                step="0.5"
                value={steps[currentStep].duration / 1000}
                onChange={(e) => {
                  const updatedSteps = [...steps];
                  updatedSteps[currentStep].duration = Number(e.target.value) * 1000;
                  setSteps(updatedSteps);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Step Description
              </label>
              <textarea
                value={steps[currentStep].description}
                onChange={(e) => {
                  const updatedSteps = [...steps];
                  updatedSteps[currentStep].description = e.target.value;
                  setSteps(updatedSteps);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg h-24 resize-none"
                placeholder="Describe this step of the play..."
              />
            </div>
          </div>

          <div className="col-span-2 relative bg-gray-100 rounded-lg aspect-[16/9]" ref={containerRef}>
            <BasketballCourt 
              type={courtType}
              width={dimensions.width}
              height={dimensions.height}
            >
              {currentPlayers.map((player) => (
                <PlayerMarker
                  key={player.id}
                  player={player}
                  nextPosition={nextStepPlayers?.find(p => p.id === player.id)}
                  isAnimating={isPlaying}
                  onDragEnd={(x, y) => movePlayer(player.id, x, y)}
                  stageWidth={dimensions.width}
                  stageHeight={dimensions.height}
                />
              ))}
            </BasketballCourt>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={addStep}
              className="py-2 px-4 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <Plus className="w-5 h-5" />
              Add Step
            </button>
            <select
              value={currentStep}
              onChange={(e) => setCurrentStep(Number(e.target.value))}
              className="px-3 py-2 border border-gray-200 rounded-lg"
            >
              {steps.map((_, index) => (
                <option key={index} value={index}>
                  Step {index + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              className="py-2 px-4 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <Save className="w-5 h-5" />
              Save Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayCreator;