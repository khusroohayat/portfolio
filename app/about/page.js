import React from 'react';
import AboutBiography from './AboutBiography';
import AboutTimeline from './AboutTimeline';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <main className={styles.aboutContainer}>
      <AboutBiography />
      <AboutTimeline />
    </main>
  );
}
