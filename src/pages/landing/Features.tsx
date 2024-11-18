import React from 'react';
import { MessageSquare, Calendar, BarChart2, Brain, Shield, Users, Video, Zap, Award } from 'lucide-react';
import Footer from '../../components/Footer';
import LandingHeader from '../../components/landing/LandingHeader';

const Features = () => {
  const features = [
    {
      icon: <MessageSquare className="w-8 h-8 text-primary-600" />,
      title: "Team Communication",
      description: "Keep everyone on the same page with dedicated team channels and direct messaging. Share updates, announcements, and important information instantly.",
      details: [
        "Real-time messaging",
        "File sharing",
        "Team channels",
        "Direct messaging",
        "Read receipts"
      ]
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary-600" />,
      title: "Practice Planning",
      description: "Create and share detailed practice plans, drills, and schedules. Ensure everyone knows what to expect and how to prepare.",
      details: [
        "Interactive calendar",
        "Practice templates",
        "Drill library",
        "Attendance tracking",
        "Schedule notifications"
      ]
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-primary-600" />,
      title: "Performance Analytics",
      description: "Track and analyze team and individual performance with comprehensive statistics and insights.",
      details: [
        "Real-time stats",
        "Performance trends",
        "Player analytics",
        "Team metrics",
        "Custom reports"
      ]
    },
    {
      icon: <Brain className="w-8 h-8 text-primary-600" />,
      title: "AI Sports Psychology",
      description: "Get personalized mental performance advice and support powered by advanced AI.",
      details: [
        "Mental preparation",
        "Performance anxiety",
        "Goal setting",
        "Stress management",
        "Team dynamics"
      ]
    },
    {
      icon: <Video className="w-8 h-8 text-primary-600" />,
      title: "Video Analysis",
      description: "Upload, analyze, and share game footage with advanced video analysis tools.",
      details: [
        "Game footage review",
        "Play annotations",
        "Team highlights",
        "Opponent scouting",
        "Video sharing"
      ]
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: "Game Strategy",
      description: "Design and implement winning game plans with interactive strategy tools.",
      details: [
        "Play diagramming",
        "Formation setup",
        "Tactical analysis",
        "Strategy sharing",
        "Real-time adjustments"
      ]
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Team Management",
      description: "Efficiently manage your roster, roles, and team administration in one place.",
      details: [
        "Roster management",
        "Role assignments",
        "Permission control",
        "Team settings",
        "Member profiles"
      ]
    },
    {
      icon: <Zap className="w-8 h-8 text-primary-600" />,
      title: "Smart Notifications",
      description: "Stay updated with intelligent notifications for important team events and updates.",
      details: [
        "Custom alerts",
        "Priority notifications",
        "Schedule reminders",
        "Team updates",
        "Event changes"
      ]
    },
    {
      icon: <Award className="w-8 h-8 text-primary-600" />,
      title: "Goal Tracking",
      description: "Set, monitor, and achieve team and individual goals throughout the season.",
      details: [
        "Goal setting",
        "Progress tracking",
        "Achievement rewards",
        "Performance targets",
        "Success metrics"
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
              Features that Power Your Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage, communicate, and succeed as a team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Features;