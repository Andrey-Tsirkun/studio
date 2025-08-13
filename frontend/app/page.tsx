import styles from './home.module.css';
import ScrollReveal from '../components/ScrollReveal';

export const revalidate = 3600; // Revalidate every hour

async function HomePage() {
  return (
    <main className={styles.main}>
      <ScrollReveal />
    </main>
  );
}

export default HomePage; 