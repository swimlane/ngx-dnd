import { exec } from 'child_process';
import { resolve } from 'path';

export function getProjects(): any[] {
  const { projects } = require('../angular.json');
  return Object.keys(projects)
    .map((key) => {
      const path = resolve(__dirname, '../', projects[key].root);
      return {
        ...projects[key],
        path
      };
    })
    .filter((project) => project.root !== '');
}
