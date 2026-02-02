import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const SERVICE_TAGS = [
  { label: 'Mobile Apps', color: '#E0F7FA' },
  { label: 'Web Apps', color: '#FFF3E0' },
  { label: 'AI Solutions', color: '#E8F5E9' },
  { label: 'SAAS', color: '#F3E5F5' },
  { label: 'Consulting', color: '#FFEBEE' },
  { label: 'Automation', color: '#EDE7F6' },
];

const ACCORDION_ITEMS = [
  {
    title: 'SAAS Product',
    desc: 'Custom SaaS product development from ideation to launch, tailored to your business needs.',
    features: [
      'Multi-tenant architecture',
      'Subscription billing integration',
      'Scalable cloud deployment',
      'User management & analytics',
    ],
  },
  {
    title: 'AI Powered Solutions',
    desc: 'Integrate advanced AI to automate, optimize, and transform your workflows.',
    features: [
      'LLM & GPT integration',
      'Predictive analytics',
      'Natural language processing',
      'AI-powered chatbots',
    ],
  },
  {
    title: 'Mobile App Development',
    desc: 'End-to-end mobile app design and development for iOS & Android platforms.',
    features: [
      'Cross-platform (React Native, Flutter)',
      'App store deployment',
      'Push notifications',
      'Performance optimization',
    ],
  },
  {
    title: 'Web App Development',
    desc: 'Modern, scalable web applications built with the latest frameworks.',
    features: [
      'Responsive UI/UX',
      'API integration',
      'Progressive Web Apps (PWAs)',
      'Security best practices',
    ],
  },
  {
    title: 'IT Consultation',
    desc: 'Expert advice to streamline your IT strategy and digital transformation.',
    features: [
      'Architecture review',
      'Tech stack selection',
      'Cloud migration',
      'Process automation',
    ],
  },
];

function Accordion() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className={styles['services-accordion']}>
      {ACCORDION_ITEMS.map((item, idx) => (
        <div
          key={item.title}
          className={`${styles['accordion-panel']}${openIdx === idx ? ' ' + styles['open'] : ''}`}
        >
          <button
            className={styles['accordion-title']}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            aria-expanded={openIdx === idx}
            aria-controls={`panel-${idx}`}
            id={`accordion-title-${idx}`}
          >
            {item.title}
            <span className={styles['accordion-icon']}>{openIdx === idx ? '-' : '+'}</span>
          </button>
          <div
            id={`panel-${idx}`}
            className={styles['accordion-content']}
            role="region"
            aria-labelledby={`accordion-title-${idx}`}
            style={{ display: openIdx === idx ? 'block' : 'none' }}
          >
            <p>{item.desc}</p>
            <ul>
              {item.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className={styles['services-section']} data-testid="services-section">
      <h2>
        <small>Services</small>
        Solutions We Provide
      </h2>
      {/* Decorative Background Images (lazy loaded) */}
      <Image
        src="/imgs/workplace-1.jpg"
        alt="Decorative 1"
        width={220}
        height={220}
        className={`${styles['decorative-bg']} ${styles['decorative-bg-1']}`}
        aria-hidden="true"
        loading="lazy"
      />
      <Image
        src="/imgs/workplace-2.jpg"
        alt="Decorative 2"
        width={160}
        height={160}
        className={`${styles['decorative-bg']} ${styles['decorative-bg-2']}`}
        aria-hidden="true"
        loading="lazy"
      />
      <div className={styles['services-content']}>
        <div className={`${styles['services-col']} ${styles['services-col-left']}`}>
          <p className={styles['services-desc']}>
            Unlock your business potential with our full spectrum of digital solutions, from custom
            SaaS platforms to AI-powered automation and expert IT consultation. We deliver scalable,
            future-ready products tailored to your goals.
          </p>
          <div className={styles['service-tags']}>
            {SERVICE_TAGS.map((tag) => (
              <span
                key={tag.label}
                className={styles['service-tag']}
                style={{ background: tag.color }}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
        <div className={`${styles['services-col']} ${styles['services-col-right']}`}>
          <Accordion />
        </div>
      </div>
    </section>
  );
}
