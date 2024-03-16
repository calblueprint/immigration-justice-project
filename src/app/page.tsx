import NavBar from '@/components/NavBar';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <NavBar />
      <div style={{ paddingTop: '78px' }}>
        <div className={styles.description}>immigration justice project</div>
      </div>
    </main>
  );
}
