'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from './Nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RoundedButton from '../common/RoundedButton';
import Magnetic from '../common/Magnetic';

const Header = () => {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);

  useEffect(() => {
    if (isActive) setIsActive(false)
  }, [pathname])

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => { gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" }) },
        onEnterBack: () => { gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" }).then(() => setIsActive(false)) }
      }
    })
  }, [])

  return (
    <>
      <div ref={header} className="absolute flex z-[1] top-0 text-white p-[35px] justify-between w-full font-light box-border items-center">
        <div className="flex items-center">
          <Magnetic>
            <div className="flex flex-col relative z-[1] p-[15px] cursor-pointer group">
              <a className="cursor-pointer">Work</a>
              <div className="absolute w-[5px] h-[5px] top-[45px] left-1/2 bg-white rounded-full scale-0 -translate-x-1/2 transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100"></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className="flex flex-col relative z-[1] p-[15px] cursor-pointer group">
              <a className="cursor-pointer">About</a>
              <div className="absolute w-[5px] h-[5px] top-[45px] left-1/2 bg-white rounded-full scale-0 -translate-x-1/2 transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100"></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className="flex flex-col relative z-[1] p-[15px] cursor-pointer group">
              <a className="cursor-pointer">Contact</a>
              <div className="absolute w-[5px] h-[5px] top-[45px] left-1/2 bg-white rounded-full scale-0 -translate-x-1/2 transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100"></div>
            </div>
          </Magnetic>
        </div>
      </div>
      <div ref={button} className="scale-0 fixed right-0 z-[4]">
        <RoundedButton onClick={() => { setIsActive(!isActive) }}>
          <div className={`w-full relative z-[1] before:content-[''] before:block before:h-[1px] before:w-[40%] before:m-auto before:bg-white before:relative before:transition-transform before:duration-300 before:top-[5px] after:content-[''] after:block after:h-[1px] after:w-[40%] after:m-auto after:bg-white after:relative after:transition-transform after:duration-300 after:-top-[5px] ${isActive ? 'before:rotate-45 before:top-[-1px] after:rotate-[-45deg] after:top-0' : ''}`}></div>
        </RoundedButton>
      </div>
      <AnimatePresence mode="wait">
        {isActive && <Nav />}
      </AnimatePresence>
    </>
  )
}

export default Header;