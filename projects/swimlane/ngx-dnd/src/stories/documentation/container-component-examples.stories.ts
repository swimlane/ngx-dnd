import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { NgxDnDModule } from '../../public_api';

import { EXAMPLE_STORY_LAYOUT_STYLES, exampleStoryLayoutTemplate } from '../examples/example-story-layout';

const nestedListsModel = [
  { label: 'Item 1', children: [] },
  {
    label: 'Item 2',
    children: [
      { label: 'Item 2a', children: [] },
      { label: 'Item 2b', children: [] },
      { label: 'Item 2c', children: [] }
    ]
  },
  {
    label: 'Item 3',
    children: [
      { label: 'Item 3a', children: [] },
      { label: 'Item 3b', children: [] },
      { label: 'Item 3c', children: [] }
    ]
  }
];

const containerModelDemo = `<ngx-dnd-container [model]="model"></ngx-dnd-container>`;

const basicSource = `<ngx-dnd-container [model]="['Item 1', 'Item 2', 'Item 3']"></ngx-dnd-container>`;

const gridTemplate = `
<div class="ngx-dnd-container clearfix" ngxDroppable
     [model]="boxList" [direction]="'mixed'">
  <div class="ngx-dnd-box" ngxDraggable
       [model]="box" *ngFor="let box of boxList">
    {{ box }}
  </div>
</div>
`;

const meta: Meta = {
  title: 'Documentation/Components/ContainerComponent/Examples',
  parameters: {
    docs: {
      toc: true
    }
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, NgxDnDModule.forRoot()]
    })
  ]
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => ({
    props: {
      model: ['Item 1', 'Item 2', 'Item 3'] as string[],
      _ngxDndStorySource: basicSource.trim()
    },
    template: exampleStoryLayoutTemplate(containerModelDemo),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES]
  })
};

export const Nested: Story = {
  render: () => ({
    props: {
      model: [
        ['Item 1a', 'Item 2a', 'Item 3a'],
        ['Item 1b', 'Item 2b', 'Item 3b']
      ] as string[][],
      _ngxDndStorySource: containerModelDemo.trim()
    },
    template: exampleStoryLayoutTemplate(containerModelDemo),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES]
  })
};

export const NestedWithContainers: Story = {
  render: () => ({
    props: {
      model: nestedListsModel,
      _ngxDndStorySource: containerModelDemo.trim()
    },
    template: exampleStoryLayoutTemplate(containerModelDemo),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES]
  })
};

export const Grid: Story = {
  render: () => ({
    props: {
      boxList: Array.from({ length: 100 }, (_, i) => i + 1),
      _ngxDndStorySource: gridTemplate.trim()
    },
    template: exampleStoryLayoutTemplate(gridTemplate),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES]
  })
};
