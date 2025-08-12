import { useEffect, useState } from 'react';
import spaceshipImage from '@/assets/spaceship.png';

const FlyingSpaceship = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [direction, setDirection] = useState<'diagonal-right' | 'diagonal-left' | 'diagonal-up' | 'diagonal-down'>('diagonal-right');

  useEffect(() => {
    const showSpaceship = () => {
      // Random diagonal directions only
      const directions: ('diagonal-right' | 'diagonal-left' | 'diagonal-up' | 'diagonal-down')[] = 
        ['diagonal-right', 'diagonal-left', 'diagonal-up', 'diagonal-down'];
      setDirection(directions[Math.floor(Math.random() * directions.length)]);
      
      setIsVisible(true);
      setAnimationKey(prev => prev + 1);
      
      // Hide after animation completes (8 seconds for slower diagonal movement)
      setTimeout(() => {
        setIsVisible(false);
      }, 8000);
    };

    // Show spaceship every 8-15 seconds (random interval)
    const scheduleNext = () => {
      const delay = 8000 + Math.random() * 7000; // 8-15 seconds
      setTimeout(() => {
        showSpaceship();
        scheduleNext();
      }, delay);
    };

    // Initial delay before first spaceship
    const initialDelay = 5000 + Math.random() * 5000; // 5-10 seconds
    setTimeout(() => {
      showSpaceship();
      scheduleNext();
    }, initialDelay);

  }, []);

  if (!isVisible) return null;

  const randomHeight = 10 + Math.random() * 80; // Random height between 10% and 90% of viewport
  const randomHorizontal = 10 + Math.random() * 80; // Random horizontal position
  
  // Different starting positions and animations based on diagonal direction
  const getPositionAndAnimation = () => {
    switch (direction) {
      case 'diagonal-right':
        return {
          style: {
            bottom: '10%',
            left: '-100px',
            transform: 'rotate(25deg)', // Face forward-right
            animation: 'flyDiagonalUpRight 12s ease-in-out forwards, hoverFloat 2s ease-in-out infinite',
          }
        };
      case 'diagonal-left':
        return {
          style: {
            bottom: '10%',
            right: '-100px',
            transform: 'rotate(-155deg)', // Face forward-left
            animation: 'flyDiagonalUpLeft 12s ease-in-out forwards, hoverFloat 2s ease-in-out infinite',
          }
        };
      case 'diagonal-up':
        return {
          style: {
            bottom: '-100px',
            left: `${randomHorizontal}%`,
            transform: 'rotate(-90deg)', // Face upward
            animation: 'flyDiagonalUp 10s ease-in-out forwards, hoverFloat 2s ease-in-out infinite',
          }
        };
      case 'diagonal-down':
        return {
          style: {
            top: '-100px',
            left: `${randomHorizontal}%`,
            transform: 'rotate(90deg)', // Face downward
            animation: 'flyDiagonalDown 10s ease-in-out forwards, hoverFloat 2s ease-in-out infinite',
          }
        };
      default:
        return {
          style: {
            bottom: '10%',
            left: '-100px',
            transform: 'rotate(25deg)',
            animation: 'flyDiagonalUpRight 12s ease-in-out forwards, hoverFloat 2s ease-in-out infinite',
          }
        };
    }
  };

  const { style } = getPositionAndAnimation();

  return (
    <div
      key={animationKey}
      className="spaceship-container"
      style={style}
    >
      {/* Fire trail */}
      <div 
        className="fire-trail"
        style={{
          position: 'absolute',
          width: '40px',
          height: '8px',
          background: 'linear-gradient(90deg, rgba(255,69,0,0.9) 0%, rgba(255,140,0,0.7) 50%, rgba(255,215,0,0.5) 100%)',
          borderRadius: '50px',
          filter: 'blur(2px)',
          transform: 'translateX(-45px) translateY(2px)',
          zIndex: -1,
          animation: 'fireFlicker 0.1s ease-in-out infinite alternate',
        }}
      />
      
      <img 
        src={spaceshipImage} 
        alt="" 
        className="w-12 h-12 opacity-95"
        style={{
          imageRendering: 'pixelated',
          filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.9))',
          position: 'relative',
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default FlyingSpaceship;