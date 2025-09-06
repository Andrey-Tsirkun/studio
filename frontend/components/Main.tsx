"use client"

import React, { useRef } from 'react'
import styles from '../styles/components/Main.module.scss';
import ScrollReveal from './effects/ScrollReveal';

const Main = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.main}>
      <ScrollReveal
        containerClassName={styles.scrollReveal}
        baseOpacity={0}
        enableBlur={true}
        baseRotation={5}
        blurStrength={10}
      >
        When does a man die? When he is hit by a bullet? No! When he suffers a disease?
        No! When he ate a soup made out of a poisonous mushroom?
        No! A man dies when he is forgotten!
      </ScrollReveal>
    </div>
  )
}

export default Main;