'use client';

import { useEffect, useRef } from 'react';

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles: Particle[] = [];

  let w = 0;
  let h = 0;
  const particleDistance = 40;

  const mouse = {
    x: undefined as number | undefined,
    y: undefined as number | undefined,
    radius: 100,
  };

  class Particle {
    x: number;
    y: number;
    size: number;
    baseX: number;
    baseY: number;
    speed: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = 4;
      this.baseX = x;
      this.baseY = y;
      this.speed = Math.random() * 25 + 5;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = 'rgba(255,255,255,1)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update(ctx: CanvasRenderingContext2D) {
      const dx = (mouse.x ?? 0) - this.x;
      const dy = (mouse.y ?? 0) - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = mouse.radius;
      const force = (maxDistance - distance) / maxDistance;
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const directionX = forceDirectionX * force * this.speed;
      const directionY = forceDirectionY * force * this.speed;

      if (distance < mouse.radius) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          this.x -= (this.x - this.baseX) / 10;
        }
        if (this.y !== this.baseY) {
          this.y -= (this.y - this.baseY) / 10;
        }
      }

      this.draw(ctx);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeReset = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particles.length = 0;

      for (
        let y = (((h - particleDistance) % particleDistance) + particleDistance) / 2;
        y < h;
        y += particleDistance
      ) {
        for (
          let x = (((w - particleDistance) % particleDistance) + particleDistance) / 2;
          x < w;
          x += particleDistance
        ) {
          particles.push(new Particle(x, y));
        }
      }
    };

    const drawLine = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < particleDistance * 1.5) {
            const opacity = 1 - distance / (particleDistance * 1.5);
            ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animationLoop = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => p.update(ctx));
      drawLine();
      requestAnimationFrame(animationLoop);
    };

    const mouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const mouseOut = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };

    resizeReset();
    animationLoop();
    window.addEventListener('resize', resizeReset);
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseout', mouseOut);

    return () => {
      window.removeEventListener('resize', resizeReset);
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseout', mouseOut);
    };
  }, []);

  return (
    <>
      <canvas
        id="canvas"
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          backgroundImage: 'radial-gradient(#ff3cac 0%, #784ba0 40%, #2b86c5 100%)',
        }}
      />
    </>
  );
};

export default ParticleCanvas;
