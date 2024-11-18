import React from 'react';
import Footer from '../../components/Footer';
import LandingHeader from '../../components/landing/LandingHeader';
import { Building2, Users, BarChart2, Shield, Clock, Headphones } from 'lucide-react';

const Enterprise = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Unlimited Teams",
      description: "Support for unlimited teams, players, and administrators across your organization."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: "Advanced Security",
      description: "Enterprise-grade security features including SSO, audit logs, and custom data retention."
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-primary-600" />,
      title: "Advanced Analytics",
      description: "Cross-team analytics and insights to optimize performance across your organization."
    },
    {
      icon: <Building2 className="w-8 h-8 text-primary-600" />,
      title: "Custom Branding",
      description: "White-label solution with custom domain and branding options."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary-600" />,
      title: "99.99% Uptime",
      description: "Enterprise SLA with guaranteed uptime and priority infrastructure."
    },
    {
      icon: <Headphones className="w-8 h-8 text-primary-600" />,
      title: "24/7 Support",
      description: "Dedicated account manager and round-the-clock technical support."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scale your sports program with enterprise-grade features, security, and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-primary-500 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary-50 rounded-lg">
                    {feature.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h2>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enterprise Controls</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  <span className="text-gray-600">Single Sign-On (SSO) integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  <span className="text-gray-600">Advanced user management</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  <span className="text-gray-600">Custom data retention policies</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  <span className="text-gray-600">API access and custom integrations</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enterprise Support</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  <span className="text-gray-600">Dedicated account manager</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  <span className="text-gray-600">24/7 priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  <span className="text-gray-600">Custom training and onboarding</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  <span className="text-gray-600">Quarterly business reviews</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-primary-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to scale your sports program?</h2>
            <p className="text-xl mb-8 text-primary-100">
              Contact our enterprise team to discuss your organization's needs.
            </p>
            <button className="px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50">
              Contact Sales
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Enterprise;