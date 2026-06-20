"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function LexonTransformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollFraction, setScrollFraction] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // Preload 121 frames
    const frameCount = 121;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/frames/lexon/frame_${String(i).padStart(4, '0')}.webp`;
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    if (loadedImages[0]) {
      loadedImages[0].onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          canvas.width = loadedImages[0].naturalWidth;
          canvas.height = loadedImages[0].naturalHeight;
          ctx?.drawImage(loadedImages[0], 0, 0);
        }
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !canvasRef.current) return;
      
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate fraction
      const fraction = (window.scrollY - containerTop) / (containerHeight - windowHeight);
      const clampedFraction = Math.min(1, Math.max(0, fraction));
      setScrollFraction(clampedFraction);

      const frameIndex = Math.min(149, Math.max(0, Math.floor(clampedFraction * 150)));

      requestAnimationFrame(() => {
        const img = imagesRef.current[frameIndex];
        const canvas = canvasRef.current;
        
        // img.complete is true even if the image is broken (404). 
        // We must check img.naturalWidth > 0 to ensure it actually loaded successfully.
        if (img && canvas && img.complete && img.naturalWidth > 0) {
          const ctx = canvas.getContext('2d');
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Overlay Opacity Logic (Fades in past 40%)
  let textOpacity = 0;
  if (scrollFraction > 0.4) {
    textOpacity = Math.min(1, (scrollFraction - 0.4) / 0.1); // Full opacity by 50%
  }

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-obsidian w-full border-t border-blueprint-dark">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover absolute inset-0 z-0 opacity-70"
        />

        <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian opacity-80 z-0 pointer-events-none"></div>

        {/* The Mission Overlay */}
        <div 
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-8 md:px-24 z-10 pointer-events-none"
          style={{ opacity: textOpacity }}
        >
          <div className="bg-black/40 backdrop-blur-xl border border-blueprint p-8 md:p-16 max-w-4xl shadow-brutal transition-all duration-700">
             <div className="w-12 h-1 bg-sovereign mx-auto mb-8"></div>
             <p className="text-base sm:text-xl md:text-3xl font-serif text-white tracking-wide leading-relaxed">
               "I engineer the bridge between untapped potential and absolute performance. Operating from Abuja, Nigeria, I execute a global mandate: to break the limitations of ignorance through deep technical architecture and economic engineering. I do not just write code; I restore fragmented systems, deliver measurable financial results, and build capacity for high-yield enterprises."
             </p>
          </div>
        </div>
        
      </div>
    </section>
  );
}
