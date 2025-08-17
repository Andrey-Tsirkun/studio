import ScrollReveal from '../components/ScrollReveal';

export const revalidate = 3600; // Revalidate every hour

async function HomePage() {
  return (
    <main className="min-h-screen p-8 bg-yellow-500">
      <ScrollReveal />
    </main>
  );
}

export default HomePage; 