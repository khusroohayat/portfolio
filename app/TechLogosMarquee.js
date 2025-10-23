import Image from 'next/image';

export default function TechLogosMarquee() {
  const logos = [
    { src: '/imgs/vscode.png', alt: 'VS Code', title: 'VS Code' },
    { src: '/imgs/cursor.png', alt: 'Cursor', title: 'Cursor' },
    { src: '/imgs/windsurf.png', alt: 'Windsurf', title: 'Windsurf' },
    { src: '/imgs/lovable.png', alt: 'Lovable', title: 'Lovable' },
    { src: '/imgs/replit.png', alt: 'Replit', title: 'Replit' },
    { src: '/imgs/v0.png', alt: 'v0', title: 'v0' },
    { src: '/imgs/firebase-studio.png', alt: 'Firebase Studio', title: 'Firebase Studio' },
    { src: '/imgs/asp-net.png', alt: 'Asp.net', title: 'Asp.net' },
    { src: '/imgs/vue-js-logo.png', alt: 'Vue.js', title: 'Vue.js' },
    { src: '/imgs/azure.png', alt: 'Azure', title: 'Azure' },
    { src: '/imgs/node-js.png', alt: 'Node.js', title: 'Node.js' },
    { src: '/imgs/typescript.png', alt: 'TypeScript', title: 'TypeScript' },
    { src: '/imgs/sql-server.png', alt: 'SQL Server', title: 'SQL Server' },
    { src: '/imgs/chatgpt.png', alt: 'ChatGPT', title: 'ChatGPT' },
    { src: '/imgs/mongodb.png', alt: 'MongoDB', title: 'MongoDB' },
    { src: '/imgs/blazor.png', alt: 'Blazor', title: 'Blazor' },
    { src: '/imgs/nextjs.png', alt: 'Next JS', title: 'Next.js' },
    { src: '/imgs/vercel.png', alt: 'Vercel', title: 'Vercel' },
    { src: '/imgs/netlify.png', alt: 'Netlify', title: 'Netlify' },
    { src: '/imgs/strapi.png', alt: 'Strapi', title: 'Strapi' },
    { src: '/imgs/react.png', alt: 'React', title: 'React' },
    { src: '/imgs/supabase.png', alt: 'Supabase', title: 'Supabase' },
    { src: '/imgs/tailwind-css.png', alt: 'Tailwind CSS', title: 'Tailwind CSS' },
    { src: '/imgs/shadcn-ui.png', alt: 'Shadcn UI', title: 'Shadcn UI' },
    { src: '/imgs/express-js.png', alt: 'Express.js', title: 'Express.js' },
    { src: '/imgs/angular.png', alt: 'Angular', title: 'Angular' },
    { src: '/imgs/docker.png', alt: 'Docker', title: 'Docker' },
  ];
  return (
    <section className="logos container">
      <div className="marquee">
        <div className="track">
          {logos.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              width={128}
              height={128}
              style={{ width: 128, height: 'auto', display: 'inline-block' }}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
