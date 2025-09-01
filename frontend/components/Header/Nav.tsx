import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from './animation';
import NavLink from './NavLink';
import Curve from './NavCurve';
import Footer from './NavFooter';
import styles from '../../styles/components/Nav.module.scss';

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
      className={styles.nav}
      >
       <div className={styles.navContainer}>
            <div onMouseLeave={() => {setSelectedIndicator(pathname)}} className={styles.navItems}>
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