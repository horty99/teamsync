import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';

const LandingHeader = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/features"
              className={`text-sm font-medium ${
                location.pathname === '/features'
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className={`text-sm font-medium ${
                location.pathname === '/pricing'
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium ${
                location.pathname === '/about'
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium ${
                location.pathname === '/contact'
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/login?signup=true"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;