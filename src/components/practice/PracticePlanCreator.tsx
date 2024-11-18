import React, { useState } from 'react';
import { X, Plus, Clock, AlertCircle } from 'lucide-react';
import { usePracticeStore } from '../../store/practiceStore';
import type { DrillType, PracticeSection } from '../../types/practice';
import { DRILL_TEMPLATES } from '../../types/practice';

interface PracticePlanCreatorProps {
  onClose: () => void;
  eventId?: string | null;
}

const PracticePlanCreator: React.FC<PracticePlanCreatorProps> = ({ onClose, eventId }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState(120); // 2 hours default
  const [sections, setSections] = useState<PracticeSection[]>([]);
  const [notes, setNotes] = useState('');
  const { addPlan } = usePracticeStore();

  const handleAddSection = () => {
    const newSection: PracticeSection = {
      id: Date.now().toString(),
      title: `Section ${sections.length + 1}`,
      duration: 15,
      drills: [],
      notes: '',
    };
    setSections([...sections, newSection]);
  };

  const handleUpdateSection = (index: number, updates: Partial<PracticeSection>) => {
    const updatedSections = [...sections];
    updatedSections[index] = { ...updatedSections[index], ...updates };
    setSections(updatedSections);
  };

  const handleDeleteSection = (index: number) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPlan({
      type: 'practice',
      date: new Date(date),
      duration,
      sections,
      notes,
      isPublic: false,
    });
    onClose();
  };

  const totalSectionDuration = sections.reduce((total, section) => total + section.duration, 0);
  const remainingTime = duration - totalSectionDuration;

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl my-8">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Create Practice Plan</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Practice Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Duration (minutes)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min="30"
                step="15"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {sections.map((section, index) => (
              <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleUpdateSection(index, { title: e.target.value })}
                    className="text-lg font-medium bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                    placeholder="Section Title"
                  />
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={section.duration}
                        onChange={(e) => handleUpdateSection(index, { duration: Number(e.target.value) })}
                        min="5"
                        step="5"
                        className="w-16 px-2 py-1 border border-gray-200 rounded"
                      />
                      <span className="text-sm text-gray-500">min</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteSection(index)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <DrillSelector
                  drills={section.drills}
                  onUpdate={(drills) => handleUpdateSection(index, { drills })}
                />

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Notes
                  </label>
                  <textarea
                    value={section.notes}
                    onChange={(e) => handleUpdateSection(index, { notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-20 resize-none"
                    placeholder="Add any specific instructions or notes for this section..."
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddSection}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Section
            </button>
          </div>

          {remainingTime < 0 && (
            <div className="flex items-center gap-2 text-red-600 mb-4">
              <AlertCircle className="w-5 h-5" />
              <span>Total section duration exceeds practice time by {Math.abs(remainingTime)} minutes</span>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Practice Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
              placeholder="Add any general notes or objectives for the practice session..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={remainingTime < 0}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DrillSelector: React.FC<{
  drills: any[];
  onUpdate: (drills: any[]) => void;
}> = ({ drills, onUpdate }) => {
  const [selectedType, setSelectedType] = useState<DrillType>('warmup');
  const [customDrill, setCustomDrill] = useState('');

  const handleAddDrill = (name: string) => {
    const newDrill = {
      id: Date.now().toString(),
      name,
      duration: 5,
      type: selectedType,
      description: '',
      intensity: 'medium',
    };
    onUpdate([...drills, newDrill]);
  };

  const handleRemoveDrill = (id: string) => {
    onUpdate(drills.filter((drill) => drill.id !== id));
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as DrillType)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
        >
          {Object.keys(DRILL_TEMPLATES).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        {selectedType === 'custom' ? (
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={customDrill}
              onChange={(e) => setCustomDrill(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
              placeholder="Custom drill name..."
            />
            <button
              type="button"
              onClick={() => {
                if (customDrill.trim()) {
                  handleAddDrill(customDrill.trim());
                  setCustomDrill('');
                }
              }}
              className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
        ) : (
          <select
            onChange={(e) => handleAddDrill(e.target.value)}
            value=""
            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
          >
            <option value="">Select a drill...</option>
            {DRILL_TEMPLATES[selectedType].map((drill) => (
              <option key={drill} value={drill}>
                {drill}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="space-y-2">
        {drills.map((drill) => (
          <div
            key={drill.id}
            className="flex items-center justify-between bg-gray-50 p-2 rounded"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{drill.name}</span>
              <input
                type="number"
                value={drill.duration}
                onChange={(e) => {
                  const updatedDrills = drills.map((d) =>
                    d.id === drill.id
                      ? { ...d, duration: Number(e.target.value) }
                      : d
                  );
                  onUpdate(updatedDrills);
                }}
                min="1"
                className="w-16 px-2 py-1 border border-gray-200 rounded text-sm"
              />
              <span className="text-sm text-gray-500">min</span>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveDrill(drill.id)}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticePlanCreator;