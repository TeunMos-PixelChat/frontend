import React from 'react';
import styles from './shell.module.css';
import SmallSidebarButtons from './smallSideBarButtons';

type LayoutProps = {
  children?: React.ReactNode;
  showBigSidebar?: boolean;
};

export default function Layout({ children, showBigSidebar = true }: LayoutProps) {

  return (
    <div className={styles.shellContainer}>
      <div className={styles.shellComponentsContainer}>

        {/* Most left sidebar (the small one with the buttons) */}
        <div className={styles.smallSidebar}>
          <SmallSidebarButtons/>
        </div>

        {/* Big sidebar */}
        { showBigSidebar && (
          <div className={styles.bigSidebarContainer}>
            <div className={styles.bigSidebar}>
              BIGSIDEBAR
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