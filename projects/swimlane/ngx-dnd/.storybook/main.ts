import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  previewHead: head => `${head}
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous" />`,
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/angular',
    options: {}
  },
  typescript: {
    check: false,
    skipCompiler: true
  },
  webpackFinal: async webpackConfig => {
    webpackConfig.module?.rules?.push({
      test: /\.mx$/,
      type: 'asset/source'
    });
    return webpackConfig;
  }
};

export default config;
