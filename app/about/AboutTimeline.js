import React from 'react';
import styles from './about-timeline.module.css';
import timelineData from '../../data/about-timeline.json';

export default function AboutTimeline() {
  return (
    <section className={styles.timelineContainer}>
      <h3>Professional Timeline</h3>
      {timelineData.events.map((event) => (
        <div key={event.id} className={styles.event}>
          <div className={styles.year}>{event.year}</div>
          <div className={styles.title}>
            {event.title} at {event.company}
          </div>
          <p>{event.description}</p>
        </div>
      ))}
    </section>
  );
}
