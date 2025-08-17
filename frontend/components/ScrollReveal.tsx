'use client';

import React, { useLayoutEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Copy from './Copy';

const ScrollReveal = () => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      '.dark',
      {
        clipPath: 'inset(0% 100% 0% 0%)',
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: '.dark',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });

  return (
    <div className="relative">
      <div className="h-[200vh]" />

      <div className="fixed inset-0">
        <div className="light absolute inset-0 flex items-center justify-center gap-16 bg-[#f2f2f2]">
          <div className="flex gap-3 items-center">
            <h1 className="text-6xl font-bold text-gray-900">
              <Copy animateOnScroll={false} delay={1}>
                <span>Exclamation<span className="text-yellow-500">!</span> <br /> Art</span>
              </Copy>
            </h1>
            <span className="w-3 h-56 bg-gray-900" />
            <h1 className="text-6xl self-end font-bold text-gray-900">
              <Copy animateOnScroll={false} delay={1.5}>
                <span>Studio</span>
              </Copy>
            </h1>
          </div>
        </div>

        <div className="dark absolute inset-0 flex items-center justify-center gap-16 bg-gray-900" style={{ clipPath: 'inset(0% 100% 0% 0%)' }}>
          <div className="flex gap-3 items-center">
            <h1 className="text-6xl font-bold text-[#f2f2f2]">
              Exclamation<span className="text-yellow-500">!</span> <br /> Art
            </h1>
            <span className="w-3 h-56 bg-[#f2f2f2]" />
            <h1 className="text-6xl self-end font-bold text-[#f2f2f2]">
              Studio
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollReveal;
