import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PricingFeature[];
  isPopular?: boolean;
  selectedBillingCycle: 'monthly' | 'yearly';
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  description,
  monthlyPrice,
  yearlyPrice,
  features,
  isPopular,
  selectedBillingCycle,
}) => {
  const currentPrice = selectedBillingCycle === 'monthly' ? monthlyPrice : yearlyPrice;
  const yearlyDiscount = ((monthlyPrice * 12 - yearlyPrice) / (monthlyPrice * 12) * 100).toFixed(0);

  return (
    <div 
      className={`bg-white rounded-2xl shadow-sm ${
        isPopular ? 'ring-2 ring-primary-600 scale-105' : 'border border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="bg-primary-600 text-white text-sm font-medium px-4 py-1.5 rounded-t-2xl text-center">
          Most Popular
        </div>
      )}
      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            {currentPrice === 0 ? (
              <span className="text-4xl font-bold text-gray-900">Free</span>
            ) : (
              <>
                <span className="text-4xl font-bold text-gray-900">${currentPrice}</span>
                <span className="text-gray-600">/{selectedBillingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </>
            )}
          </div>
          {selectedBillingCycle === 'yearly' && currentPrice > 0 && (
            <div className="text-sm text-green-600 mt-1">
              Save {yearlyDiscount}% with yearly billing
            </div>
          )}
        </div>

        <Link
          to={`/login?signup=true&plan=${name.toLowerCase()}&billing=${selectedBillingCycle}`}
          className={`w-full py-3 px-4 rounded-lg font-medium mb-6 transition-colors block text-center ${
            isPopular
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
          }`}
        >
          {currentPrice === 0 ? 'Start Free' : 'Get Started'}
        </Link>

        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-900 mb-2">Features include:</div>
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className={`w-5 h-5 mt-0.5 ${feature.included ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={`text-sm ${feature.included ? 'text-gray-600' : 'text-gray-400'}`}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;