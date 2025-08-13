import ScrollReveal from '../components/ScrollReveal';
import TailwindTest from '../components/TailwindTest';

export const revalidate = 3600; // Revalidate every hour

async function HomePage() {
  return (
    <main className="min-h-screen p-8 bg-yellow-500">
      <TailwindTest />
      <ScrollReveal />
    </main>
  );
}

export default HomePage; 