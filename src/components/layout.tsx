
import { MainNav } from "./main-nav";
import styles from './layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layoutContainer}>
      <MainNav />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={`container ${styles.footerContent}`}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Ayush Kumar. All rights reserved.
          </p>
          <div className={styles.socialLinks}>
            <a 
              href="https://github.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
