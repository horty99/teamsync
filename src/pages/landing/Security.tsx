import React from 'react';
import Footer from '../../components/Footer';
import LandingHeader from '../../components/landing/LandingHeader';
import { Shield, Lock, Key, CheckCircle } from 'lucide-react';

const Security = () => {
  const securityFeatures = [
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: "End-to-End Encryption",
      description: "All communications and data are encrypted in transit and at rest using industry-standard protocols."
    },
    {
      icon: <Lock className="w-8 h-8 text-primary-600" />,
      title: "Role-Based Access Control",
      description: "Granular permissions ensure users can only access the information they need."
    },
    {
      icon: <Key className="w-8 h-8 text-primary-600" />,
      title: "Two-Factor Authentication",
      description: "Optional 2FA adds an extra layer of security to protect sensitive team data."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary-600" />,
      title: "Regular Security Audits",
      description: "Our systems undergo regular penetration testing and security assessments."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Security
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your team's data security is our top priority. TeamSync implements multiple layers of protection to keep your information safe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {securityFeatures.map((feature, index) => (
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

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Security Commitment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Data Protection</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• AES-256 encryption</li>
                  <li>• Secure data backups</li>
                  <li>• Data access logging</li>
                  <li>• Regular security updates</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Compliance</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• GDPR compliant</li>
                  <li>• CCPA compliant</li>
                  <li>• SOC 2 certified</li>
                  <li>• Regular audits</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Infrastructure</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Cloud security</li>
                  <li>• DDoS protection</li>
                  <li>• 24/7 monitoring</li>
                  <li>• Disaster recovery</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-primary-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to secure your team's data?</h2>
            <p className="text-xl mb-8 text-primary-100">
              Join thousands of teams who trust TeamSync with their sensitive information.
            </p>
            <button className="px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50">
              Get Started
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Security;