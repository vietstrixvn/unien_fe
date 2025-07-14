'use client';

import { Icons } from '@/assetts/icons';
import { ArrowUp, Facebook } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">
      <a
        href="https://m.me/your_facebook_username"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#1877F2] text-white rounded-full shadow-md hover:bg-[#145DBF] flex items-center justify-center transition duration-300"
        aria-label="Facebook Messenger"
      >
        <Facebook size={20} />
      </a>

      <a
        href="https://zaloapp.com/qr/p/jjcnb0x5v67k"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 flex items-center justify-center transition duration-300"
        aria-label="Zalo"
      >
        <Image src="/icons/zalo.svg" alt="zalo icon" width={40} height={40} />
      </a>

      <a
        href="tel:0906723985"
        className="w-12 h-12 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition duration-300 call-glow"
        aria-label="Gọi ngay"
      >
        <span className="call-wiggle">
          <Icons.PhoneCall size={24} />
        </span>
      </a>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-main text-white rounded-full shadow-md hover:bg-main-700 flex items-center justify-center transition duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};
