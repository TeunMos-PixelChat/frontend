import styles from './shell.module.css';

export default function InnerHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.innerHeaderContainer}>
      <div className={styles.innerHeader}>
        Inner Header
      </div>
      <div className={styles.shellInnerContent}>
        {children}
      </div>
    </div>
  );

}