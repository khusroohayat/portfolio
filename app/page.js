'use client';
import { useState, useEffect, useRef } from 'react';
// ...existing code...

import ServicesSection from './ServicesSection';
import { Suspense } from 'react';
import HomeProjectsFilter from './HomeProjectsFilter';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const chatLogRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'How can I help you learn more about Khusroo and his Resume?',
    },
  ]);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  const submitForm = async (e) => {
    e.preventDefault();
    let newMessages = [...messages, { role: 'user', content: messageInput }];
    setMessages(newMessages);
    setMessageInput('');
    const apiMessage = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: newMessages }),
    });
    const data = await apiMessage.json();
    setMessages([...newMessages, { role: 'assistant', content: data.message }]);
  };

  // Add toggleMobileMenu handler if needed
  const toggleMobileMenu = () => setMenuOpen((open) => !open);

  return (
    <>
      <header>
        <a href="#" className="logo-holder">
          <div className="logo">K</div>
          <div className="logo-text">Portfolio Website</div>
        </a>
        <nav>
          <ul id="menu" className={menuOpen ? 'active' : ''}>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="mailto:khusroo.hayat@gmail.com" className="button">
                Contact Me
              </a>
            </li>
          </ul>
          <a href="#" className="mobile-toggle" onClick={toggleMobileMenu}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h10"
              />
            </svg>
          </a>
        </nav>
      </header>
      <main>
        <section className="hero container">
          <div className="hero-blue">
            <div>
              <h1>
                  <small>Hi I&apos;m </small>
                Syed Khusroo Hayat
              </h1>
              <p>
                <span>
                  a full stack developer specializing in cloud-native applications with AI
                  integration. I leverage LLMs, modern frameworks, and vibe coding practices to
                  build scalable solutions that solve real business problems across multiple
                  industries
                </span>
              </p>
              <div className="call-to-action">
                <a href="./Khusroo-Hayat-CV.pdf" className="button black">
                  View Resume
                </a>
                <a href="mailto:khusroo.hayat@gmail.com" className="button white">
                  Contact Me
                </a>
              </div>
              <div className="social-links">
                <a href="https://github.com/khusroohayat/">
                  <img src="./imgs/github.png" alt="GitHub" width="48" title="GitHub" />
                </a>
                <a href="https://www.linkedin.com/in/khusroosyed/">
                  <img src="./imgs/linkedin.png" alt="LinkedIn" width="48" title="LinkedIn" />
                </a>
                {/* Add your call-to-action buttons or content here if needed */}
              </div>
            </div>
          </div>
          <div className="hero-yellow">
            <img
              src="./imgs/khusroo-hero-image.png"
              alt="Khusroo Hayat"
              width="100%"
              title="Khusroo Hayat"
            />
          </div>
        </section>
        <section className="logos container">
          <div className="marquee">
            <div className="track">
              <img src="./imgs/html.png" alt="HTML" width="128" title="HTML" />
              <img src="./imgs/css.png" alt="CSS" width="128" title="CSS" />
              <img src="./imgs/javascript.png" alt="JS" width="128" title="JavaScript" />
              <img src="./imgs/sass.png" width="128" alt="Sass" title="Sass" />
              <img src="./imgs/react.png" width="128" alt="React" title="React" />
              <img src="./imgs/nextjs.png" width="128" alt="Next JS" title="Next.js" />
              <img src="./imgs/azure.png" width="128" alt="Azure" title="Azure" />
              <img src="./imgs/vscode.png" width="128" alt="VS Code" title="VS Code" />
              <img src="./imgs/python.png" width="128" alt="Python" title="Python" />
              <img src="./imgs/html.png" alt="HTML" width="128" title="HTML" />
              <img src="./imgs/css.png" alt="CSS" width="128" title="CSS" />
              <img src="./imgs/javascript.png" alt="JS" width="128" title="JavaScript" />
              <img src="./imgs/sass.png" width="128" alt="Sass" title="Sass" />
              <img src="./imgs/react.png" width="128" alt="React" title="React" />
              <img src="./imgs/nextjs.png" width="128" alt="Next JS" title="Next.js" />
              <img src="./imgs/azure.png" width="128" alt="Azure" title="Azure" />
              <img src="./imgs/vscode.png" width="128" alt="VS Code" title="VS Code" />
              <img src="./imgs/python.png" width="128" alt="Python" title="Python" />
            </div>
          </div>
        </section>
        <section id="skills" className="skills container">
          <h2>
            <small>About Me</small>
            Skills
          </h2>
          <div className="holder-blue">
            <div className="left-column">
              <h3>Frontend Excellence</h3>
              <ul>
                <li>React (Next.js)</li> {/* Highlighted Next.js */}
                <li>Blazor (Fluent UI)</li> {/* Added Fluent UI */}
                <li>Vue.js</li>
                <li>React Native</li> {/* New key skill */}
                <li>Tailwind UI</li> {/* New key skill */}
                <li>JavaScript</li>
                <li>CSS</li> {/* Simplified from CSS/Bootstrap */}
                {/* Removed: Angular.js, WordPress (unless it's a major focus for you now) */}
              </ul>

              <h3>Backend & Cloud Services</h3>
              <ul>
                <li>C#</li>
                <li>ASP.NET Core (MVC, Web API, Razor Pages)</li>
                <li>Node.js</li>
                <li>PHP</li> {/* Keep if still relevant to projects */}
                <li>Microsoft Azure</li> {/* Moved to its own logical grouping */}
                <li>Vercel</li> {/* New key skill */}
                <li>Firebase (Auth, Studio)</li> {/* Grouped Firebase services */}
                <li>Supabase</li> {/* New key skill */}
                <li>Appwrite</li> {/* New key skill */}
                <li>Entra ID (for Blazor)</li> {/* Specific integration skill */}
                {/* Removed: IIS (less relevant for modern cloud deployment emphasis) */}
              </ul>
            </div>

            <div className="right-column">
              <h3>AI Tools</h3> {/* New dedicated category */}
              <ul>
                <li>Vibe Coding</li>
                <li>Firebase Studio</li>
                <li>Cursor</li>
                <li>Lovable</li>
                <li>OpenAI</li>
                <li>Generative AI (Gen AI)</li> {/* Explicitly add this if you use it */}
                <li>LLMs</li> {/* Key new keyword */}
                {/* Placeholder for future AI tech if needed */}
              </ul>
              <h3>Databases & Integration</h3> {/* Streamlined and focused */}
              <ul>
                <li>MongoDB</li> {/* Highlighted Bookstore App */}
                <li>Microsoft SQL Server</li>
                <li>Dataverse</li> {/* New key skill */}
                <li>Microsoft Dynamics CRM</li>
                {/* Removed: MySQL (unless it's a major focus, keep if so) */}
              </ul>
              <h3>Developer Tools & Methodologies</h3> {/* Combined and focused */}
              <ul>
                <li>Git</li>
                <li>Azure DevOps</li>
                <li>Docker</li>
                <li>Entity Framework</li>
                <li>SCRUM</li>
                <li>Agile Methodologies</li>
              </ul>
            </div>

            <div className="additional-content">
              {/* Replaced "A bit about me" with a more dynamic intro,
        tying into your UVP and newer skills */}
              <h3>Your Partner in AI Development</h3>
              <p>
                  Hi, I&apos;m Syed Khusroo Hayat, an AI-Augmented Cloud-Native Full Stack Architect with
                  over a decade of experience. I specialize in building innovative web and mobile
                  applications using modern technologies like React (Next.js), Blazor, and React
                  Native, seamlessly integrating AI, LLMs, and Cloud services (Azure, Firebase,
                  Supabase, Appwrite).
              </p>
              <p>
                  My &apos;Vibe Coding&apos; approach ensures clean, efficient, and scalable solutions that
                  drive tangible business results. Let&apos;s build something intelligent together.
              </p>
            </div>
          </div>
        </section>
        <section className="work-experience container">
          <h2>
            <small>Recent</small>
            Work Experience
          </h2>
          <div className="jobs">
            <article>
              <figure>
                <div>
                  <img
                    src="./imgs/consultant.jpg"
                    alt="Workplace 1 - YouTube Creator"
                    width="100%"
                    title="Consultant"
                  />
                  <figcaption>Consultant</figcaption>
                </div>
              </figure>
              <h3>Consultant</h3>
              <div>2017-current</div>
              <p>
                Developing innovative solutions to automate eCommerce tasks, designing project
                management apps, and leading development in technologies like Blazor, React, and
                Azure for various clients.
              </p>
            </article>
            <article>
              <figure>
                <div>
                  <img
                    src="./imgs/tenpearls.png"
                    alt="Workplace 2 - Moshi Moshi Marketing"
                    width="100%"
                    title="10Pearls"
                  />
                  <figcaption>10Pearls</figcaption>
                </div>
              </figure>
              <h3>Software Developer</h3>
              <div>2015-2017</div>
              <p>
                Worked on Microsoft Dynamics CRM, developed APIs, and contributed to telehealth and
                internal systems, implementing innovative backend and automation solutions.
              </p>
            </article>
            <article>
              <figure>
                <div>
                  <img
                    src="./imgs/shinersoft.png"
                    alt="Workplace 3 - Chamber of Commerce"
                    width="100%"
                    title="Shiner Soft"
                  />
                  <figcaption>Shiner Soft</figcaption>
                </div>
              </figure>
              <h3>Software Engineer</h3>
              <div>2013-2014</div>
              <p>
                Developed healthcare portals and Android applications using Xamarin and ASP.NET,
                managing both technical and client-facing aspects of the project.
              </p>
            </article>
          </div>
        </section>
        <section id="projects" className="bento container">
          <h2>
            <small>Previous</small>
            Completed Projects
          </h2>
          <Suspense>
            <HomeProjectsFilter />
          </Suspense>
        </section>
        {/* --- Services Section --- */}
        <ServicesSection />
        {/* --- End Services Section --- */}
        <section className="chatbot container">
          <h2>
            <small>Talk to me</small>
            Chatbot
          </h2>
          <div className="chatbot-blue">
            <div className="chat-info">
              <h3>AI Chatbot</h3>
              <p>
                  I&apos;ve put together a chatbot here which knows all my skills, work experience and has
                  a copy of my CV/Resume. You can use it to ask questions about me to get a better
                  idea of who I am and what I&apos;ve done.
              </p>
              <p>
                  You can also download my resume here if you want to take a look at it. I&apos;m currently
                  looking for new opportunities so if you have a project you think I&apos;d be a good fit
                  for, please get in touch!
              </p>
              <a href="./Sample_Resume_Template.pdf" className="button black">
                Download Resume
              </a>
            </div>
            <div className="chat-box">
              <div className="scroll-area" ref={chatLogRef}>
                <ul id="chat-log">
                  {messages.map((message, index) => (
                    <li key={index} className={`${message.role}`}>
                      <span className={`avatar`}>{message.role === 'user' ? 'You' : 'AI'}</span>
                      <div className="message">{message.content}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <form onSubmit={submitForm} className="chat-message">
                <input
                  type="text"
                  placeholder="Hey Khusroo, what skills are you best at?"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  required
                />
                <button className="button black" type="submit" disabled={!messageInput.trim()}>
                  Send
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
