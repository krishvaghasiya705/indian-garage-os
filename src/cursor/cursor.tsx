// @ts-nocheck
'use client';
import React, { useEffect, useRef } from 'react';

interface Particle {
  rotationSign: number;
  age: number;
  initialLifeSpan: number;
  lifeSpan: number;
  velocity: { x: number; y: number };
  position: { x: number; y: number };
  canv: HTMLCanvasElement;
  update: (context: CanvasRenderingContext2D) => void;
}

export interface CharacterCursorProps {
  characters?: string[];
  colors?: string[];
  cursorOffset?: { x: number; y: number };
  zIndex?: number;
  font?: string;
  characterLifeSpanFunction?: () => number;
  initialCharacterVelocityFunction?: () => { x: number; y: number };
  characterVelocityChangeFunctions?: {
    x_func: (age: number, lifeSpan: number) => number;
    y_func: (age: number, lifeSpan: number) => number;
  };
  characterScalingFunction?: (age: number, lifeSpan: number) => number;
  characterNewRotationDegreesFunction?: (
    age: number,
    lifeSpan: number
  ) => number;
  wrapperElement?: HTMLElement;
}

const MusicCursor: React.FC<CharacterCursorProps> = ({
  characters = ['🎵', '🎶', '📻', '🎧', '🎸', '🎹', '✨', '🎷', '🎺', '♩', '♪', '♫', '♬'],
  colors = ['#fbbf24', '#f59e0b', '#d97706', '#fef08a', '#ffffff', '#facc15', '#fb923c'],
  cursorOffset = { x: 0, y: 0 },
  font = '26px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif',
  characterLifeSpanFunction = () => Math.floor(Math.random() * 50 + 60),
  initialCharacterVelocityFunction = () => ({
    x: (Math.random() - 0.5) * 6,
    y: (Math.random() - 0.5) * 6 - 1.2,
  }),
  characterVelocityChangeFunctions = {
    x_func: () => (Math.random() - 0.5) * 0.08,
    y_func: () => -0.06,
  },
  characterScalingFunction = (age, lifeSpan) =>
    Math.max(((lifeSpan - age) / lifeSpan) * 1.6, 0),
  characterNewRotationDegreesFunction = (age, lifeSpan) => (lifeSpan - age) / 3,
  wrapperElement,
  zIndex = 9999,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const lastSpawnRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const canvImagesRef = useRef<HTMLCanvasElement[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    let canvas: HTMLCanvasElement | null = null;
    let context: CanvasRenderingContext2D | null = null;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const randomPositiveOrNegativeOne = () => (Math.random() < 0.5 ? -1 : 1);

    class ParticleItem implements Particle {
      rotationSign: number;
      age: number;
      initialLifeSpan: number;
      lifeSpan: number;
      velocity: { x: number; y: number };
      position: { x: number; y: number };
      canv: HTMLCanvasElement;

      constructor(x: number, y: number, canvasItem: HTMLCanvasElement) {
        const lifeSpan = characterLifeSpanFunction();
        this.rotationSign = randomPositiveOrNegativeOne();
        this.age = 0;
        this.initialLifeSpan = lifeSpan;
        this.lifeSpan = lifeSpan;
        this.velocity = initialCharacterVelocityFunction();
        this.position = {
          x: x + cursorOffset.x,
          y: y + cursorOffset.y,
        };
        this.canv = canvasItem;
      }

      update(ctx: CanvasRenderingContext2D) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.lifeSpan--;
        this.age++;

        this.velocity.x += characterVelocityChangeFunctions.x_func(
          this.age,
          this.initialLifeSpan
        );
        this.velocity.y += characterVelocityChangeFunctions.y_func(
          this.age,
          this.initialLifeSpan
        );

        const scale = characterScalingFunction(this.age, this.initialLifeSpan);
        const opacity = Math.max(this.lifeSpan / this.initialLifeSpan, 0);

        const degrees =
          this.rotationSign *
          characterNewRotationDegreesFunction(this.age, this.initialLifeSpan);
        const radians = degrees * 0.0174533;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(radians);

        ctx.drawImage(
          this.canv,
          (-this.canv.width / 2) * scale,
          (-this.canv.height / 2) * scale,
          this.canv.width * scale,
          this.canv.height * scale
        );

        ctx.restore();
      }
    }

    const init = () => {
      if (prefersReducedMotion.matches) {
        return false;
      }

      canvas = canvasRef.current;
      if (!canvas) return;

      context = canvas.getContext('2d');
      if (!context) return;

      canvas.style.top = '0px';
      canvas.style.left = '0px';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = zIndex ? zIndex.toString() : '9999';

      if (wrapperElement) {
        canvas.style.position = 'absolute';
        wrapperElement.appendChild(canvas);
        canvas.width = wrapperElement.clientWidth;
        canvas.height = wrapperElement.clientHeight;
      } else {
        canvas.style.position = 'fixed';
        document.body.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;
      }

      canvImagesRef.current = [];

      characters.forEach((char) => {
        let bgCanvas = document.createElement('canvas');
        let bgContext = bgCanvas.getContext('2d');

        if (bgContext) {
          bgContext.font = font;
          bgContext.textBaseline = 'middle';
          bgContext.textAlign = 'center';

          let measurements = bgContext.measureText(char);
          const charWidth = Math.max(measurements.width, 32) + 16;
          const charHeight = 44;

          bgCanvas.width = charWidth;
          bgCanvas.height = charHeight;

          bgContext.font = font;
          bgContext.textBaseline = 'middle';
          bgContext.textAlign = 'center';

          const randomColor = colors[Math.floor(Math.random() * colors.length)];

          bgContext.shadowColor = randomColor;
          bgContext.shadowBlur = 12;
          bgContext.fillStyle = randomColor;

          bgContext.fillText(char, charWidth / 2, charHeight / 2);

          canvImagesRef.current.push(bgCanvas);
        }
      });

      bindEvents();
      loop();
    };

    const bindEvents = () => {
      const element = wrapperElement || window;
      element.addEventListener('mousemove', onMouseMove);
      element.addEventListener('touchmove', onTouchMove, { passive: true });
      element.addEventListener('touchstart', onTouchMove, { passive: true });
      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      if (!canvasRef.current) return;

      if (wrapperElement) {
        canvasRef.current.width = wrapperElement.clientWidth;
        canvasRef.current.height = wrapperElement.clientHeight;
      } else {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    const addParticle = (x: number, y: number, img: HTMLCanvasElement) => {
      particlesRef.current.push(new ParticleItem(x, y, img));
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && canvImagesRef.current.length > 0) {
        for (let i = 0; i < e.touches.length; i++) {
          addParticle(
            e.touches[i].clientX,
            e.touches[i].clientY,
            canvImagesRef.current[
              Math.floor(Math.random() * canvImagesRef.current.length)
            ]
          );
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;

      if (wrapperElement) {
        const boundingRect = wrapperElement.getBoundingClientRect();
        x = e.clientX - boundingRect.left;
        y = e.clientY - boundingRect.top;
      }

      cursorRef.current.x = x;
      cursorRef.current.y = y;

      const dx = x - lastSpawnRef.current.x;
      const dy = y - lastSpawnRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 5 && canvImagesRef.current.length > 0) {
        lastSpawnRef.current = { x, y };
        const randomImg =
          canvImagesRef.current[
            Math.floor(Math.random() * canvImagesRef.current.length)
          ];
        addParticle(x, y, randomImg);
      }
    };

    const updateParticles = () => {
      if (!canvas || !context) return;

      if (particlesRef.current.length === 0) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update(context);
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        if (particlesRef.current[i].lifeSpan <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      if (particlesRef.current.length === 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const loop = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    init();

    return () => {
      if (canvas) {
        canvas.remove();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      const element = wrapperElement || window;
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [
    characters,
    colors,
    cursorOffset,
    font,
    characterLifeSpanFunction,
    initialCharacterVelocityFunction,
    characterVelocityChangeFunctions,
    characterScalingFunction,
    characterNewRotationDegreesFunction,
    wrapperElement,
    zIndex,
  ]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9999]" />;
};

export default MusicCursor;
export { MusicCursor };
