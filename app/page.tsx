"use client";
import React, { useState, useEffect } from 'react';
import { Code, Database, Cpu } from 'lucide-react';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
}

const TypeWriter = ({ text, speed = 50, delay = 0 }: TypeWriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setStartTyping(true);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [delay]);

  useEffect(() => {
    if (!startTyping) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, startTyping]);

  return <span>{displayText}</span>;
};

const ComingSoonPage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-slate-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute transform rotate-45 border border-indigo-700/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: '60px',
                height: '60px',
                animationDelay: `${i * 0.2}s`,
                animation: 'float 10s infinite ease-in-out'
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Profile Section */}
        <div className="mb-12 space-y-6">
          <div className="relative group cursor-pointer mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full mx-auto flex items-center justify-center transform transition-all duration-300 group-hover:scale-105">
              <span className="text-4xl font-bold">MD</span>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
          </div>

          <div className="min-h-[4rem]">
            {showContent && (
              <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-violet-200 animate-gradient">
                <TypeWriter text="Manik Dingra" speed={50} />
              </h1>
            )}
          </div>

          <div className="min-h-[2rem]">
            {showContent && (
              <h2 className="text-2xl md:text-3xl text-indigo-200">
                <TypeWriter text="Full Stack Developer" speed={50} delay={1200} />
              </h2>
            )}
          </div>
        </div>

        {/* Skills Preview */}
        <div className="flex justify-center gap-8 my-12 opacity-0 animate-fadeIn"
          style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}>
          {[
            { Icon: Code, label: "Frontend Development" },
            { Icon: Database, label: "Backend Systems" },
            { Icon: Cpu, label: "Devops" }
          ].map(({ Icon, label }) => (
            <div key={label} className="flex justify-center items-center gap-2 w-32 h-32 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full mx-auto group relative">
              <div className="relative flex flex-col items-center space-y-2 p-4">
                <Icon className="w-8 h-8 text-indigo-300 group-hover:text-indigo-200 transition-colors" />
                <span className="text-sm text-indigo-200">{label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className="space-y-6 transform transition-all duration-500 min-h-[4rem]">
          {showContent && (
            <p className="text-xl text-indigo-200/90 max-w-lg mx-auto leading-relaxed">
              <TypeWriter
                text="Hey there! 👋 While I'm busy turning coffee into code and building this portfolio, feel free to grab a virtual cup and wait with me. I promise it'll be worth the bytes!"
                speed={20}
                delay={2000}
              />
            </p>
          )}
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-8 mt-12 opacity-0 animate-fadeIn"
          style={{ animationDelay: '4s', animationFillMode: 'forwards' }}>
          {[
            { Icon: FaGithub, href: "https://github.com/M-A-N-I-K", label: "GitHub" },
            { Icon: FaLinkedin, href: "https://www.linkedin.com/in/manik.dingra", label: "LinkedIn" },
            { Icon: FaTwitter, href: "https://twitter.com/manik_dingra", label: "Twitter" }
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="group relative p-4 hover:scale-110 transition-all duration-300"
              aria-label={label}
            >
              <div className="absolute inset-0 bg-indigo-500/10 rounded-lg blur-sm transform group-hover:bg-indigo-500/30 transition-all duration-300"></div>
              <Icon className="w-6 h-6 relative z-10 group-hover:text-indigo-200 transition-colors duration-300" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20"></div>

      {/* Footer */}
      <footer className="absolute bottom-8 text-sm text-indigo-200/60 opacity-0 animate-fadeIn"
        style={{ animationDelay: '4.5s', animationFillMode: 'forwards' }}>
        <p>Portfolio Launch Coming Soon</p>
      </footer>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 8s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ComingSoonPage;