'use client';
import React, { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMenuOpen((open) => !open);
  return (
    <header>
      <a href="/" className="logo-holder">
        <div className="logo">K</div>
        <div className="logo-text">Portfolio Website</div>
      </a>
      <nav>
        <ul id="menu" className={menuOpen ? 'active' : ''}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/#skills">Skills</a>
          </li>
          <li>
            <a href="/projects">Projects</a>
          </li>
          <li>
            <a href="mailto:khusroo.hayat@gmail.com" className="button">
              Contact Me
            </a>
          </li>
        </ul>
        <a
          href="#"
          className="mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
        >
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
  );
}
