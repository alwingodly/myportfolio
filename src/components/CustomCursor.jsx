import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if ('ontouchstart' in window) return;

    document.body.classList.add('custom-cursor');

    let animationFrameId;

    // Smooth dual-layer animation
    const animateCursor = () => {
      // Cursor follows quickly
      const dx1 = mousePos.current.x - cursorPos.current.x;
      const dy1 = mousePos.current.y - cursorPos.current.y;
      cursorPos.current.x += dx1 * 0.2;
      cursorPos.current.y += dy1 * 0.2;

      // Follower follows slowly
      const dx2 = mousePos.current.x - followerPos.current.x;
      const dy2 = mousePos.current.y - followerPos.current.y;
      followerPos.current.x += dx2 * 0.1;
      followerPos.current.y += dy2 * 0.1;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }

      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x}px, ${followerPos.current.y}px)`;
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Create elegant particle
    const createParticle = (x, y) => {
      const particle = document.createElement('div');
      particle.className = 'cursor-particle';
      
      const size = 3 + Math.random() * 4;
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 40;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
      particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    };

    // Create ripple effect
    const createRipple = (x, y) => {
      const ripple = document.createElement('div');
      ripple.className = 'cursor-ripple';
      ripple.style.left = `${x - 25}px`;
      ripple.style.top = `${y - 25}px`;
      
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 800);
    };

    // Create sparkle trail
    const createSparkle = (x, y) => {
      if (Math.random() > 0.8) {
        const sparkle = document.createElement('div');
        sparkle.className = 'cursor-sparkle';
        sparkle.textContent = '✨';
        sparkle.style.left = `${x - 10}px`;
        sparkle.style.top = `${y - 10}px`;
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
      }
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      createSparkle(e.clientX, e.clientY);
    };

    // Hover effects
    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.classList.add('hover');
      if (followerRef.current) followerRef.current.classList.add('hover');
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('hover');
      if (followerRef.current) followerRef.current.classList.remove('hover');
    };

    // Click effect
    const handleClick = (e) => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('click');
        setTimeout(() => cursorRef.current?.classList.remove('click'), 300);
      }

      // Create particles in a circle
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          createParticle(e.clientX, e.clientY);
        }, i * 30);
      }

      // Create ripple
      createRipple(e.clientX, e.clientY);
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      document.body.classList.remove('custom-cursor');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="standard-cursor">
        <div className="cursor-dot"></div>
      </div>
      <div ref={followerRef} className="cursor-follower"></div>
    </>
  );
};

export default CustomCursor;