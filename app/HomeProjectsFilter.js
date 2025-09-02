"use client";
import projects from '../data/projects.json';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function HomeProjectsFilter() {
  const [techFilter, setTechFilter] = useState('');
  const allTechs = Array.from(new Set(projects.flatMap(p => p.tech))).sort();
  const filteredProjects = techFilter
    ? projects.filter(project => project.tech.includes(techFilter))
    : projects;

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', marginBottom: '2.2rem' }}>
        <button
          type="button"
          onClick={() => setTechFilter('')}
          aria-pressed={techFilter === ''}
          style={{
            background: techFilter === '' ? '#1565c0' : '#e3f2fd',
            color: techFilter === '' ? '#fff' : '#1565c0',
            border: 'none',
            borderRadius: 999,
            padding: '0.45em 1.3em',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: techFilter === '' ? '0 2px 8px 0 rgba(30,136,229,.10)' : 'none',
            outline: techFilter === '' ? '2px solid #1976d2' : 'none',
            transition: 'all 0.15s',
          }}
        >
          All
        </button>
        {allTechs.map(tech => (
          <button
            key={tech}
            type="button"
            onClick={() => setTechFilter(tech)}
            aria-pressed={techFilter === tech}
            style={{
              background: techFilter === tech ? '#1565c0' : '#e3f2fd',
              color: techFilter === tech ? '#fff' : '#1565c0',
              border: 'none',
              borderRadius: 999,
              padding: '0.45em 1.3em',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: techFilter === tech ? '0 2px 8px 0 rgba(30,136,229,.10)' : 'none',
              outline: techFilter === tech ? '2px solid #1976d2' : 'none',
              transition: 'all 0.15s',
            }}
          >
            {tech}
          </button>
        ))}
      </div>
      <div className="bento-grid">
        {filteredProjects.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', fontSize: '1.1rem' }}>No projects found.</div>
        )}
        {filteredProjects.map((project) => (
          <Link href={`/projects/${project.slug}`} key={project.slug} className="bento-item" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div>
              <Image src={project.image} alt={project.title} width={600} height={340} style={{ width: '100%', height: 'auto', borderRadius: 12, objectFit: 'cover' }} />
              <div className="project-info" style={{ padding: '1.1rem 0 0.5rem 0' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0.3rem 0px 0.7rem 0.7rem' }}>{project.title}</h3>
                <p style={{ margin: '0.3rem 0 0.7rem 0.7rem', color: '#fff', fontSize: '1rem' }}>{project.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.3rem 0 0.7rem 0.7rem' }}>
                  {project.tech.map(t => <span key={t} style={{ background: '#e3f2fd', borderRadius: 999, padding: '0.3em 1em', fontSize: '0.98rem', fontWeight: 600, color: '#1565c0' }}>{t}</span>)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
