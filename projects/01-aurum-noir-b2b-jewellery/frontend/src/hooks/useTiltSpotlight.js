import { useState, useRef, useCallback } from 'react';

/**
 * useTiltSpotlight
 * Custom lightweight physics hook for 3D perspective tilt and mouse-following spotlight illumination.
 * Zero bundle dependencies, hardware-accelerated via CSS transforms.
 * 
 * @param {Object} options
 * @param {number} options.maxTilt - Maximum tilt in degrees (default 4.5)
 * @param {number} options.scale - Scale elevation on hover (default 1.015)
 * @param {string} options.spotlightColor - Color of the spotlight radial gradient (default soft bronze)
 */
export function useTiltSpotlight({
  maxTilt = 4.5,
  scale = 1.015,
  spotlightColor = 'rgba(158, 127, 76, 0.09)'
} = {}) {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
  });
  const [spotlight, setSpotlight] = useState({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const nx = (x / rect.width) - 0.5;
    const ny = (y / rect.height) - 0.5;

    const rotateY = (nx * maxTilt * 2).toFixed(2);
    const rotateX = (-ny * maxTilt * 2).toFixed(2);

    const percentX = ((x / rect.width) * 100).toFixed(1);
    const percentY = ((y / rect.height) * 100).toFixed(1);

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s ease-out',
    });

    setSpotlight({
      x: percentX,
      y: percentY,
      opacity: 1,
    });
  }, [maxTilt, scale]);

  const onMouseEnter = useCallback(() => {
    setSpotlight((prev) => ({ ...prev, opacity: 1 }));
  }, []);

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
    });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  const spotlightStyle = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderRadius: 'inherit',
    background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, ${spotlightColor} 0%, transparent 65%)`,
    opacity: spotlight.opacity,
    transition: 'opacity 0.3s ease',
    zIndex: 1,
  };

  return {
    ref,
    style,
    spotlightStyle,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
  };
}
