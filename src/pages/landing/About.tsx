import React from 'react';
import Footer from '../../components/Footer';
import LandingHeader from '../../components/landing/LandingHeader';

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      bio: "Former Division I basketball coach with 15 years of experience in sports technology."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      bio: "Tech veteran with experience at major sports analytics companies."
    },
    // Add more team members...
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Story
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building the future of team sports communication and coordination
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Founded by Coaches, Built for Teams
              </h2>
              <p className="text-gray-600 mb-6">
                TeamSync was born from the real challenges faced by coaches and athletes. 
                Our founders experienced firsthand the communication gaps and coordination 
                challenges that teams face daily.
              </p>
              <p className="text-gray-600">
                Today, we're proud to serve thousands of teams worldwide, helping them 
                achieve their full potential through better communication and organization.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&h=600&fit=crop"
                alt="Team huddle"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 text-center">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 text-center mb-4">{member.role}</p>
                  <p className="text-gray-600 text-center">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
            <p className="text-xl mb-8">
              We're always looking for talented individuals who are passionate about sports and technology.
            </p>
            <a
              href="/careers"
              className="inline-block px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;