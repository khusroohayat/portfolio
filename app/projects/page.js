'use client';
import { Suspense } from 'react';
import HomeProjectsFilter from '../HomeProjectsFilter';

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
