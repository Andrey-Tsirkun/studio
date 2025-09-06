"use client"

import AnimatedText from './effects/AnimatedText';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Header from './Header/Header';
import styles from '../styles/components/Hero.module.scss';
import LiquidEther from './effects/LiquidEther';

const Hero = () => {
  const directionArray = [
    "FUTURE",
    "LOGIC",
    "EMOTION",
    "EXPERIENCE",
    "KUDOS"
  ];
  
  const directionRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Animate directions
    directionRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref, 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "elastic.out(1, 0.3)",
            delay: index * 0.2
          }
        );
      }
    });

    // Animate title
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
          delay: 1.0
        }
      );
    }
  }, []);
  
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.hero}>
        <div className={styles.textContainer}>
          {directionArray.map((text, index) => (
            <h3 
              key={index} 
              ref={(el) => { directionRefs.current[index] = el; }}
              className={styles.direction}
            >
              {text}
            </h3>
          ))}
        </div>
        <h1 ref={titleRef} className={styles.title}>
          FLEEK
        </h1>
      </div>
      <Header />
      <LiquidEther
        colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={1}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
    </div>
  )
}

export default Hero;
