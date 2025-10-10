"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";
import type React from "react";
import { useCallback, useRef, useState } from "react";

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  zoomLevel?: number;
  magnifierSize?: number;
}

export function ImageZoom({ src, alt, className, zoomLevel = 2.5, magnifierSize = 200 }: ImageZoomProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isZooming, setIsZooming] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoaded(false);
    setImageError(true);
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      if (!imageRef.current || !imageLoaded) return;

      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      // Store mouse position for lens overlay and zoom calculation
      setMousePosition({ x, y });
    },
    [imageLoaded]
  );

  const handleMouseEnter = () => {
    if (imageLoaded) {
      setIsZooming(true);
    }
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  // Calculate zoom position for the magnified image
  const getZoomStyle = () => {
    if (!imageRef.current || !isZooming) return {};

    const { width, height } = imageRef.current.getBoundingClientRect();
    const xPercent = (mousePosition.x / width) * 100;
    const yPercent = (mousePosition.y / height) * 100;

    return {
      backgroundImage: `url(${src})`,
      backgroundSize: `${width * zoomLevel}px ${height * zoomLevel}px`,
      backgroundPosition: `${xPercent}% ${yPercent}%`,
      backgroundRepeat: "no-repeat"
    };
  };

  return (
    <div className={cn("relative size-full", className)}>
      <Card className="gap-0 overflow-hidden py-0">
        <CardContent className="bg-muted flex aspect-square items-center justify-center p-8">
          <div className="relative inline-block w-full overflow-visible">
            <img
              ref={imageRef}
              src={src || "/placeholder.svg"}
              alt={alt}
              className={cn(
                "h-auto max-h-[640px] w-full max-w-full",
                imageLoaded && !imageError && !isMobile ? "cursor-crosshair" : "cursor-default"
              )}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />

            {isZooming && imageLoaded && !imageError && !isMobile && (
              <div
                className="border-border pointer-events-none absolute rounded-full border-2 bg-black/25 shadow-lg"
                style={{
                  left: mousePosition.x - magnifierSize / 6,
                  top: mousePosition.y - magnifierSize / 6,
                  width: magnifierSize / 3,
                  height: magnifierSize / 3,
                  transform: "translate(0, 0)",
                  transition: "opacity 0.2s ease-out"
                }}
              />
            )}
          </div>
        </CardContent>
      </Card>
      <div className="absolute top-0 -right-[calc(50%+2rem)] z-20 size-full translate-x-1/2 rounded-lg">
        {isZooming && imageLoaded && !imageError && !isMobile ? (
          <div
            className="size-full overflow-hidden rounded-lg border-2 border-blue-600 bg-white"
            style={{
              ...getZoomStyle()
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
