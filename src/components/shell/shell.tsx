import React from 'react';
import styles from './shell.module.css';
import SmallSidebarButtons from './smallSideBarButtons';

type LayoutProps = {
  children?: React.ReactNode;
  path: string;
  showBigSidebar?: boolean;
};

export default function Layout({ children, path, showBigSidebar = true }: LayoutProps) {

  return (
    <div className={styles.shellContainer}>
      <div className={styles.shellComponentsContainer}>

        {/* Most left sidebar (the small one with the buttons) */}
        <div className={styles.smallSidebar}>
          <SmallSidebarButtons path={path} />
        </div>

        {/* Big sidebar */}
        { showBigSidebar && (
          <div className={styles.bigSidebarContainer}>
            <div className={styles.bigSidebar}>
              <h1>{path}</h1>
            </div>
            <div className={styles.bigSidebarFooter}>
              <h1>Big Sidebar Footer</h1>
            </div>
          </div>)
        }
        
        <div className={styles.shellContent}>
          {children}
        </div>
      </div>
    </div>
  );
}