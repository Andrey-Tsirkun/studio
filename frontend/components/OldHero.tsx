"use client"

import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { SplitText } from "gsap/SplitText"
import { dmSans } from "../utils/typography"
import styles from '../styles/components/OldHero.module.scss';

const OldHero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const preloaderRef = useRef<HTMLDivElement>(null)
  const splitOverlayRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!titleRef.current || !preloaderRef.current || !splitOverlayRef.current || !containerRef.current) return

    gsap.registerPlugin(CustomEase, SplitText)
    CustomEase.create("hop", ".8, 0, .3, 1")

    // Split text for preloader title
    const splitText = new SplitText(titleRef.current, {
      type: "words,chars",
      wordsClass: "word",
      charsClass: "char relative inline-block overflow-hidden",
    })

    splitText.chars.forEach((char, index) => {
      const span = document.createElement("span")
      span.className = "relative inline-block will-change-transform"
      span.style.transform = "translateY(-100%)"
      span.textContent = char.textContent || ""
      char.innerHTML = ""
      char.appendChild(span)
      if (index === 1) char.classList.add("x-char")
      if (char.textContent === "!") char.classList.add("exclamation-char")
    })

    // Split text for split-overlay elements
    const splitOverlayTitle = splitOverlayRef.current.querySelector('.split-intro-title h1')
    const splitOverlayOutro = splitOverlayRef.current.querySelector('.split-outro-title h1')
    
    if (splitOverlayTitle) {
      const splitOverlayText = new SplitText(splitOverlayTitle, {
        type: "words,chars",
        wordsClass: "word",
        charsClass: "char",
      })
      
      splitOverlayText.chars.forEach((char, index) => {
        const span = document.createElement("span")
        span.textContent = char.textContent || ""
        char.innerHTML = ""
        char.appendChild(span)
        if (index === 0) char.classList.add("first-char")
      })
    }

    if (splitOverlayOutro) {
      const splitOverlayOutroText = new SplitText(splitOverlayOutro, {
        type: "words,chars",
        wordsClass: "word", 
        charsClass: "char",
      })
      
      splitOverlayOutroText.chars.forEach((char) => {
        const span = document.createElement("span")
        span.textContent = char.textContent || ""
        char.innerHTML = ""
        char.appendChild(span)
      })
    }

    gsap.set(titleRef.current, { visibility: "visible" })

    // Initial setup for split-overlay elements (same as original)
    const isMobile = window.innerWidth <= 1000

    gsap.set([
      ".split-intro-title .first-char span",
      ".split-outro-title .char span",
    ], { y: "0%" })

    gsap.set(".split-intro-title .first-char", {
      x: isMobile ? "7.5rem" : "18rem",
      y: isMobile ? "-1rem" : "-2.75rem",
      fontWeight: "900",
      scale: 0.75,
    })

    gsap.set(".split-outro-title .char", {
      x: isMobile ? "-3rem" : "-8rem",
      fontSize: isMobile ? "6rem" : "14rem",
      fontWeight: "500",
    })

    const tl = gsap.timeline({
      defaults: { ease: "hop" },
      onComplete: () => console.log("Animation complete!"),
    })

    // First animation - ALL letters appear from top to bottom (including x-char and exclamation-char)
    tl.to(splitText.chars.map(c => c.querySelector("span")), {
      y: "0%",
      duration: 0.75,
      stagger: 0.05,
    }, 0.25)

    // Second animation - only regular letters disappear down (exclude x-char and exclamation-char)
    .to(splitText.chars.map(c => c.querySelector("span")).filter(span => {
      const char = span?.closest('.char')
      return char && !char.classList.contains("x-char") && !char.classList.contains("exclamation-char") // exclude x and ! from disappearing
    }), {
      y: "100%",
      duration: 0.75,
      stagger: 0.05,
    }, 1) // 1 is the delay before the final animation starts

    // x-char animation
    .to('.x-char', {
      x: '35rem'
    }, '>0.1')

    // exclamation-char animation
    .to('.x-char, .exclamation-char', {
      fontSize: "40rem",
      duration: 0.75,
    }, '>0.1') // Start 0.1s after the previous animation (letters disappearing) completes

    // Split animation logic (fixed selectors)
    .to(containerRef.current, {
      clipPath: "polygon(0% 48%, 100% 48%, 100% 52%, 0% 52%)",
      duration: 1,
    }, 5)

    // Add onComplete callback to setup the split overlay clips
    .set(preloaderRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
    }, 5.2)
    .set(splitOverlayRef.current, {
      clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
    }, 5.2)

    .to([preloaderRef.current, splitOverlayRef.current], {
      y: (i) => (i === 0 ? "-50%" : "50%"),
      duration: 1,
    }, 6)

    .to(containerRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
    }, 6)

    .to('.card', {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.75,
    }, 6.25)

    return () => {
      tl.kill()
      splitText.revert() // return dom to original state
    }
  }, [])

  return (
    <div>
      {/* Preloader */}
      <div ref={preloaderRef} className={`preloader fixed w-screen h-screen bg-[#0a0a0a] text-white z-[2] ${dmSans.className}`}>
        <div className={styles.introTitle}>
          <h1 ref={titleRef} className={`${styles.title} invisible`}>
            Exclamation<span className={styles.accent}>!</span> Art Studio
          </h1>
        </div>
      </div>

      {/* Split Overlay */}
      <div ref={splitOverlayRef} className={styles.splitOverlay}>
        <div className={styles.splitIntroTitle}>
          <h1 className={styles.splitTitle}>Exclamation Art Studio</h1>
        </div>
                <div className={styles.splitIntroTitleRight}>
          <h1 className={styles.splitTitle}>!</h1>
        </div>
      </div>

      {/* Main Container */}
      <div 
        ref={containerRef}
        className={styles.container}
      >

        {/* Card */}
        <div 
          className={styles.card}
        >
          <h1 className={styles.cardTitle}>Exclamation</h1>
        </div>
      </div>
    </div>
  )
}

export default OldHero
