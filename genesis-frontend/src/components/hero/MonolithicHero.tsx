"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function MonolithicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Keep track of scroll fraction for overlay states
  const [scrollFraction, setScrollFraction] = useState(0);

  // Preload images once
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const frameCount = 150;
    // Initialize array with empty slots
    const loadedImages: HTMLImageElement[] = new Array(frameCount);

    // 1. Load the very first frame immediately for fast initial paint
    const firstImg = new Image();
    firstImg.src = `/frames/hero/frame_0001.webp`;
    loadedImages[0] = firstImg;
    imagesRef.current = loadedImages;

    firstImg.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = firstImg.naturalWidth;
        canvas.height = firstImg.naturalHeight;
        ctx?.drawImage(firstImg, 0, 0);
      }

      // 2. Defer preloading the remaining frames to avoid blocking network/main thread
      let currentFrame = 2;
      const preloadNextChunk = () => {
        // Load in chunks of 10 to balance performance and smoothness
        const chunkLimit = Math.min(currentFrame + 10, frameCount + 1);
        for (let i = currentFrame; i < chunkLimit; i++) {
          const img = new Image();
          img.src = `/frames/hero/frame_${String(i).padStart(4, '0')}.webp`;
          loadedImages[i - 1] = img;
        }
        currentFrame = chunkLimit;
        
        // If there are more frames, schedule the next chunk
        if (currentFrame <= frameCount) {
          setTimeout(preloadNextChunk, 50); 
        }
      };

      // Kick off background loading after initial frame is painted
      if ('requestIdleCallback' in window) {
        // @ts-ignore - TS might not recognize requestIdleCallback in all envs
        window.requestIdleCallback(preloadNextChunk);
      } else {
        setTimeout(preloadNextChunk, 100);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !canvasRef.current) return;
      
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate fraction
      // Math: (window.scrollY - containerTop) / (containerHeight - windowHeight)
      const fraction = (window.scrollY - containerTop) / (containerHeight - windowHeight);
      
      // Clamp between 0 and 1
      const clampedFraction = Math.min(1, Math.max(0, fraction));
      setScrollFraction(clampedFraction);

      // Frame Index
      const frameIndex = Math.min(149, Math.max(0, Math.floor(clampedFraction * 150)));

      // Request animation frame for high-performance canvas painting
      requestAnimationFrame(() => {
        const img = imagesRef.current[frameIndex];
        const canvas = canvasRef.current;
        
        // img.complete is true even if the image is broken (404). 
        // We must check img.naturalWidth > 0 to ensure it actually loaded successfully.
        if (img && canvas && img.complete && img.naturalWidth > 0) {
          const ctx = canvas.getContext('2d');
          
          // Let CSS object-cover handle the responsive cropping
          if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
          }

          if (ctx) {
             ctx.drawImage(img, 0, 0);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Overlay Opacity Logic
  // Overlay 1: 10% to 40% (0.1 to 0.4)
  let overlay1Opacity = 0;
  if (scrollFraction >= 0.1 && scrollFraction <= 0.4) {
    // Fade in from 0.1 to 0.15, full opaque until 0.35, fade out until 0.4
    if (scrollFraction < 0.15) {
      overlay1Opacity = (scrollFraction - 0.1) / 0.05;
    } else if (scrollFraction > 0.35) {
      overlay1Opacity = (0.4 - scrollFraction) / 0.05;
    } else {
      overlay1Opacity = 1;
    }
  }

  // Overlay 2: 60% to 90% (0.6 to 0.9)
  let overlay2Opacity = 0;
  if (scrollFraction >= 0.6 && scrollFraction <= 0.9) {
    if (scrollFraction < 0.65) {
      overlay2Opacity = (scrollFraction - 0.6) / 0.05;
    } else if (scrollFraction > 0.85) {
      overlay2Opacity = (0.9 - scrollFraction) / 0.05;
    } else {
      overlay2Opacity = 1;
    }
  }

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-obsidian w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        
        {/* Canvas Engine */}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover absolute inset-0 z-0 opacity-70"
        />

        {/* Executive Overlay 1 */}
        <div 
          className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-24 z-10 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: overlay1Opacity }}
        >
          <div className="w-12 md:w-16 h-1 bg-white mb-4 md:mb-6"></div>
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-sans font-bold text-white tracking-tighter uppercase max-w-3xl leading-none">
            Technology.<br/>
            Education.<br/>
            Leadership.
          </h2>
          {/* Add a btn call to action to see portfolio  */}
          
          <button 
            onClick={() => window.location.href = "/portfolio"}
            className="bg-sovereign text-white px-6 py-3 md:px-8 md:py-4 mt-6 rounded font-mono text-xs md:text-sm uppercase tracking-widest border border-white hover:bg-white hover:text-black transition-colors pointer-events-auto"
          >
            View Proofs Of Work
          </button>
        </div>

        {/* Executive Overlay 2 */}
        <div 
          className="absolute inset-0 flex flex-col justify-center items-end px-6 md:px-24 text-right z-10 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: overlay2Opacity }}
        >
           <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif text-sovereign tracking-tight uppercase max-w-4xl leading-none drop-shadow-sovereign">
            John J.<br/>Lawal.
          </h2>
          <div className="w-16 md:w-24 h-1 bg-sovereign mt-4 md:mt-6"></div>
          {/* Add a btn call to action to see about me  */}
          
          <button 
            onClick={() => window.location.href = "/about"}
            className="bg-sovereign text-white px-6 py-3 md:px-8 md:py-4 mt-6 rounded font-mono text-xs md:text-sm uppercase tracking-widest border border-white hover:bg-white hover:text-black transition-colors pointer-events-auto"
          >
            Learn About Me
          </button>
        </div>
        
      </div>
    </section>
  );
}
