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
    <div className="container mx-auto px-4 py-8">
      <Link href="/projects" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Projects</Link>
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <Image src={project.image} alt={project.title} width={800} height={450} className="w-full h-auto object-cover rounded-lg mb-4" />
      <p className="text-lg mb-4">{project.description}</p>
      <div className="mb-4">
        <h3 className="text-2xl font-semibold mb-2">Technologies Used:</h3>
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{t}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="button black">Live Demo</a>}
        {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="button white">GitHub Repo</a>}
      </div>
    </div>
  );
}
