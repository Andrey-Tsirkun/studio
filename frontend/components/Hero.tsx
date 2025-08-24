"use client"

import React, { useLayoutEffect } from 'react'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans'
})
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'

const Hero = () => {

  const splitTextElements = (
    selector: string,
    type = "words,chars",
    addFirstChar = false
  ) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      const splitText = new SplitText(element, {
        type,
        wordsClass: "word",
        charsClass: "char relative inline-block overflow-hidden",
      });

      if (type.includes("chars")) {
                  splitText.chars.forEach((char, index) => {
            const originalText = char.textContent;
            char.innerHTML = `<span class="relative inline-block will-change-transform" style="transform: translateY(-100%);">${originalText}</span>`;

          if (addFirstChar && index === 0) {
            char.classList.add("first-char");
          }
        });
      }
    });
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase, SplitText);
    CustomEase.create("hop", ".8, 0, .3, 1");

    splitTextElements(".intro-title h1", "words,chars");
    gsap.set(".intro-title h1", { visibility: "visible" });

    const tl = gsap.timeline({ 
      defaults: { ease: "power2.out" },
      onComplete: () => console.log("Animation complete!")
    });

    // Letters appear from top to bottom (from -100% to 0%)
    tl.to(
      ".preloader .intro-title .char span",
      {
        y: "0%",
        duration: 0.75,
        stagger: 0.05,
      },
      0.5
    )
    // Letters disappear down (from 0% to 100%)
    .to(
      ".preloader .intro-title .char span",
      {
        y: "100%",
        duration: 0.75,
        stagger: 0.05,
      },
      2
    )
    // Final animation - closing preloader
    .to(
       ".preloader",
       {
         clipPath: "polygon(0% 48%, 100% 48%, 100% 52%, 0% 52%)",
         duration: 1,
       },
       5
     );
  }, []);

  return (
    <div className={`bg-black text-white fixed w-screen h-screen z-[2] ${dmSans.className}`}>
      <div className="preloader">
        <div className="intro-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
          <h1 className="uppercase text-8xl font-semibold leading-none invisible">Nullspace Studio</h1>
        </div>
      </div>
    </div>
  )
}

export default Hero;
