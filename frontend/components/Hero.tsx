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
        duration: 0.8,
        ease: "power1.out",
        repeat: 1,
        yoyo: true
      });
    }
  };

  return (
    <>
      <div className={`${styles.heroContainer}`}>      
        <div className={styles.hero}>      
          <div className={styles.textContainer}>
            <AnimatedText animateOnScroll={false} delay={0}>
              <h3 className={styles.direction}>FUTURE</h3>
              <h3 className={styles.direction}>LOGIC</h3>
              <h3 className={styles.direction}>EMOTION</h3>
              <h3 className={styles.direction}>EXPERIENCE</h3>
              <h3 className={styles.direction}>KUDOS</h3>
            </AnimatedText>
          </div>
          <div ref={fleekRef} className={styles.title} >
            <SlideInText onComplete={handleComplete}>FLEEK</SlideInText>
          </div>
          <Header />        
        </div>
    </div>
    {/* <AnimatedBackground /> */}
  </>
  )
}

export default Hero;
