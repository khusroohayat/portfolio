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
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Projects</h1>
      <Suspense>
        <HomeProjectsFilter />
      </Suspense>
    </section>
  );
}
