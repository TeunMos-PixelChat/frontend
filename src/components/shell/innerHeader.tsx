import styles from './shell.module.css';

export default function InnerHeader({ children, content }: { children: React.ReactNode, content?: React.ReactNode }) {
  return (
    <div className={styles.innerHeaderContainer}>
      <div className={styles.innerHeader}>
        {content}
      </div>
      <div className={styles.shellInnerContent}>
        {children}
      </div>
    </div>
  );

}