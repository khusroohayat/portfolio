'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
// ...existing code...

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const TechLogosMarquee = dynamic(() => import('./TechLogosMarquee'), {
  ssr: false,
  loading: () => <div style={{ height: 64 }} />,
});
const ServicesSection = dynamic(() => import('./ServicesSection'), {
  ssr: false,
  loading: () => <div style={{ height: 200 }} />,
});
const HomeProjectsFilter = dynamic(() => import('./HomeProjectsFilter'), {
  ssr: false,
  loading: () => <div>Loading projects…</div>,
});

// SSR enabled for SkillsSection to ensure #skills anchor is present in initial HTML
const SkillsSection = dynamic(() => import('./SkillsSection'), {
  loading: () => <div id="skills" style={{ height: 220 }} />, // SSR placeholder with id
});

export default function Home() {
  const [messageInput, setMessageInput] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState({ type: '', message: '' });
  const [isSendingContact, setIsSendingContact] = useState(false);
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

  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus({ type: '', message: '' });
    setIsSendingContact(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setContactStatus({
        type: 'success',
        message: data.message || 'Thanks! Your message was sent successfully.',
      });
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      setContactStatus({
        type: 'error',
        message: error.message || 'Unable to send your message right now. Please try again.',
      });
    } finally {
      setIsSendingContact(false);
    }
  };

  return (
    <>
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
                <a href="#contact" className="button white">
                  Contact Me
                </a>
              </div>
              <div className="social-links">
                <a href="https://github.com/khusroohayat/">
                  <Image
                    src="/imgs/github.png"
                    alt="GitHub"
                    width={48}
                    height={48}
                    title="GitHub"
                    loading="lazy"
                  />
                </a>
                <a href="https://www.linkedin.com/in/khusroosyed/">
                  <Image
                    src="/imgs/linkedin.png"
                    alt="LinkedIn"
                    width={48}
                    height={48}
                    title="LinkedIn"
                    loading="lazy"
                  />
                </a>
                {/* Add your call-to-action buttons or content here if needed */}
              </div>
            </div>
          </div>
          <div className="hero-yellow">
            {/* Optimized WebP for best LCP. */}
            <Image
              src="/imgs/webp/khusroo-hero-image.webp"
              alt="Khusroo Hayat"
              width={928}
              height={1120}
              title="Khusroo Hayat"
              priority
              sizes="(max-width: 600px) 100vw, 928px"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </section>
        <TechLogosMarquee />
        {/* SSR: Ensure #skills anchor is present for fragment navigation */}
        <section id="skills">
          <SkillsSection />
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
                  <Image
                    src="/imgs/webp/consultant.webp"
                    alt="Workplace 1 - YouTube Creator"
                    width={4241}
                    height={2829}
                    title="Consultant"
                    style={{ width: '100%', height: 'auto' }}
                    loading="lazy"
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
                  <Image
                    src="/imgs/tenpearls.png"
                    alt="Workplace 2 - Moshi Moshi Marketing"
                    width={884}
                    height={335}
                    title="10Pearls"
                    style={{ width: '100%', height: 'auto' }}
                    loading="lazy"
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
                  <Image
                    src="/imgs/shinersoft.png"
                    alt="Workplace 3 - Chamber of Commerce"
                    width={180}
                    height={180}
                    title="Shiner Soft"
                    style={{ width: '100%', height: 'auto' }}
                    loading="lazy"
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
        <section id="contact" className="contact container">
          <h2>
            <small>Get in touch</small>
            Contact
          </h2>
          <div className="contact-card">
            <p>
              Have a project in mind or want to collaborate? Send me a message and I&apos;ll get
              back to you soon.
            </p>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={contactForm.name}
                onChange={handleContactInputChange}
                required
              />

              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={contactForm.email}
                onChange={handleContactInputChange}
                required
              />

              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={contactForm.message}
                onChange={handleContactInputChange}
                rows={5}
                required
              />

              <button className="button black" type="submit" disabled={isSendingContact}>
                {isSendingContact ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {contactStatus.message ? (
              <p
                className={`contact-feedback ${contactStatus.type}`}
                role="status"
                aria-live="polite"
              >
                {contactStatus.message}
              </p>
            ) : null}
          </div>
        </section>
        <section className="chatbot container">
          <h2>
            <small>Talk to me</small>
            Chatbot
          </h2>
          <div className="chatbot-blue">
            <div className="chat-info">
              <h3>AI Chatbot</h3>
              <p>
                I&apos;ve put together a chatbot here which knows all my skills, work experience and
                has a copy of my CV/Resume. You can use it to ask questions about me to get a better
                idea of who I am and what I&apos;ve done.
              </p>
              <p>
                You can also download my resume here if you want to take a look at it. I&apos;m
                currently looking for new opportunities so if you have a project you think I&apos;d
                be a good fit for, please get in touch!
              </p>
              <a href="./khusroo-hayat-CV.pdf" className="button black" download>
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
                <button
                  className="button black chat-send-btn"
                  type="submit"
                  disabled={!messageInput.trim()}
                  aria-label="Send"
                >
                  <span
                    className="send-icon"
                    aria-hidden="true"
                    style={{ display: 'inline-block', verticalAlign: 'middle' }}
                  >
                    {/* SVG paper plane icon */}
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 11L20 2L11 20L10 13L2 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="send-text" style={{ marginLeft: '0.5em' }}>
                    Send
                  </span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
