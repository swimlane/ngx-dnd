import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { BuilderModule } from '../builder-demo/builder.module';

import { NgxDnDModule } from '../../public_api';

import { EXAMPLE_STORY_LAYOUT_STYLES, exampleStoryLayoutTemplate } from './example-story-layout';

/** Builder demo module lives alongside Storybook (vendored from the legacy demo app). */
const builderDemoTemplate = `<app-builder></app-builder>`;

const meta: Meta = {
  title: 'Examples/Builder Demo',
  parameters: {
    docs: {
      toc: true
    }
  },
  decorators: [
    moduleMetadata({
      imports: [NgxDnDModule.forRoot(), BuilderModule]
    })
  ]
};

export default meta;

type Story = StoryObj;

export const BuilderDemo: Story = {
  name: 'Builder demo',
  render: () => ({
    props: {
      _ngxDndStorySource: builderDemoTemplate.trim()
    },
    template: exampleStoryLayoutTemplate(builderDemoTemplate),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES]
  })
};
