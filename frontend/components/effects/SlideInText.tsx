import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import styles from '../../styles/components/SlideInText.module.scss';

interface Props {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  onComplete?: () => void;
}

const SlideInText: React.FC<Props> = ({
  children,
  delay = 0.25,
  duration = 0.75,
  stagger = 0.05,
  className = '',
  onComplete
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!titleRef.current) return;

    // Register GSAP plugins
    gsap.registerPlugin(CustomEase, SplitText);
    CustomEase.create("hop", ".8, 0, .3, 1");

    // Split text into characters
    const splitText = new SplitText(titleRef.current, {
      type: "words,chars",
      wordsClass: styles.word,
      charsClass: styles.char,
    });

    // Create spans for each character and set initial position
    splitText.chars.forEach((char) => {
      const span = document.createElement("span");
      span.className = styles.characterSpan;
      span.style.transform = "translateY(-100%)";
      span.textContent = char.textContent || "";
      char.innerHTML = "";
      char.appendChild(span);
    });

    // Make title visible
    gsap.set(titleRef.current, { visibility: "visible" });

    // Create animation timeline
    const tl = gsap.timeline({
      defaults: { ease: "hop" },
    });

    // Animate characters from top to bottom
    tl.to(splitText.chars.map(c => c.querySelector("span")), {
      y: "0%",
      duration: duration,
      stagger: stagger,
    }, delay);

    // Execute onComplete callback after animation finishes
    if (onComplete) {
      tl.call(onComplete);
    }

    // Cleanup function
    return () => {
      tl.kill();
      splitText.revert(); // Return DOM to original state
    };
  }, [delay, duration, stagger, onComplete]);

  return (
    <div ref={titleRef} className={className}>
      {children}
    </div>
  );
};

export default SlideInText;
