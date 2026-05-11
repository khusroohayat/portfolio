'use client';

import React, { useRef, useState } from 'react';
import skillsData from '../data/skills.json';
import styles from './skills/skills.module.css';

const { eyebrow, title, description, categories } = skillsData;

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const tabRefs = useRef([]);

  const activeIndex = categories.findIndex((category) => category.id === activeCategory);
  const activeCategoryData = categories[activeIndex];

  const handleCategoryKeyDown = (event, index) => {
    let targetIndex = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      targetIndex = (index + 1) % categories.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      targetIndex = (index - 1 + categories.length) % categories.length;
    } else if (event.key === 'Home') {
      targetIndex = 0;
    } else if (event.key === 'End') {
      targetIndex = categories.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextCategory = categories[targetIndex];
    setActiveCategory(nextCategory.id);
    tabRefs.current[targetIndex]?.focus();
  };

  return (
    <section id="skills" className={`container ${styles.section}`} aria-labelledby="skills-title">
      <div className={styles.noiseLayer} aria-hidden="true" />
      <header className={styles.header}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id="skills-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.description}>{description}</p>
      </header>

      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Skills categories"
        data-testid="skills-categories"
      >
        {categories.map((category, index) => {
          const isSelected = category.id === activeCategory;
          return (
            <button
              key={category.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              className={`${styles.tab} ${isSelected ? styles.tabActive : ''}`}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`skills-panel-${category.id}`}
              id={`skills-tab-${category.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveCategory(category.id)}
              onKeyDown={(event) => handleCategoryKeyDown(event, index)}
            >
              {category.title}
            </button>
          );
        })}
      </div>

      <article
        className={styles.panel}
        role="tabpanel"
        id={`skills-panel-${activeCategoryData.id}`}
        aria-labelledby={`skills-tab-${activeCategoryData.id}`}
      >
        <h3 className={styles.panelTitle}>{activeCategoryData.title}</h3>
        <p className={styles.panelSummary}>{activeCategoryData.summary}</p>
        <ul className={styles.skillList}>
          {activeCategoryData.skills.map((skill) => (
            <li key={skill} className={styles.skillItem}>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
