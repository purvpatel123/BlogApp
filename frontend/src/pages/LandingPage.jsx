import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  const handleLogin = () => {
    console.log('Login clicked');
    navigate('/Login');
  };

  const handleRegister = () => {
    console.log('Register clicked');
    navigate('/Register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden relative">
      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-70"
          style={{
            left: `${particle.left}%`,
            animation: `particle ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-40 right-10 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-bounce"></div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center max-w-4xl mx-auto px-6">
          {/* Logo Section */}
          <div className="mb-8">
            <div className="inline-block p-6 bg-white/10 backdrop-blur-md rounded-3xl mb-6 border border-white/20 shadow-2xl">
              <svg 
                className="w-16 h-16 mx-auto text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Blog
              </span>
              <span className="text-white ml-2">App</span>
            </h1>
            
            <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-pink-400 mx-auto rounded-full mb-6"></div>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-light leading-relaxed">
            Transform your thoughts into
            <span className="font-semibold text-transparent bg-gradient-to-r from-blue-300 to-pink-300 bg-clip-text">
              {" "}captivating stories
            </span>
          </p>
          
          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
            Join thousands of writers sharing their perspectives, insights, and creativity with the world
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button 
              onClick={handleLogin}
              className="group bg-white text-gray-800 px-10 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-white/20 hover:-translate-y-2 transition-all duration-300 min-w-[200px] relative overflow-hidden"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
            
            <button 
              onClick={handleRegister}
              className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-2 transition-all duration-300 min-w-[200px] relative overflow-hidden border border-white/20"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['✨ Rich Editor', '🌐 Global Reach', '💡 AI Insights', '📱 Mobile Ready'].map((feature, index) => (
              <div 
                key={index}
                className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/80 text-sm hover:bg-white/20 transition-all duration-300 cursor-default"
              >
                {feature}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">50K+</div>
              <div className="text-sm text-white/60">Writers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">1M+</div>
              <div className="text-sm text-white/60">Stories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">10M+</div>
              <div className="text-sm text-white/60">Readers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes particle {
          0% { 
            transform: translateY(100vh) translateX(-50px); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100px) translateX(50px); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;