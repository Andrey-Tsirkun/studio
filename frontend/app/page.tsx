import Hero from '../components/Hero';

export const revalidate = 3600; // Revalidate every hour

async function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  );
}

export default HomePage; 