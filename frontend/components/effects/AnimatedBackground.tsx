import React, { useEffect } from 'react';

// Type declaration for FinisherHeader
declare global {
  interface Window {
    FinisherHeader: new (config: {
      count: number;
      size: { min: number; max: number; pulse: number };
      speed: { x: { min: number; max: number }; y: { min: number; max: number } };
      colors: { background: string; particles: string[] };
      blending: string;
      opacity: { center: number; edge: number };
      skew: number;
      shapes: string[];
    }) => void;
  }
}

const AnimatedBackground = () => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "/js/finisher-header.es5.min.js"
    script.async = true
    script.onload = () => {
      new window.FinisherHeader({
        "count": 7,
        "size": {
          "min": 1300,
          "max": 1500,
          "pulse": 0.2
        },
        "speed": {
          "x": {
            "min": 0.6,
            "max": 1.5
          },
          "y": {
            "min": 0.6,
            "max": 1.5
          }
        },
        "colors": {
          "background": "#000000",
          "particles": [
            "#424141",
            "#484646",
            "#ffffff"
          ]
        },
        "blending": "overlay",
        "opacity": {
          "center": 0.1,
          "edge": 0
        },
        "skew": 0,
        "shapes": [
          "c"
        ]
      })
    }
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="finisher-header absolute inset-0 w-full h-full z-1" />
  );
};

export default AnimatedBackground;