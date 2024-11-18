import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/10 transform hover:scale-105">
      <div className="p-4 bg-white/10 rounded-lg w-fit mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-white/80 leading-relaxed text-lg">{description}</p>
    </div>
  );
};

export default FeatureCard;