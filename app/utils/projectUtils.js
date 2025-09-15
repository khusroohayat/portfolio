/**
 * Utility functions for project data processing and filtering
 */

/**
 * Extracts all unique technologies from a list of projects
 * @param {Array} projects - Array of project objects
 * @returns {Array} Sorted array of unique technologies
 */
export const extractUniqueTechnologies = (projects) => {
  if (!Array.isArray(projects)) {
    return [];
  }

  const technologies = projects.flatMap((project) => project.tech || []);
  return [...new Set(technologies)].sort();
};

/**
 * Filters projects by technology
 * @param {Array} projects - Array of project objects
 * @param {string} technology - Technology to filter by
 * @returns {Array} Filtered array of projects
 */
export const filterProjectsByTech = (projects, technology) => {
  if (!Array.isArray(projects)) {
    return [];
  }

  if (!technology || technology.trim() === '') {
    return projects;
  }

  return projects.filter((project) => project.tech && project.tech.includes(technology));
};

/**
 * Validates project data structure
 * @param {Object} project - Project object to validate
 * @returns {boolean} True if project has required fields
 */
export const validateProjectData = (project) => {
  if (!project || typeof project !== 'object') {
    return false;
  }

  const requiredFields = ['slug', 'title', 'description'];
  return requiredFields.every(
    (field) => project[field] && typeof project[field] === 'string' && project[field].trim() !== ''
  );
};

/**
 * Formats project title for display
 * @param {string} title - Raw project title
 * @returns {string} Formatted title
 */
export const formatProjectTitle = (title) => {
  if (!title || typeof title !== 'string') {
    return '';
  }

  return title.trim().replace(/\s+/g, ' ');
};

/**
 * Gets project statistics
 * @param {Array} projects - Array of project objects
 * @returns {Object} Statistics object
 */
export const getProjectStats = (projects) => {
  if (!Array.isArray(projects)) {
    return { total: 0, technologies: 0, averageTechPerProject: 0 };
  }

  const totalProjects = projects.length;
  const uniqueTechnologies = extractUniqueTechnologies(projects);
  const totalTechs = projects.reduce((sum, project) => sum + (project.tech?.length || 0), 0);
  const averageTechPerProject = totalProjects > 0 ? totalTechs / totalProjects : 0;

  return {
    total: totalProjects,
    technologies: uniqueTechnologies.length,
    averageTechPerProject: Math.round(averageTechPerProject * 100) / 100,
  };
};
