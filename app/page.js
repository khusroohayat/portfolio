"use client";
import { useState, useEffect, useRef } from "react";
import projects from "../data/projects.json";
import Image from "next/image";

import ServicesSection from "./ServicesSection";
import HomeProjectsFilter from "./HomeProjectsFilter";

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
    let newMessages = [...messages, { role: 'user', content: messageInput }];
    setMessages(newMessages);
    setMessageInput('');
    const apiMessage = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: newMessages })
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
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10"/>
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
                <span>a full stack developer specializing in cloud-native applications with AI integration. I leverage LLMs, modern frameworks, and vibe coding practices to build scalable solutions that solve real business problems across multiple industries</span>
              </p>
              <div className="call-to-action">
                {/* Add your call-to-action buttons or content here if needed */}
              </div>
            </div>
          </div>
          <div className="hero-yellow">
            <img src="./imgs/khusroo-hero-image.png" alt="Khusroo Hayat" width="100%" title="Khusroo Hayat" />
          </div>
        </section>
        <section id="projects" className="bento container">
          <h2>
            <small>Previous</small>
            Completed Projects
          </h2>
          <HomeProjectsFilter />
        </section>
        {/* --- Services Section --- */}
        <ServicesSection />
        {/* --- End Services Section --- */}
        <section className="chatbot container">
          <h2>
            <small>
              Talk to me
            </small>
            Chatbot
          </h2>
          <div className="chatbot-blue">
            <div className="chat-info">
              <h3>AI Chatbot</h3>
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
                <input
                  type="text"
                  placeholder="Hey Khusroo, what skills are you best at?"
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
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
