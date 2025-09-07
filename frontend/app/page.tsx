import Hero from '../components/Hero';
import Main from '../components/Main';
import { ReactLenis } from 'lenis/react';

async function HomePage() {
  return (
    <ReactLenis smooth lerp={1} root>
      <main>
        <Hero />
        <Main />
      </main>
    </ReactLenis>
  );
}

export default HomePage; 