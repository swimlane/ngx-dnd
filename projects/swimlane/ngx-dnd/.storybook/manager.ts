import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

import logo from './sw-inline-logo-color.svg';

const theme = create({
  base: 'light', // or 'dark'
  brandTitle: 'ngx-dnd',
  brandUrl: 'https://swimlane.github.io/ngx-dnd',
  brandImage: logo,
  brandTarget: '_self' // Optional, specifies where to open the link
});

addons.setConfig({
  theme
});
