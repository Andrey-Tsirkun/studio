"use client"

import AnimatedText from './effects/AnimatedText';
import React, { useRef } from 'react';
import SlideInText from './effects/SlideInText';
import gsap from 'gsap';
import Header from './Header/Header';
import AnimatedBackground from './effects/AnimatedBackground';
import styles from '../styles/components/Hero.module.scss';

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
    <div className={`${styles.heroContainer}`}>      
      <Header />
      <div className={styles.hero}>
        <div className={styles.textContainer}>
          <AnimatedText animateOnScroll={false} delay={0}>
            <h3>FUTURE</h3>
            <h3>LOGIC</h3>
            <h3>EMOTION</h3>
            <h3>EXPERIENCE</h3>
            <h3>KUDOS</h3>
          </AnimatedText>
        </div>
        <div ref={fleekRef} className={styles.title} >
          <SlideInText onComplete={handleComplete}>FLEEK</SlideInText>
        </div>
        {/* <AnimatedBackground /> */}
      </div>
  </div>
  )
}

export default Hero;
