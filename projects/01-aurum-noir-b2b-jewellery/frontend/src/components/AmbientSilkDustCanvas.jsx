import React, { useEffect, useRef } from 'react';

/**
 * AmbientSilkDustCanvas
 * Subtle, luxury alternative to high-tech webcam/pixel grids.
 * Renders 30-35 soft, desaturated golden dust motes floating gently in atmospheric space,
 * with subtle velocity deflection when the cursor moves nearby.
 */
export const AmbientSilkDustCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Generate 32 particles
    const particleCount = 32;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.8,
        baseAlpha: Math.random() * 0.25 + 0.1,
        alpha: Math.random() * 0.25 + 0.1,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.25 - 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseAngle: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic floating motion
        p.x += p.vx;
        p.y += p.vy;

        // Subtle breathing pulse
        p.pulseAngle += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.08;

        // Mouse avoidance / deflection
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 1.2;
        }

        // Boundary wrapping
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle (warm muted bronze dust)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(158, 127, 76, ${Math.max(0, p.alpha)})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(158, 127, 76, 0.3)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};
