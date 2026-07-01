'use client';

import { useEffect, useRef } from 'react';

export default function RevolvingGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const resize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    // 3D points on a sphere
    const points: { x: number; y: number; z: number }[] = [];
    const count = 350;
    const radius = Math.min(width, height) * 0.32 || 150;

    // Generate Fibonacci sphere points for uniform distribution
    const phi = Math.PI * (Math.sqrt(5) - 1); // golden angle in radians
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      points.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
      });
    }

    // Generate static marker points on the sphere surface
    const markers: { x: number; y: number; z: number; pulse: number }[] = [];
    const markerCount = 8;
    for (let i = 0; i < markerCount; i++) {
      const theta = (i / markerCount) * Math.PI * 2 + Math.random() * 0.5;
      const phi = Math.acos(2 * ((i + 0.5) / markerCount) - 1);
      
      const x = Math.sin(phi) * Math.cos(theta) * radius;
      const y = Math.sin(phi) * Math.sin(theta) * radius;
      const z = Math.cos(phi) * radius;
      
      markers.push({ x, y, z, pulse: Math.random() });
    }

    let angleY = 0;

    const render = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Center of canvas
      const cx = width / 2;
      const cy = height / 2;

      // Draw subtle background atmosphere glow
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.5, cx, cy, radius * 1.5);
      glow.addColorStop(0, 'rgba(59, 130, 246, 0.05)');
      glow.addColorStop(0.5, 'rgba(99, 102, 241, 0.02)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Rotate points and draw
      angleY += 0.002; // speed of rotation

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Rotate sphere points
      const rotatedPoints = points.map((p) => {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        return { x: x1, y: p.y, z: z1 };
      });

      // Sort points by z-depth so we draw back to front
      rotatedPoints.sort((a, b) => a.z - b.z);

      rotatedPoints.forEach((p) => {
        const distance = radius * 2.5;
        const fov = radius * 2;
        const scale = fov / (distance + p.z);
        const x2d = cx + p.x * scale;
        const y2d = cy + p.y * scale;

        const depth = (p.z + radius) / (2 * radius);
        const opacity = 0.12 + (1 - depth) * 0.65;
        const size = (1.5 + (1 - depth) * 2.5) * (width < 640 ? 0.75 : 1);

        ctx.fillStyle = `rgba(129, 140, 248, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();

        if (depth < 0.25) {
          ctx.fillStyle = `rgba(191, 219, 254, ${opacity * 0.4})`;
          ctx.beginPath();
          ctx.arc(x2d, y2d, size * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Update pulse animation and rotate markers
      const rotatedMarkers = markers.map((m) => {
        m.pulse += 0.015;
        if (m.pulse > 1) m.pulse = 0;

        const x1 = m.x * cosY - m.z * sinY;
        const z1 = m.x * sinY + m.z * cosY;
        return { x: x1, y: m.y, z: z1, pulse: m.pulse };
      });

      // Draw red map pin location markers on top of the sphere
      rotatedMarkers.forEach((p) => {
        const distance = radius * 2.5;
        const fov = radius * 2;
        const scale = fov / (distance + p.z);
        const x2d = cx + p.x * scale;
        const y2d = cy + p.y * scale;

        const depth = (p.z + radius) / (2 * radius);
        
        // Draw only if marker is on the front side (facing camera)
        if (p.z < radius * 0.3) {
          const opacity = (1 - depth) * 0.95;
          const size = 9 * scale * (width < 640 ? 0.75 : 1);

          // Pulsing red base ellipse (beacon base circle)
          const maxBaseWidth = size * 2.4;
          const maxBaseHeight = size * 0.6;
          const baseWidth = size * 0.9 + p.pulse * (maxBaseWidth - size * 0.9);
          const baseHeight = size * 0.22 + p.pulse * (maxBaseHeight - size * 0.22);
          const baseOpacity = opacity * (1 - p.pulse);

          ctx.strokeStyle = `rgba(239, 68, 68, ${baseOpacity})`;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          if (ctx.ellipse) {
            ctx.ellipse(x2d, y2d + size * 0.05, baseWidth, baseHeight, 0, 0, Math.PI * 2);
          } else {
            ctx.arc(x2d, y2d + size * 0.05, baseWidth, 0, Math.PI * 2);
          }
          ctx.stroke();

          // Static red base ellipse shadow
          ctx.strokeStyle = `rgba(239, 68, 68, ${opacity * 0.45})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          if (ctx.ellipse) {
            ctx.ellipse(x2d, y2d + size * 0.05, size * 0.9, size * 0.22, 0, 0, Math.PI * 2);
          }
          ctx.stroke();

          // Map Pin shape: balloon circle pointing down to tip at (x2d, y2d)
          const r = size * 0.75;
          const cy_val = y2d - r * 1.35;

          ctx.fillStyle = `rgba(239, 68, 68, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(x2d, y2d);
          ctx.bezierCurveTo(x2d - r * 0.85, y2d - r * 0.6, x2d - r, cy_val - r * 0.2, x2d - r, cy_val);
          ctx.arc(x2d, cy_val, r, Math.PI, 0, false);
          ctx.bezierCurveTo(x2d + r, cy_val - r * 0.2, x2d + r * 0.85, y2d - r * 0.6, x2d, y2d);
          ctx.closePath();
          ctx.fill();

          // Inner white hole / core
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x2d, cy_val, r * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw subtle grid ring
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50 sm:opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
