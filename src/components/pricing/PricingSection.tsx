import React, { useState } from 'react';
import PricingCard from './PricingCard';

const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = (plan: string, cycle: 'monthly' | 'yearly') => {
    console.log(`Selected ${plan} plan with ${cycle} billing`);
  };

  const plans = [
    {
      name: 'Free',
      description: 'Basic team communication',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { text: 'Team Chat Channels', included: true },
        { text: 'Direct Line to Coach', included: true },
        { text: 'Up to 20 Members', included: true },
        { text: 'Calendar Features', included: false },
        { text: 'Practice Plans', included: false },
        { text: 'Game Strategies', included: false },
        { text: 'Performance Analytics', included: false },
        { text: 'AI Assistants', included: false },
      ],
    },
    {
      name: 'Team Pro',
      description: 'Full access for one team',
      monthlyPrice: 149,
      yearlyPrice: 1249,
      features: [
        { text: 'All Free Features', included: true },
        { text: 'Practice Plan Creation', included: true },
        { text: 'Game Strategy Builder', included: true },
        { text: 'Performance Analytics', included: true },
        { text: 'Video Analysis', included: true },
        { text: 'AI Sports Psychology', included: true },
        { text: 'AI Nutrition Guidance', included: true },
        { text: 'Up to 25 Players + 3 Admins', included: true },
      ],
      isPopular: true,
    },
    {
      name: 'Club',
      description: 'Perfect for multiple teams',
      monthlyPrice: 399,
      yearlyPrice: 3349,
      features: [
        { text: 'All Pro Features', included: true },
        { text: 'Up to 3 Teams', included: true },
        { text: '60 Players Total', included: true },
        { text: '9 Admin Accounts', included: true },
        { text: 'Club-wide Analytics', included: true },
        { text: 'Resource Sharing', included: true },
        { text: 'Multi-team Stats', included: true },
        { text: 'Priority Support', included: true },
      ],
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrice: 999,
      yearlyPrice: 8399,
      features: [
        { text: 'All Club Features', included: true },
        { text: 'Up to 10 Teams', included: true },
        { text: '200+ Players', included: true },
        { text: 'Unlimited Admins', included: true },
        { text: 'Organization Analytics', included: true },
        { text: 'Custom Integrations', included: true },
        { text: 'Data Export Tools', included: true },
        { text: '24/7 Priority Support', included: true },
      ],
    },
  ];

  return (
    <div className="bg-gray-50 py-24" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-600 mb-8">Start free or go unlimited with our pro plans</p>
          
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg font-medium ${
                billingCycle === 'monthly'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-lg font-medium ${
                billingCycle === 'yearly'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly (30% off)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              {...plan}
              selectedBillingCycle={billingCycle}
              onSelect={(cycle) => handleSubscribe(plan.name, cycle)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;