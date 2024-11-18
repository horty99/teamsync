import React from 'react';
import Footer from '../../components/Footer';
import LandingHeader from '../../components/landing/LandingHeader';
import { Building2, Users, BarChart2, Globe, Award, Zap } from 'lucide-react';

const Partners = () => {
  const benefits = [
    {
      icon: <Globe className="w-8 h-8 text-primary-600" />,
      title: "Global Reach",
      description: "Access to our worldwide network of sports organizations and teams."
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Joint Marketing",
      description: "Co-marketing opportunities and shared promotional campaigns."
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-primary-600" />,
      title: "Revenue Share",
      description: "Competitive revenue sharing model for long-term growth."
    },
    {
      icon: <Building2 className="w-8 h-8 text-primary-600" />,
      title: "Technical Support",
      description: "Dedicated technical support and integration assistance."
    },
    {
      icon: <Award className="w-8 h-8 text-primary-600" />,
      title: "Certification",
      description: "Official partner certification and training programs."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary-600" />,
      title: "API Access",
      description: "Priority access to our APIs and development tools."
    }
  ];

  const partnerTypes = [
    {
      title: "Technology Partners",
      description: "Integrate your solutions with our platform to provide enhanced functionality.",
      features: [
        "API integration support",
        "Technical documentation",
        "Development resources",
        "Testing environment"
      ]
    },
    {
      title: "Solution Partners",
      description: "Resell and implement TeamSync solutions for your clients.",
      features: [
        "Sales enablement",
        "Implementation support",
        "Partner portal access",
        "Training resources"
      ]
    },
    {
      title: "Strategic Partners",
      description: "Long-term partnerships focused on market expansion and innovation.",
      features: [
        "Joint roadmap planning",
        "Executive sponsorship",
        "Co-marketing opportunities",
        "Priority support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Partner Program
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our partner ecosystem and grow your business with TeamSync. We offer comprehensive support and resources for mutual success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-primary-500 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary-50 rounded-lg">
                    {benefit.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {benefit.title}
                  </h2>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-8 mb-16">
            {partnerTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {type.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {type.description}
                    </p>
                    <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                      Learn More
                    </button>
                  </div>
                  <div className="space-y-3">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Partner with Us?</h2>
            <p className="text-xl mb-8 text-primary-100">
              Take the first step towards a successful partnership. Apply to our partner program today.
            </p>
            <button className="px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50">
              Apply Now
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Partners;