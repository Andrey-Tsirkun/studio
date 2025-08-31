import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from './animation';
import NavLink from './NavLink';
import Curve from './NavCurve';
import Footer from './NavFooter';

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Work",
    href: "/work",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

const Nav = () => {

  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div 
      variants={menuSlide} 
      initial="initial" 
      animate="enter" 
      exit="exit" 
      className="h-screen bg-[rgb(41,41,41)] fixed right-0 top-0 text-white z-[3]"
      >
       <div className="box-border h-full p-[100px] flex flex-col justify-between">
            <div onMouseLeave={() => {setSelectedIndicator(pathname)}} className="flex flex-col text-[56px] gap-3 mt-20">
                    <div className="text-[rgb(153,153,153)] border-b border-[rgb(153,153,153)] uppercase text-[11px] mb-10">
                        <p>Navigation</p>
                    </div>
                    {
                      navItems.map( (data, index) => {
                        return <NavLink 
                        key={index} 
                        data={{...data, index}} 
                        isActive={selectedIndicator == data.href} 
                        setSelectedIndicator={setSelectedIndicator}>
                        </NavLink>
                      })
                    }
            </div>
            <Footer />
        </div>
        <Curve />
    </motion.div>
  )
}

export default Nav;