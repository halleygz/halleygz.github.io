"use client";

import { drawLinesBtwnParticles } from "@/utils/animation/drawLines";
import { Circle } from "@/utils/animation/particles";
import { useEffect, useRef } from "react";

function ParticlesAnim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse state
  const mouseRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  // Constants for tuning
  const REPULSION_RADIUS = 150;
  // const REPULSION_STRENGTH = 10;
  // const MAX_LINE_DISTANCE = 220;
  const NUM_PARTICLES = 15;

  // Particles storage ref
  const particlesRef = useRef<Circle[]>([]);

  // Handle mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Main animation effect
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize function
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const circles: Circle[] = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      circles.push(
        new Circle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 1 + 2,
          "#5b5b5c",
          (Math.random() - 0.5) * 5.5,
          (Math.random() - 0.5) * 5.5
        )
      );
    }
    particlesRef.current = circles;

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((circle) => {
        circle.update(
          canvas.width,
          canvas.height,
          mouseRef.current.x,
          mouseRef.current.y,
          REPULSION_RADIUS
        );
        circle.draw(ctx);
      });

      drawLinesBtwnParticles(ctx, particlesRef.current, canvas.width, canvas.height);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);  // Make sure animate uses latest mouse

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none top-0 left-0 z-[-10] overflow-hidden max-w-full max-h-full"
    />
  );
}

export default ParticlesAnim;
