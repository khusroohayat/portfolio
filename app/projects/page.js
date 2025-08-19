import projects from '../../data/projects.json';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectsPage() {
  return (
    <div className="container">
      <h1 className="text-4xl font-bold my-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link href={`/projects/${project.slug}`} key={project.slug}>
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <Image src={project.image} alt={project.title} width={500} height={300} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <p>{project.description}</p>
                <div className="mt-4">
                  {project.tech.map(t => <span key={t} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{t}</span>)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
