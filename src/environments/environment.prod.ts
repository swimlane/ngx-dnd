const pkg = require('../../projects/swimlane/ngx-dnd/package.json');

export const environment = {
  production: true,
  APP_VERSION: JSON.stringify(pkg.version)
};
