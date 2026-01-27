'use client';
import React, { useState, useEffect, useRef } from 'react';
// Dynamic import for projects.json
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function HomeProjectsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [techFilter, setTechFilter] = useState('');
  const [projects, setProjects] = useState([]);
  const [allTechs, setAllTechs] = useState([]);
  const scrollRef = useRef(null);

  // Dynamically import projects.json on mount
  useEffect(() => {
    let isMounted = true;
    import('../data/projects.json').then((mod) => {
      if (isMounted) {
        setProjects(mod.default || mod);
        setAllTechs([...new Set((mod.default || mod).flatMap((project) => project.tech))].sort());
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize tech filter from URL query string on component mount
  useEffect(() => {
    if (allTechs.length === 0) return;
    const techParam = searchParams.get('tech');
    if (techParam && allTechs.includes(techParam)) {
      setTechFilter(techParam);
    }
  }, [searchParams, allTechs]);

  const filteredProjects = techFilter
    ? projects.filter((project) => project.tech.includes(techFilter))
    : projects;

  // Handle tech filter change and update URL
  const handleTechFilterChange = (tech) => {
    setTechFilter(tech);

    // Update URL with query string
    const params = new URLSearchParams(searchParams);
    if (tech) {
      params.set('tech', tech);
    } else {
      params.delete('tech');
    }

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div
        className="filter-container"
        data-testid="home-projects-filter"
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      >
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() =>
            scrollRef.current && scrollRef.current.scrollBy({ left: -160, behavior: 'smooth' })
          }
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 32,
            height: 32,
            borderRadius: 999,
            border: 'none',
            background: 'rgba(0,0,0,0.4)',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          ‹
        </button>
        <div
          className="filter-row"
          data-testid="tech-filter-row"
          ref={scrollRef}
          role="group"
          aria-label="Technology filters"
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            gap: '0.7rem',
            marginBottom: '2.2rem',
            whiteSpace: 'nowrap',
            marginLeft: 40,
            marginRight: 40,
          }}
        >
          <button
            type="button"
            onClick={() => handleTechFilterChange('')}
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
          {allTechs.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => handleTechFilterChange(tech)}
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
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() =>
            scrollRef.current && scrollRef.current.scrollBy({ left: 160, behavior: 'smooth' })
          }
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 32,
            height: 32,
            borderRadius: 999,
            border: 'none',
            background: 'rgba(0,0,0,0.4)',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          ›
        </button>
      </div>
      <div className="bento-grid">
        {filteredProjects.length === 0 && (
          <div
            style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', fontSize: '1.1rem' }}
          >
            No projects found.
          </div>
        )}
        {filteredProjects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.slug}
            className="bento-item"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div>
              {/* Use actual image dimensions for project images */}
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={340}
                style={{ width: '100%', height: 'auto', borderRadius: 12, objectFit: 'cover' }}
                loading="lazy"
                placeholder="blur"
                blurDataURL="/imgs/placeholder.png"
              />
              <div className="project-info" style={{ padding: '1.1rem 0 0.5rem 0' }}>
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    margin: '0.3rem 0px 0.7rem 0.7rem',
                  }}
                >
                  {project.title}
                </h3>
                <p
                  className="project-description"
                  style={{ margin: '0.3rem 0 0.7rem 0.7rem', color: '#fff', fontSize: '1rem' }}
                >
                  {project.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    margin: '0.3rem 0 0.7rem 0.7rem',
                  }}
                >
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: '#e3f2fd',
                        borderRadius: 999,
                        padding: '0.3em 1em',
                        fontSize: '0.98rem',
                        fontWeight: 600,
                        color: '#1565c0',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
