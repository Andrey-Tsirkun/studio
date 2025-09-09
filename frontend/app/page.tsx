import Hero from '../components/Hero';
import Main from '../components/Main';
import { ReactLenis } from 'lenis/react';
import StickyCards from '../components/StickyCards';

async function HomePage() {
  return (
    <>
      <ReactLenis root />
      <main>
        <Hero />
        <Main />
        <StickyCards />
        <div style={{ height: '1200px' }} />
      </main>      
  </>
  );
}

export default HomePage; 