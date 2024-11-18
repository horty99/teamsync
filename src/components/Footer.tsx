import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <Logo variant="light" />
            <p className="text-gray-400">
              Empowering teams to achieve excellence through seamless communication and strategic coordination.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-gray-400 hover:text-white">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link to="/security" className="text-gray-400 hover:text-white">Security</Link></li>
              <li><Link to="/enterprise" className="text-gray-400 hover:text-white">Enterprise</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link to="/partners" className="text-gray-400 hover:text-white">Partners</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-400 max-w-3xl mx-auto">
              To revolutionize team sports communication and coordination, empowering teams to excel from practice to game day. 
              We believe that effective communication builds chemistry, and strong chemistry leads to championships.
            </p>
            <div className="flex justify-center gap-8 mt-6">
              <div className="text-center">
                <p className="text-lg font-semibold">Get on the same page</p>
                <p className="text-gray-400">Unite your team's vision</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">Build chemistry</p>
                <p className="text-gray-400">Strengthen team bonds</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">Win more games</p>
                <p className="text-gray-400">Achieve excellence together</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">© 2024 TeamSync. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;