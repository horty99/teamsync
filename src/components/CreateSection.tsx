import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Video, BookOpen, Clipboard, Plus } from 'lucide-react';

interface QuickCreateCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const QuickCreateCard: React.FC<QuickCreateCardProps> = ({ icon, title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-500 transition-colors text-left w-full"
    >
      <div className="p-3 bg-gray-50 rounded-lg shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </button>
  );
};

const CreateSection = () => {
  const navigate = useNavigate();

  const quickCreateItems = [
    {
      icon: <Calendar className="w-6 h-6 text-green-600" />,
      title: "Schedule Event",
      description: "Create a new practice, game, or team meeting",
      onClick: () => navigate('/calendar')
    },
    {
      icon: <Video className="w-6 h-6 text-blue-600" />,
      title: "Upload Scouting Video",
      description: "Share game footage and analysis with the team",
      onClick: () => navigate('/scouting')
    },
    {
      icon: <BookOpen className="w-6 h-6 text-purple-600" />,
      title: "Create Play",
      description: "Design new offensive or defensive strategies",
      onClick: () => navigate('/playbook')
    },
    {
      icon: <Clipboard className="w-6 h-6 text-indigo-600" />,
      title: "Create Practice Plan",
      description: "Plan and organize team practice sessions",
      onClick: () => navigate('/plans')
    }
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Plus className="w-5 h-5 text-primary-600" />
        <h2 className="text-lg font-semibold text-gray-900">Quick Create</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickCreateItems.map((item, index) => (
          <QuickCreateCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CreateSection;