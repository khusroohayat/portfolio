'use client';
import React from 'react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
const HomeProjectsFilter = dynamic(() => import('../HomeProjectsFilter'), {
  ssr: false,
  loading: () => <div>Loading projects…</div>,
});

export default function ProjectsPage() {
  return (
    <section className="bento container" style={{ paddingTop: '3rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>Projects</h1>
        <a
          href="/Khusroo-Hayat-CV.pdf"
          className="button black"
          aria-label="Download Khusroo Hayat's PDF Resume"
          download
          style={{ marginLeft: '1.5rem', fontWeight: 600 }}
        >
          Download Resume
        </a>
      </div>
      <Suspense>
        <HomeProjectsFilter />
      </Suspense>
    </section>
  );
}
