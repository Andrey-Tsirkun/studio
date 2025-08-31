"use client"

import { dmSans } from '@/utils/typography';
import AnimatedText from './effects/AnimatedText';
import React, { useRef } from 'react';
import SlideInText from './effects/SlideInText';
import gsap from 'gsap';
import Header from './Header/Header';

const Hero = () => {
  const fleekRef = useRef<HTMLDivElement>(null);

  const handleComplete = () => {
    if (fleekRef.current) {
      // Scale up animation for the FLEEK text
      gsap.to(fleekRef.current, {
        scale: 1.1,
        duration: 0.8,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    }
  };

  return (
    <>
      <Header />
    <div className="relative flex p-16 w-screen h-screen bg-gray-900 text-yellow-500">
      <div className={`relative text-2xl ${dmSans.className}`}>
        <AnimatedText animateOnScroll={false} delay={0}>
          <h3>FUTURE</h3>
          <h3>LOGIC</h3>
          <h3>EMOTION</h3>
          <h3>EXPERIENCE</h3>
          <h3>KEY</h3>
        </AnimatedText>
      </div>
      <div>
        <div ref={fleekRef} className={`text-9xl font-semibold ${dmSans.className}`} >
          <SlideInText onComplete={handleComplete}>FLEEK</SlideInText>
        </div>
        </div>
      </div>
    </>
  )
}

export default Hero;
