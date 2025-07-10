import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string | null;
  type: 'success' | 'error' | null;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Give time for animation before clearing message
        setTimeout(onClose, 500); 
      }, 3000); // Notification visible for 3 seconds
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [message, onClose]);

  if (!message || !isVisible) return null;

  const baseClasses = "fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white transform transition-all duration-300 ease-out z-50";
  const successClasses = "bg-green-500";
  const errorClasses = "bg-red-500";

  return (
    <div
      className={`${baseClasses} ${type === 'success' ? successClasses : errorClasses} ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      role="alert"
    >
      <div className="flex items-center">
        {type === 'success' && (
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )}
        {type === 'error' && (
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )}
        <span>{message}</span>
        <button
          onClick={() => { setIsVisible(false); setTimeout(onClose, 500); }}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
