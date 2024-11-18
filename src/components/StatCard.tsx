import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, trend, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${onClick ? 'cursor-pointer hover:border-primary-500 transition-colors' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
        <div>
          <h3 className="text-gray-600 text-sm">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{trend}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;