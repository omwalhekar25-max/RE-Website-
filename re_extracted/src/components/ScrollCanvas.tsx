import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 240;

function getFramePath(index: number): string {
  const padded = String(index).padStart(5, '0');
  return `/frames/frame_${padded}.jpg`;
}

interface ScrollCanvasProps {
  opacity?: number;
}

export const ScrollCanvas: React.FC<ScrollCanvasProps> = ({ opacity = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFlagsRef = useRef<boolean[]>(new Array(FRAME_COUNT).fill(false));
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastDrawnIndexRef = useRef(-1);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);

      img.onload = () => {
        loadedFlagsRef.current[i] = true;
        loadedCount++;
        const pct = Math.floor((loadedCount / FRAME_COUNT) * 100);
        setLoadProgress(pct);

        if (loadedCount >= 15 && !isLoaded) {
          setIsLoaded(true);
        }

        if (i === 0 || lastDrawnIndexRef.current === -1) {
          renderFrame();
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= 15 && !isLoaded) {
          setIsLoaded(true);
        }
      };

      imgs.push(img);
    }

    imagesRef.current = imgs;
  }, []);

  // Compute best available frame
  const getBestAvailableFrameIndex = (targetIdx: number): number => {
    const intIdx = Math.round(targetIdx);
    if (loadedFlagsRef.current[intIdx]) return intIdx;

    for (let offset = 1; offset < FRAME_COUNT; offset++) {
      if (intIdx - offset >= 0 && loadedFlagsRef.current[intIdx - offset]) return intIdx - offset;
      if (intIdx + offset < FRAME_COUNT && loadedFlagsRef.current[intIdx + offset]) return intIdx + offset;
    }
    return 0;
  };

  // Render current frame
  const renderFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameToDraw = getBestAvailableFrameIndex(currentFrameRef.current);
    const img = imagesRef.current[frameToDraw];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const bufferWidth = canvas.width;
    const bufferHeight = canvas.height;

    ctx.clearRect(0, 0, bufferWidth, bufferHeight);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Cover scale mode
    const scale = Math.max(bufferWidth / imgWidth, bufferHeight / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;

    const offsetX = (bufferWidth - drawWidth) / 2;
    const offsetY = (bufferHeight - drawHeight) / 2;

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastDrawnIndexRef.current = frameToDraw;
  };

  // Resize canvas
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    renderFrame();
  };

  // Update target frame from window scroll
  const updateTargetFrame = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));

    targetFrameRef.current = scrollFraction * (FRAME_COUNT - 1);
  };

  // Animation Loop
  useEffect(() => {
    handleResize();
    updateTargetFrame();

    let animId: number;

    const loop = () => {
      updateTargetFrame();

      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.85;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      renderFrame();
      animId = requestAnimationFrame(loop);
    };

    loop();

    const observer = new MutationObserver(() => {
      updateTargetFrame();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updateTargetFrame, { passive: true });
    window.addEventListener('wheel', updateTargetFrame, { passive: true });
    window.addEventListener('touchmove', updateTargetFrame, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateTargetFrame);
      window.removeEventListener('wheel', updateTargetFrame);
      window.removeEventListener('touchmove', updateTargetFrame);
    };
  }, []);

  return (
    <>
      {/* Subtle loader bar while buffering */}
      {!isLoaded && (
        <div className="fixed top-0 left-0 w-full z-[9999] pointer-events-none flex flex-col items-center pt-2">
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-100"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Fixed Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0 transition-opacity duration-700"
        style={{ opacity }}
      />
    </>
  );
};
