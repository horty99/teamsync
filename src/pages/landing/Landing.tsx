import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import { MessageSquare, Calendar, BarChart2, Brain, Shield, Users } from 'lucide-react';
import FeatureCard from '../../components/FeatureCard';
import PricingSection from '../../components/pricing/PricingSection';
import Footer from '../../components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Logo variant="light" />
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/features" className="text-white/80 hover:text-white">Features</Link>
              <Link to="/pricing" className="text-white/80 hover:text-white">Pricing</Link>
              <Link to="/about" className="text-white/80 hover:text-white">About</Link>
              <Link to="/contact" className="text-white/80 hover:text-white">Contact</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-4 py-2 text-white/90 hover:text-white font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/login?signup=true"
                className="px-4 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
          <div className="text-center">
            <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Unite Your Team's Success
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              The all-in-one platform for sports team communication, strategy planning, and performance tracking.
            </p>
            <div className="mt-10">
              <Link
                to="/login?signup=true"
                className="inline-block px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-900" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Everything Your Team Needs</h2>
            <p className="mt-4 text-xl text-gray-400">
              Powerful tools designed for modern sports teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="w-6 h-6 text-white" />}
              title="Team Communication"
              description="Keep everyone on the same page with dedicated team channels and direct messaging."
            />
            <FeatureCard
              icon={<Calendar className="w-6 h-6 text-white" />}
              title="Practice Planning"
              description="Create and share detailed practice plans, drills, and schedules."
            />
            <FeatureCard
              icon={<BarChart2 className="w-6 h-6 text-white" />}
              title="Performance Analytics"
              description="Track team and individual stats with detailed analytics and insights."
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6 text-white" />}
              title="AI Sports Psychology"
              description="Get personalized mental performance advice powered by AI."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6 text-white" />}
              title="Game Strategy"
              description="Design and share game plans, plays, and tactical analysis."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6 text-white" />}
              title="Team Management"
              description="Handle roster management, roles, and permissions with ease."
            />
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;