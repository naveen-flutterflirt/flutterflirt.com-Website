"use client";

import React, { useEffect, useState } from "react";

type Props = {
  images: string[];
  intervalMs?: number;
  transitionMs?: number;
  className?: string;
  imageScale?: number;
};

export default function ImageRotator({
  images,
  intervalMs = 1000,
  transitionMs = 350,
  className = "",
  imageScale = 1.85,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload all images into browser cache
  useEffect(() => {
    if (!images || images.length === 0) return;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  // Set up cyclic rotation interval with immediate response
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images, intervalMs]);

  if (!images || images.length === 0) return null;

  return (
    <div
      className={`relative w-full h-full select-none ${className}`}
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {images.map((src, i) => {
        const isActive = i === currentIndex;

        return (
          <img
            key={src + i}
            src={src}
            alt={`FlutterFlirt growth stage ${i + 1}`}
            className="absolute inset-0 h-full w-full object-contain pointer-events-none"
            style={{
              transition: `opacity ${transitionMs}ms ease-in-out`,
              transitionDelay: "0ms",
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 2 : 1,
              transform: `scale(${imageScale})`,
              transformOrigin: "50% 92%",
              willChange: "opacity, transform",
            }}
            loading="eager"
            draggable={false}
          />
        );
      })}
    </div>
  );
}


