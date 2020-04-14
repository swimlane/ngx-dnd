/* The following code is from https://github.com/ngxs/store/blob/master/tools/set-metadata.ts */

const { writeFile } = require('fs');
const { resolve } = require('path');

function getProjects() {
  const { projects } = require('../angular.json');
  return Object.keys(projects)
    .map(key => {
      const path = resolve(__dirname, '../', projects[key].root);
      return {
        ...projects[key],
        path
      };
    })
    .filter(project => project.root !== '');
}

async function main() {
  const ngxsJson = require('../package.json');
  const keysToCopy = ['version', 'repository', 'keywords', 'author', 'contributors', 'license', 'bugs', 'homepage'];

  const packages = getProjects();
  for (const pack of packages) {
    const packPath = `${pack.path}/package.json`;
    // tslint:disable-next-line: tsr-detect-non-literal-require
    const packPackage = require(packPath);

    // copy all meta data from the root package.json into all packages
    for (const key of keysToCopy) {
      packPackage[key] = ngxsJson[key];
    }

    // save the package file after we have updated the keys and peerDependencies
    await writeFile(packPath, JSON.stringify(packPackage, null, 2), err => {
      if (err) {
        console.error('Write failed!');
      }
    });
  }

  console.log(`package version set to ${ngxsJson.version}`);
}

main();
