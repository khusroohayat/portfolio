'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeArticle, setActiveArticle] = useState(0);

  const projects = [
    {
      title: 'Gostat',
      tech: ['GoLang', 'TypeScript', 'Bot'],
      description: 'Gostat is an app (specialist) designed for helping financial and dashboard tool. It\'s created from you statistics and analytics.',
      image: '/imgs/prj-image-1.png',
    },
    {
      title: 'Kana Master',
      tech: ['TypeScript', 'SvelteReact', 'React Toolkit'],
      description: 'Japanese in our app (specialist) designed for learning Japanese Kana characters with interactive lessons and quizzes.',
      image: '/imgs/prj-image-2.png',
    },
    {
      title: 'DevApp',
      tech: ['React / Expo11', 'Docker / (.1,X)11', 'Dev / Node'],
      description: 'A comprehensive developer tool suite for modern web development.',
      image: '/imgs/prj-image-3.png',
    },
    {
      title: 'Anime Sensay',
      tech: ['React11', 'Node', 'TypeScript', 'LESS'],
      description: 'Anime Based (Inspired) in both Arts developer and Personel used through API, allows users to connect and share their favorite anime.',
      image: '/imgs/prj-image-5.png',
    },
  ];

  const workExperience = [
    {
      date: 'Jan 2021',
      company: 'ShinerSoft',
      role: 'Frontend developer',
      location: 'Ankara',
    },
    {
      date: 'Jul 2019',
      company: 'TenPearls',
      role: 'Frontend developer',
      location: 'Istanbul',
    },
    {
      date: 'Oct 2018',
      company: 'Northern Crescent',
      role: 'Fullstack developer',
      location: 'Toronto',
    },
    {
      date: 'Oct 2017',
      company: 'RedCastle Tech',
      role: 'Full-stack developer',
      location: 'Dubai',
    },
  ];

  const articles = [
    {
      title: 'The simplest example in kafka + golang',
      description: 'This article explores a simple way to implement Kafka with Golang and Kubernetes.',
      readTime: '5 min read',
    },
    {
      title: 'The simplest example in kafka + golang',
      description: 'Advanced a microservice architecture with Kafka streaming and real-time updates.',
      readTime: '8 min read',
    },
    {
      title: 'The simplest example in kafka + golang',
      description: 'Build a photo/video/doc async uploading tool with event-driven architecture.',
      readTime: '6 min read',
    },
  ];

  const skills = {
    languages: ['JavaScript', 'React', 'Vue', 'Java', 'Kotlin', 'Swift', 'Node.js', 'Docker', 'Python', 'Rust', 'GitHub', 'Web', 'Editor', 'Docker'],
    styles: ['Bootstrap', 'Ant.d', 'Material.ui', 'Tailwind', 'Chakra.ui', 'Radix'],
    backend: ['Golang', 'C / C++', 'PHP / Bitrix24', 'Rust', 'TypeScript', 'Redis', 'Kafka', 'Docker / Node', 'TypeScript', 'Microservices'],
    devops: ['Docker', 'Kubernetes', 'Node / Expo11', 'Docker / (.1,X)11', 'Dev / Node'],
  };

  return (
    <div className={styles.portfolio}>
      <header className={styles.header}>
        <div className={styles.logo}>nik.khvat</div>
        <button className={styles.menuButton}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Full-stack<br />Developer
          </h1>
          <p className={styles.subtitle}>
            My goal is to write memorable, clean and understandable code
          </p>
          <div className={styles.projectsButton}>
            <button>Projects</button>
            <span className={styles.arrow}>→</span>
          </div>
          <div className={styles.socialLinks}>
            <a href="#"><img src="/imgs/github.png" alt="GitHub" /></a>
            <a href="#"><img src="/imgs/linkedin.png" alt="LinkedIn" /></a>
            <a href="#" className={styles.telegram}>Telegram</a>
            <a href="#" className={styles.telegram}>Instagram</a>
          </div>
        </section>

        <section className={styles.projectShowcase}>
          <div className={styles.projectCard}>
            <img src={projects[activeProject].image} alt={projects[activeProject].title} />
            <div className={styles.projectInfo}>
              <h3>{projects[activeProject].title}</h3>
              <p>{projects[activeProject].description}</p>
              <div className={styles.projectActions}>
                <button>Read more</button>
                <span className={styles.arrow}>→</span>
              </div>
            </div>
          </div>
          <div className={styles.projectNav}>
            <button onClick={() => setActiveProject((prev) => (prev > 0 ? prev - 1 : projects.length - 1))}>
              ←
            </button>
            <div className={styles.dots}>
              {projects.map((_, index) => (
                <span
                  key={index}
                  className={index === activeProject ? styles.activeDot : ''}
                  onClick={() => setActiveProject(index)}
                ></span>
              ))}
            </div>
            <button onClick={() => setActiveProject((prev) => (prev < projects.length - 1 ? prev + 1 : 0))}>
              →
            </button>
          </div>
        </section>

        <section className={styles.about}>
          <h2>About me</h2>
          <p className={styles.aboutText}>
            I am skilled in <strong>Full-stack Development</strong>. More than <strong>2 years</strong> I develop beautiful web applications.
          </p>
          <div className={styles.aboutImage}>
            <img src="/imgs/khusroo-hero-image.png" alt="Profile" />
          </div>
        </section>

        <section className={styles.skills}>
          <h3>Languages</h3>
          <div className={styles.skillTags}>
            {skills.languages.map((skill, index) => (
              <span key={index} className={styles.tag}>
                {skill}
              </span>
            ))}
          </div>

          <h3>Styles</h3>
          <div className={styles.skillTags}>
            {skills.styles.map((skill, index) => (
              <span key={index} className={styles.tag}>
                {skill}
              </span>
            ))}
          </div>

          <h3>Back-end</h3>
          <div className={styles.skillTags}>
            {skills.backend.map((skill, index) => (
              <span key={index} className={styles.tag}>
                {skill}
              </span>
            ))}
          </div>

          <h3>DevOps</h3>
          <div className={styles.skillTags}>
            {skills.devops.map((skill, index) => (
              <span key={index} className={styles.tag}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      </main>

      <aside className={styles.workPanel}>
        <h2>Work</h2>
        <div className={styles.workList}>
          {workExperience.map((work, index) => (
            <div key={index} className={styles.workItem}>
              <span className={styles.date}>{work.date}</span>
              <div className={styles.workDetails}>
                <h4>{work.company}</h4>
                <p>{work.role} | {work.location}</p>
              </div>
            </div>
          ))}
          <p className={styles.workFooter}>
            Work experience<br />
            <strong>4 years 7 months</strong>
          </p>
        </div>
        <h2 className={styles.projectsTitle}>... Projects ...</h2>
        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <div key={index} className={styles.projectThumb}>
              <img src={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </aside>

      <aside className={styles.articlesPanel}>
        <h2>Articles</h2>
        <div className={styles.articlesList}>
          {articles.map((article, index) => (
            <div key={index} className={styles.articleCard}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <div className={styles.articleActions}>
                <button>Read more</button>
                <span className={styles.arrow}>→</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.articleNav}>
          <div className={styles.navDots}>
            {articles.map((_, index) => (
              <span
                key={index}
                className={index === activeArticle ? styles.activeDot : ''}
                onClick={() => setActiveArticle(index)}
              ></span>
            ))}
          </div>
          <button onClick={() => setActiveArticle((prev) => (prev > 0 ? prev - 1 : articles.length - 1))}>
            ←
          </button>
          <button onClick={() => setActiveArticle((prev) => (prev < articles.length - 1 ? prev + 1 : 0))}>
            →
          </button>
        </div>

        <section className={styles.contact}>
          <h2>... Contacts ...</h2>
          <div className={styles.contactTags}>
            <span>Email</span>
            <span>About</span>
            <span>Projects</span>
            <span>Activity</span>
          </div>
          <div className={styles.location}>
            <p>Motivated to be //<br />Resident / Dubai /<br />Remote to NAFTA</p>
          </div>
        </section>

        <section className={styles.footer}>
          <h2>Nikita<br />Khvatov</h2>
          <p className={styles.role}>Full-stack<br />developer</p>
          <div className={styles.footerLinks}>
            <a href="#">Website</a>
            <a href="#">Email</a>
            <a href="#">Telegram</a>
          </div>
          <div className={styles.footerSocial}>
            <a href="#">Facebook</a>
            <a href="#">LinkedIn</a>
          </div>
        </section>
      </aside>
    </div>
  );
}
