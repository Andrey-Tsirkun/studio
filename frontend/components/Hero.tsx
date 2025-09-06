"use client"

import AnimatedText from './effects/AnimatedText';
import React, { useRef } from 'react';
import gsap from 'gsap';
import Header from './Header/Header';
import styles from '../styles/components/Hero.module.scss';
import LiquidEther from './effects/LiquidEther';
import SplitText from './common/SplitText';

const Hero = () => {
  
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroContainer}>
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
          <SplitText
            text="FLEEK"
            className={styles.title}
            delay={100}
            duration={0.6}
            ease="elastic.out(1, 0.3)"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>
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
