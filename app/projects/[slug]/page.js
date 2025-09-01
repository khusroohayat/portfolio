import projects from '../../../data/projects.json';

import Image from 'next/image';
import Link from 'next/link';
import styles from './project-detail.module.css';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetailPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <section className="container" style={{ marginTop: '10rem' }}>
      <div className={styles.projectDetailWrapper}>
        <div className={styles.projectImageSection}>
          <Image src={project.image} alt={project.title} width={800} height={450} className={styles.projectImage} />
        </div>
        <div className={styles.projectInfoSection}>
          <div className="hero-blue" style={{ borderRadius: '1rem', padding: '2rem', background: 'var(--hero-blue-bg, #eaf4fb)', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                {project.title}
              </h1>
              <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>{project.description}</p>
              <div className="call-to-action" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="button black">
                    Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="button white" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src="/imgs/github.png" alt="GitHub" width="28" height="28" title="GitHub Repo" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
                  </a>
                )}
              </div>
              <div className={styles.techSection} style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Technologies Used:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.tech.map(t => (
                    <span key={t} style={{ background: '#e2e8f0', borderRadius: '999px', padding: '0.4em 1em', fontSize: '0.95em', fontWeight: 500, color: '#374151' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link href="/projects" className="button white" style={{ marginTop: '2.5rem', display: 'inline-block' }}>&larr; Back to Projects</Link>
    </section>
  );
}
