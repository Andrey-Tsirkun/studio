"use client"

import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { SplitText } from "gsap/SplitText"
import { dmSans } from "../utils/typography"

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const preloaderRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!titleRef.current || !preloaderRef.current) return

    gsap.registerPlugin(CustomEase, SplitText)
    CustomEase.create("hop", ".8, 0, .3, 1")

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

    gsap.set(titleRef.current, { visibility: "visible" })

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => console.log("Animation complete!"),
    })

    // First animation - ALL letters appear from top to bottom (including x-char and exclamation-char)
    tl.to(splitText.chars.map(c => c.querySelector("span")), {
      y: "0%",
      duration: 0.75,
      stagger: 0.05,
    }, 0.5)

    // Second animation - only regular letters disappear down (exclude x-char and exclamation-char)
    .to(splitText.chars.map(c => c.querySelector("span")).filter(span => {
      const char = span?.closest('.char')
      return char && !char.classList.contains("x-char") && !char.classList.contains("exclamation-char") // exclude x and ! from disappearing
    }), {
      y: "100%",
      duration: 0.75,
      stagger: 0.05,
    }, 2) // 2 is the delay before the final animation starts

    // x-char animation
    .to('.x-char', {
      x: '35rem'
    }, '>0.1')

    // exclamation-char animation
    .to('.x-char, .exclamation-char', {
      fontSize: "40rem",
      duration: 0.75,
    }, '>0.1') // Start 0.5s after the previous animation (letters disappearing) completes

    // .to(preloaderRef.current, {
    //   clipPath: "polygon(0% 48%, 100% 48%, 100% 52%, 0% 52%)",
    //   duration: 1,
    // }, ">1")

    return () => {
      tl.kill()
      splitText.revert() // return dom to original state
    }
  }, [])

  return (
    <div className={`bg-black text-white fixed w-screen h-screen z-[2] ${dmSans.className}`}>
      <div ref={preloaderRef} className="preloader">
        <div className="intro-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
          <h1 ref={titleRef} className="uppercase text-8xl font-semibold leading-none invisible">
            Exclamation<span className="text-red-500">!</span> Art Studio
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Hero
