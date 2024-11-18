import React from 'react';
import Footer from '../../components/Footer';
import LandingHeader from '../../components/landing/LandingHeader';
import { Briefcase, Heart, Globe, Zap, Users, Trophy } from 'lucide-react';

const Careers = () => {
  const benefits = [
    {
      icon: <Heart className="w-8 h-8 text-primary-600" />,
      title: "Health & Wellness",
      description: "Comprehensive health coverage, wellness programs, and gym memberships."
    },
    {
      icon: <Globe className="w-8 h-8 text-primary-600" />,
      title: "Remote Work",
      description: "Flexible work arrangements with the option to work from anywhere."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary-600" />,
      title: "Growth & Development",
      description: "Professional development budget and continuous learning opportunities."
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Team Events",
      description: "Regular team building activities and social events."
    },
    {
      icon: <Trophy className="w-8 h-8 text-primary-600" />,
      title: "Performance Rewards",
      description: "Competitive compensation with performance-based bonuses."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-primary-600" />,
      title: "Work-Life Balance",
      description: "Unlimited PTO and flexible working hours."
    }
  ];

  const openPositions = [
    {
      department: "Engineering",
      roles: [
        { title: "Senior Full Stack Developer", location: "Remote", type: "Full-time" },
        { title: "Mobile Developer", location: "Remote", type: "Full-time" },
        { title: "DevOps Engineer", location: "Remote", type: "Full-time" }
      ]
    },
    {
      department: "Product",
      roles: [
        { title: "Product Manager", location: "Remote", type: "Full-time" },
        { title: "UX Designer", location: "Remote", type: "Full-time" }
      ]
    },
    {
      department: "Sales",
      roles: [
        { title: "Enterprise Sales Manager", location: "Remote", type: "Full-time" },
        { title: "Sales Development Representative", location: "Remote", type: "Full-time" }
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
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Help us revolutionize sports team communication and management. We're looking for passionate individuals to join our mission.
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

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Open Positions</h2>
            <div className="space-y-8">
              {openPositions.map((department, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {department.department}
                  </h3>
                  <div className="space-y-4">
                    {department.roles.map((role, roleIndex) => (
                      <div key={roleIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div>
                          <h4 className="font-medium text-gray-900">{role.title}</h4>
                          <div className="text-sm text-gray-600">
                            {role.location} • {role.type}
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                          Apply Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Don't see the right role?</h2>
            <p className="text-xl mb-8 text-primary-100">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button className="px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50">
              Submit Resume
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;