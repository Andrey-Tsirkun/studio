"use client"

import { dmSans } from '@/utils/typography';
import AnimatedText from './effects/AnimatedText';
import React from 'react';
import SlideInText from './effects/SlideInText';

const Hero = () => {
  return (
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
        <div className={`text-9xl font-semibold ${dmSans.className}`} >
          <SlideInText>FLEEK</SlideInText>
        </div>
      </div>
    </div>
  )
}

export default Hero;
