import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const isHoveringRef = useRef(false);
  const isMovingRef = useRef(false);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const idleOffset = useRef(0);
  const rafId = useRef<number | null>(null);
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Elements and motion refs
  const mainRef = useRef<HTMLDivElement | null>(null);
  const blurRef = useRef<HTMLDivElement | null>(null);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const angleRef = useRef(0);
  const stretchRef = useRef(0);
  const hoverScaleRef = useRef(1);

  // Detect coarse (touch) pointers and disable custom cursor
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(pointer: coarse)');
    setIsCoarsePointer(mql.matches || ('ontouchstart' in window));
    const onChange = (e: MediaQueryListEvent) => setIsCoarsePointer(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (isCoarsePointer) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      if (!isMovingRef.current) {
        isMovingRef.current = true;
        setIsMoving(true);
      }

      // Reset idle timeout to switch back to idle state after no movement
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
      moveTimeoutRef.current = setTimeout(() => {
        isMovingRef.current = false;
        setIsMoving(false);
      }, 150);

      // Start RAF loop if not already running
      if (rafId.current == null) {
        const animate = () => {
          // Smoothly follow the mouse (GPU-accelerated via translate3d)
          cursorX.current += (mouseX.current - cursorX.current) * 0.2;
          cursorY.current += (mouseY.current - cursorY.current) * 0.2;

          // Compute velocity based on cursor movement (smoothed)
          const dx = cursorX.current - lastX.current;
          const dy = cursorY.current - lastY.current;
          lastX.current = cursorX.current;
          lastY.current = cursorY.current;

          const speed = Math.hypot(dx, dy);
          const targetStretch = Math.min(speed / 12, 0.6); // 0 -> 0.6
          // Ease stretch and angle for smooth morphing
          stretchRef.current += (targetStretch - stretchRef.current) * 0.15;

          const targetAngle = Math.atan2(dy, dx) || angleRef.current;
          // Interpolate angles properly
          let da = targetAngle - angleRef.current;
          while (da > Math.PI) da -= 2 * Math.PI;
          while (da < -Math.PI) da += 2 * Math.PI;
          angleRef.current += da * 0.2;

          // Subtle idle float when not moving
          if (!isMovingRef.current) {
            idleOffset.current += 0.02;
            // Ease back to circle when idle
            stretchRef.current += (0 - stretchRef.current) * 0.1;
          }
          const floatY = isMovingRef.current ? 0 : Math.sin(idleOffset.current) * 2;

          const targetHoverScale = isHoveringRef.current ? 2.2 : isMovingRef.current ? 1.1 : 1;
          hoverScaleRef.current += (targetHoverScale - hoverScaleRef.current) * 0.15;

          // Apply translation to container
          if (cursorRef.current) {
            const x = cursorX.current - 10;
            const y = cursorY.current - 10 + floatY;
            cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          }

          // Apply rotation + non-uniform scale to the inner cursor based on direction
          const stretch = stretchRef.current;
          const angle = angleRef.current;
          const sx = (1 + stretch) * hoverScaleRef.current;
          const sy = (1 - stretch * 0.4) * hoverScaleRef.current;

          if (mainRef.current) {
            mainRef.current.style.transform = `rotate(${angle}rad) scale(${sx}, ${sy})`;
          }
          if (blurRef.current) {
            const bsx = (1 + stretch * 0.6) * hoverScaleRef.current * 1.5;
            const bsy = (1 - stretch * 0.24) * hoverScaleRef.current * 1.5;
            blurRef.current.style.transform = `rotate(${angle}rad) scale(${bsx}, ${bsy})`;
          }

          rafId.current = requestAnimationFrame(animate);
        };

        rafId.current = requestAnimationFrame(animate);
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Hover detection for interactive elements
    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      setIsHovering(true);
    };
    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      setIsHovering(false);
    };

    const interactiveElements = document.querySelectorAll('a, button:not([data-no-cursor]), [role="button"]:not([data-no-cursor])');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
      if (rafId.current != null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      document.removeEventListener('mousemove', handleMouseMove as any);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isCoarsePointer]);

  // Sync state to refs for animation loop
  useEffect(() => {
    isHoveringRef.current = isHovering;
  }, [isHovering]);

  useEffect(() => {
    isMovingRef.current = isMoving;
  }, [isMoving]);

  // Position and scale are handled via requestAnimationFrame

  if (isCoarsePointer) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999]"
      style={{
        willChange: 'transform',
        transform: 'translate3d(-50vw, -50vh, 0)',
      }}
    >
      {/* Main cursor */}
      <div 
        ref={mainRef}
        className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent opacity-80"
        style={{
          boxShadow: `
            0 0 20px hsl(var(--primary) / 0.6),
            0 0 40px hsl(var(--accent) / 0.4),
            0 4px 15px rgba(0, 0, 0, 0.3)
          `,
          filter: isMoving ? 'blur(0px)' : 'blur(0.5px)',
        }}
      />
      
      {/* Trailing shadow/blur effect */}
      <div 
        ref={blurRef}
        className="absolute inset-0 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent opacity-30"
        style={{
          filter: 'blur(8px)',
          zIndex: -1,
        }}
      />
      
      {/* Secondary glow when hovering */}
      {isHovering && (
        <div 
          className="absolute inset-0 w-5 h-5 rounded-full bg-gradient-to-br from-accent to-primary opacity-40 animate-pulse"
          style={{
            transform: 'scale(3)',
            filter: 'blur(15px)',
            zIndex: -2,
          }}
        />
      )}
    </div>
  );
};

export default CustomCursor;