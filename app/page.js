"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [ messageInput, setMessageInput ] = useState('');
  const chatLogRef = useRef(null);

  const [messages, setMessages] = useState([
		{
			role: 'assistant',
			content: 'How can I help you learn more about Khusroo and his Resume?'
		}
  ]);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  const submitForm = async (e) => {
    e.preventDefault();
    let newMessages = [...messages, { role: 'user', content: messageInput }]
    setMessages(newMessages);
    setMessageInput('');
    const apiMessage = await fetch(
      '/api',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages })
      }
    ).then(res => res.json());
    setMessages([...newMessages, { role: 'assistant', content: apiMessage.message }]);
  }

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <header>
        <a href="#" className="logo-holder">
          <div className="logo">K</div>
          <div className="logo-text">Portfolio Website</div>
        </a>
        <nav>
          <ul id="menu" className={menuOpen ? "active" : ""}>
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
              <a href="mailto:khusroo.hayat@gmail.com" className="button">Contact Me</a>
            </li>
          </ul>
          <a href="#" className="mobile-toggle" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10"/>
            </svg>
          </a>
        </nav>
      </header>
      <main>
        <section className="hero container">
          <div className="hero-blue">
            <div>
              <h1><small>Hi I'm </small>
              Syed Khusroo Hayat
              </h1>
              <p>
              <span>a Full Stack Developer from Pakistan with over 10 years of experience in designing and developing robust web applications. I specialize in ASP.NET, Blazor, React, and Vue.js while leveraging cloud platforms like Microsoft Azure. I'm passionate about AI and have integrated tools like OpenAI into my recent projects, automating tasks and creating innovative solutions for various industries. I also enjoy sharing knowledge and collaborating on technologies like C#, JavaScript, and PHP to help others build modern web applications.</span>
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
                  <img src="./imgs/github.png" alt="GitHub" width="48" />
                </a>
                <a href="https://www.linkedin.com/in/khusroosyed/">
                  <img src="./imgs/linkedin.png" alt="LinkedIn" width="48" />
                </a>
              </div>
            </div>
          </div>
          <div className="hero-yellow">
            <img src="./imgs/khusroo-hero-image.png" alt="Khusroo Hayat" width="100%" />
          </div>
        </section>
        <section className="logos container">
          <div className="marquee">
            <div className="track">
              <img src="./imgs/html.png" alt="HTML" width="128" />
              <img src="./imgs/css.png" alt="CSS" width="128" />
              <img src="./imgs/javascript.png" alt="JS" width="128" />
              <img src="./imgs/sass.png" width="128" alt="Sass" />
              <img src="./imgs/react.png" width="128" alt="React" />
              <img src="./imgs/nextjs.png" width="128" alt="Next JS" />
              <img src="./imgs/azure.png" width="128" alt="Azure" />
              <img src="./imgs/vscode.png" width="128" alt="VS Code" />
              <img src="./imgs/python.png" width="128" alt="Python" />
              <img src="./imgs/html.png" alt="HTML" width="128" />
              <img src="./imgs/css.png" alt="CSS" width="128" />
              <img src="./imgs/javascript.png" alt="JS" width="128" />
              <img src="./imgs/sass.png" width="128" alt="Sass" />
              <img src="./imgs/react.png" width="128" alt="React" />
              <img src="./imgs/nextjs.png" width="128" alt="Next JS" />
              <img src="./imgs/azure.png" width="128" alt="Azure" />
              <img src="./imgs/vscode.png" width="128" alt="VS Code" />
              <img src="./imgs/python.png" width="128" alt="Python" />
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
            <h3>Frontend</h3>
              <ul>
                <li>Vue.js</li>
                <li>Angular.js</li>
                <li>Blazor</li>
                <li>React (Next.js)</li>
                <li>JavaScript</li>
                <li>WordPress</li>
              </ul>

              <h3>Backend</h3>
              <ul>
                <li>C#</li>
                <li>ASP.NET (Core MVC, Web API, Razor Pages)</li>
                <li>Node.js</li>
                <li>PHP</li>
              </ul>
              <h3>Databases</h3>
              <ul>
                <li>Microsoft SQL Server</li>
                <li>MySQL</li>
              </ul>
              
            </div>
            <div className="right-column">
            <h3>Tools/Technologies</h3>
              <ul>
                <li>Git</li>
                <li>Azure DevOps</li>
                <li>Microsoft Azure</li>
                <li>OpenAI</li>
                <li>Microsoft Dynamics CRM</li>
                <li>IIS</li>
                <li>Xamarin</li>
                <li>Entity Framework</li>
                <li>CSS/Bootstrap</li>
              </ul>
              <h3>Project Management</h3>
              <ul>
                <li>SCRUM</li>
                <li>Docker</li>
                <li>Agile methodologies</li>
              </ul>
            </div>
            <div className="additional-content">
            <h3>A bit about me</h3>
              <p>
              Hi, I'm Syed Khusroo Hayat, a Full Stack Developer with over 10 years of experience building web and mobile applications. I specialize in ASP.NET, Blazor, React, and Vue.js, and have a strong interest in integrating AI technologies, such as OpenAI, into my projects.
              </p>
              <p>
              Currently, I'm working on a project using Microsoft Azure AI to create a chatbot that automates eCommerce tasks and enhances user interaction. I'm also developing a portfolio website with React (Next.js) to deliver a modern and responsive design.
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
                  <img src="./imgs/consultant.jpg" alt="Workplace 1 - YouTube Creator" width="100%" />
                  <figcaption>
                  Consultant
                  </figcaption>
                </div>
              </figure>
              <h3>Consultant</h3>
              <div>2017-current</div>
              <p>Developing innovative solutions to automate eCommerce tasks, designing project management apps, and leading development in technologies like Blazor, React, and Azure for various clients.</p>
            </article>
            <article>
              <figure>
                <div>
                  <img src="./imgs/tenpearls.png" alt="Workplace 2 - Moshi Moshi Marketing" width="100%" />
                  <figcaption>
                  10Pearls
                  </figcaption>
                </div>
              </figure>
              <h3>Software Developer</h3>
              <div>2015-2017</div>
              <p>Worked on Microsoft Dynamics CRM, developed APIs, and contributed to telehealth and internal systems, implementing innovative backend and automation solutions.</p>
            </article>
            <article>
              <figure>
                <div>
                  <img src="./imgs/shinersoft.png" alt="Workplace 3 - Chamber of Commerce" width="100%" />
                  <figcaption>
                  Shiner Soft
                  </figcaption>
                </div>
              </figure>
              <h3>Software Engineer</h3>
              <div>2013-2014</div>
      <p>Developed healthcare portals and Android applications using Xamarin and ASP.NET, managing both technical and client-facing aspects of the project.</p>
            </article>
            
          </div>
        </section>
        <section id="projects" className="bento container">
          <h2>
            <small>
              Previous
            </small>
            Completed Projects
          </h2>
          <div className="bento-grid">
            <a href="#" className="bento-item">
              <img src="./imgs/prj-image-2.png" alt="BGCCI" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/prj-image-1.png" alt="Churhview" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/prj-image-3.png" alt="Harley" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/prj-image-5.png" alt="Bunbury" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/prj-image-6.png" alt="Running" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/prj-image-7.png" alt="School" width="100%" />
            </a>
          </div>
        </section>
        <section className="chatbot container">
          <h2>
            <small>
              Talk to me
            </small>
            Chatbot
          </h2>
          <div className="chatbot-blue">
            <div className="chat-info">
              <h3>Azure AI Chatbot</h3>
              <p>I've put together a chatbot here which knows all my skills, work experience and has a copy of my CV/Resume. You can use it to ask questions about me to get a better idea of who I am and what I've done.</p>
              <p>You can also download my resume here if you want to take a look at it.  I'm currently looking for new opportunities so if you have a project you think I'd be a good fit for, please get in touch!</p>
              <a href="./Sample_Resume_Template.pdf" className="button black">Download Resume</a>
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
                <input type="text" placeholder="Hey Khusroo, what skills are you best at?" value={messageInput} onChange={e => setMessageInput(e.target.value)} />
                <button className="button black">Send</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
