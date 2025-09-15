import {
  extractUniqueTechnologies,
  filterProjectsByTech,
  validateProjectData,
  formatProjectTitle,
  getProjectStats,
} from '../projectUtils';

describe('projectUtils', () => {
  const mockProjects = [
    {
      slug: 'project-1',
      title: 'Project One',
      description: 'First project description',
      tech: ['React', 'JavaScript', 'CSS'],
    },
    {
      slug: 'project-2',
      title: 'Project Two',
      description: 'Second project description',
      tech: ['Vue.js', 'JavaScript', 'HTML'],
    },
    {
      slug: 'project-3',
      title: 'Project Three',
      description: 'Third project description',
      tech: ['React', 'Node.js', 'MongoDB'],
    },
  ];

  describe('extractUniqueTechnologies', () => {
    it('should extract unique technologies from projects array', () => {
      const result = extractUniqueTechnologies(mockProjects);
      expect(result).toEqual([
        'CSS',
        'HTML',
        'JavaScript',
        'MongoDB',
        'Node.js',
        'React',
        'Vue.js',
      ]);
    });

    it('should return empty array for invalid input', () => {
      expect(extractUniqueTechnologies(null)).toEqual([]);
      expect(extractUniqueTechnologies(undefined)).toEqual([]);
      expect(extractUniqueTechnologies('invalid')).toEqual([]);
      expect(extractUniqueTechnologies({})).toEqual([]);
    });

    it('should handle projects with missing tech arrays', () => {
      const projectsWithMissingTech = [
        { slug: 'project-1', title: 'Project One', tech: ['React'] },
        { slug: 'project-2', title: 'Project Two', tech: null },
        { slug: 'project-3', title: 'Project Three', tech: undefined },
      ];
      const result = extractUniqueTechnologies(projectsWithMissingTech);
      expect(result).toEqual(['React']);
    });

    it('should handle empty projects array', () => {
      expect(extractUniqueTechnologies([])).toEqual([]);
    });
  });

  describe('filterProjectsByTech', () => {
    it('should filter projects by technology', () => {
      const result = filterProjectsByTech(mockProjects, 'React');
      expect(result).toHaveLength(2);
      expect(result[0].slug).toBe('project-1');
      expect(result[1].slug).toBe('project-3');
    });

    it('should return all projects when technology is empty', () => {
      const result = filterProjectsByTech(mockProjects, '');
      expect(result).toEqual(mockProjects);
    });

    it('should return all projects when technology is null or undefined', () => {
      expect(filterProjectsByTech(mockProjects, null)).toEqual(mockProjects);
      expect(filterProjectsByTech(mockProjects, undefined)).toEqual(mockProjects);
    });

    it('should return empty array for invalid projects input', () => {
      expect(filterProjectsByTech(null, 'React')).toEqual([]);
      expect(filterProjectsByTech(undefined, 'React')).toEqual([]);
      expect(filterProjectsByTech('invalid', 'React')).toEqual([]);
    });

    it('should handle case-sensitive filtering', () => {
      const result = filterProjectsByTech(mockProjects, 'react');
      expect(result).toHaveLength(0);
    });

    it('should return empty array when no projects match technology', () => {
      const result = filterProjectsByTech(mockProjects, 'Angular');
      expect(result).toHaveLength(0);
    });
  });

  describe('validateProjectData', () => {
    it('should validate correct project data', () => {
      const validProject = {
        slug: 'test-project',
        title: 'Test Project',
        description: 'Test description',
      };
      expect(validateProjectData(validProject)).toBe(true);
    });

    it('should reject project with missing required fields', () => {
      expect(validateProjectData({})).toBe(false);
      expect(validateProjectData({ slug: 'test' })).toBe(false);
      expect(validateProjectData({ slug: 'test', title: 'Test' })).toBe(false);
    });

    it('should reject project with empty string fields', () => {
      const invalidProject = {
        slug: '',
        title: 'Test',
        description: 'Test description',
      };
      expect(validateProjectData(invalidProject)).toBe(false);
    });

    it('should reject project with whitespace-only fields', () => {
      const invalidProject = {
        slug: '   ',
        title: 'Test',
        description: 'Test description',
      };
      expect(validateProjectData(invalidProject)).toBe(false);
    });

    it('should reject invalid input types', () => {
      expect(validateProjectData(null)).toBe(false);
      expect(validateProjectData(undefined)).toBe(false);
      expect(validateProjectData('string')).toBe(false);
      expect(validateProjectData([])).toBe(false);
    });
  });

  describe('formatProjectTitle', () => {
    it('should format normal project title', () => {
      expect(formatProjectTitle('My Awesome Project')).toBe('My Awesome Project');
    });

    it('should trim whitespace from title', () => {
      expect(formatProjectTitle('  My Project  ')).toBe('My Project');
    });

    it('should collapse multiple spaces into single space', () => {
      expect(formatProjectTitle('My    Project    Title')).toBe('My Project Title');
    });

    it('should handle empty and invalid inputs', () => {
      expect(formatProjectTitle('')).toBe('');
      expect(formatProjectTitle(null)).toBe('');
      expect(formatProjectTitle(undefined)).toBe('');
      expect(formatProjectTitle(123)).toBe('');
    });
  });

  describe('getProjectStats', () => {
    it('should calculate correct project statistics', () => {
      const result = getProjectStats(mockProjects);
      expect(result).toEqual({
        total: 3,
        technologies: 7, // CSS, HTML, JavaScript, MongoDB, Node.js, React, Vue.js
        averageTechPerProject: 3, // 9 total techs / 3 projects = 3
      });
    });

    it('should handle empty projects array', () => {
      const result = getProjectStats([]);
      expect(result).toEqual({
        total: 0,
        technologies: 0,
        averageTechPerProject: 0,
      });
    });

    it('should handle invalid input', () => {
      expect(getProjectStats(null)).toEqual({
        total: 0,
        technologies: 0,
        averageTechPerProject: 0,
      });
      expect(getProjectStats(undefined)).toEqual({
        total: 0,
        technologies: 0,
        averageTechPerProject: 0,
      });
    });

    it('should handle projects with missing tech arrays', () => {
      const projectsWithMissingTech = [
        { slug: 'project-1', title: 'Project One', tech: ['React', 'JavaScript'] },
        { slug: 'project-2', title: 'Project Two' }, // missing tech
        { slug: 'project-3', title: 'Project Three', tech: ['Vue.js'] },
      ];
      const result = getProjectStats(projectsWithMissingTech);
      expect(result).toEqual({
        total: 3,
        technologies: 3, // React, JavaScript, Vue.js
        averageTechPerProject: 1, // 3 total techs / 3 projects = 1
      });
    });
  });
});
