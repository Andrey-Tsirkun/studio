'use client';

import React, { useLayoutEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Copy from './effects/AnimatedText';
import styles from '../styles/components/ScrollRevealDual.module.scss';

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
    <div className={styles.container}>
      <div className={styles.spacer} />

      <div className={styles.fixedContainer}>
        <div className={`light ${styles.light}`}>
          <div className={styles.contentContainer}>
            <h1 className={styles.titleLight}>
              <Copy animateOnScroll={false} delay={1}>
                <span>Exclamation<span className={styles.accent}>!</span> <br /> Art</span>
              </Copy>
            </h1>
            <span className={styles.divider} />
            <h1 className={styles.titleEnd}>
              <Copy animateOnScroll={false} delay={1.5}>
                <span>Studio</span>
              </Copy>
            </h1>
          </div>
        </div>

        <div className={`dark ${styles.dark}`}>
          <div className={styles.contentContainer}>
            <h1 className={styles.titleDark}>
              Exclamation<span className={styles.accent}>!</span> <br /> Art
            </h1>
            <span className={styles.dividerDark} />
            <h1 className={styles.titleEndDark}>
              Studio
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollReveal;
