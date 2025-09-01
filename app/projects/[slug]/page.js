import projects from '../../../data/projects.json';
import Image from 'next/image';
import Link from 'next/link';

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
    <section className="bento container" style={{ marginTop: '2rem' }}>
      <Link href="/projects" className="button white" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>&larr; Back to Projects</Link>
      <div className="bento-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <div className="bento-item" style={{ flex: '1 1 400px', minWidth: 0 }}>
          <Image src={project.image} alt={project.title} width={800} height={450} className="w-full h-auto object-cover rounded-lg mb-4" />
        </div>
        <div className="bento-item" style={{ flex: '2 1 500px', minWidth: 0 }}>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg mb-4">{project.description}</p>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-2">Technologies Used:</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{t}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-4" style={{ marginTop: '1.5rem' }}>
            {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="button black">Live Demo</a>}
            {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="button white">GitHub Repo</a>}
          </div>
        </div>
      </div>
    </section>
  );
}
