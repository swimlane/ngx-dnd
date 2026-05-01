import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { NgxDnDModule } from '../public_api';

import { EXAMPLE_STORY_LAYOUT_STYLES, exampleStoryLayoutTemplate } from './examples/example-story-layout';

const stringItemsDemo = `<ngx-dnd-container [model]="model"></ngx-dnd-container>`;

const stringItemsSource = `<ngx-dnd-container [model]="['Alpha', 'Bravo', 'Charlie']"></ngx-dnd-container>`;

const nestedObjectsDemo = `<ngx-dnd-container [model]="model"></ngx-dnd-container>`;

const nestedExampleModel = [{ label: 'Task A', children: ['Sub 1', 'Sub 2'] }, { label: 'Task B' }];

const meta: Meta = {
  title: 'Examples/Container',
  parameters: {
    docs: {
      toc: true
    }
  },
  decorators: [
    moduleMetadata({
      imports: [NgxDnDModule.forRoot()]
    })
  ]
};

export default meta;

type Story = StoryObj;

export const StringItems: Story = {
  render: () => ({
    props: {
      model: ['Alpha', 'Bravo', 'Charlie'] as string[],
      _ngxDndStorySource: stringItemsSource.trim()
    },
    template: exampleStoryLayoutTemplate(stringItemsDemo),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES]
  })
};

export const NestedObjects: Story = {
  render: () => ({
    props: {
      model: nestedExampleModel,
      _ngxDndStorySource: nestedObjectsDemo.trim()
    },
    template: exampleStoryLayoutTemplate(nestedObjectsDemo),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES]
  })
};
