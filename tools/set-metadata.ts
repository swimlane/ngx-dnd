/* The following code is from https://github.com/ngxs/store/blob/master/tools/set-metadata.ts */

import { writeFile } from 'fs';
import { getProjects } from './utils';

async function main() {
  const ngxsJson = require('../package.json');
  const keysToCopy = ['version', 'repository', 'keywords', 'author', 'contributors', 'license', 'bugs', 'homepage'];

  const packages = getProjects();
  for (const pack of packages) {
    const packPath = `${pack.path}/package.json`;
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
