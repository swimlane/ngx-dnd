import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { NgxDnDModule } from '../../public_api';

import { EXAMPLE_STORY_LAYOUT_STYLES, exampleStoryLayoutTemplate } from './example-story-layout';

/** Mirrors nested demo from src/docs/sortables.md — "Nested with Containers" */
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

const noModelTemplate = `
<div class="ngx-dnd-container" ngxDroppable>
  <div class="ngx-dnd-item" ngxDraggable>Item 1</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3</div>
</div>
`;

const dragHandleTemplate = `
<div class="ngx-dnd-container" ngxDroppable>
  <div class="ngx-dnd-item has-handle" ngxDraggable>
    <span ngxDragHandle class="ngx-dnd-drag-handle-demo" aria-label="Drag to reorder">⋮</span>
    Item 1
  </div>
  <div class="ngx-dnd-item has-handle" ngxDraggable>
    <span ngxDragHandle class="ngx-dnd-drag-handle-demo" aria-label="Drag to reorder">⋮</span>
    Item 2
  </div>
  <div class="ngx-dnd-item has-handle" ngxDraggable>
    <span ngxDragHandle class="ngx-dnd-drag-handle-demo" aria-label="Drag to reorder">⋮</span>
    Item 3
  </div>
</div>
`;

const fromArrayModelTemplate = `
<ngx-dnd-container [model]="orderableList"></ngx-dnd-container>
<pre><code>orderableList = {{ orderableList | json }}</code></pre>
`;

const nestedTemplate = `<ngx-dnd-container [model]="orderableLists"></ngx-dnd-container>`;

const nestedWithContainersTemplate = `<ngx-dnd-container [model]="nestedLists"></ngx-dnd-container>`;

const dragHandleDemoStyles = `
  .ngx-dnd-drag-handle-demo {
    display: inline-block;
    margin-right: 0.45rem;
    font-size: 1rem;
    line-height: 1;
    font-weight: 700;
    letter-spacing: -0.12em;
    user-select: none;
    vertical-align: middle;
  }
`;

const meta: Meta = {
  title: 'Examples/Sortables',
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

export const NoModel: Story = {
  name: 'No Model',
  render: () => ({
    props: {
      _ngxDndStorySource: noModelTemplate.trim()
    },
    template: exampleStoryLayoutTemplate(noModelTemplate),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES]
  })
};

export const DragHandle: Story = {
  name: 'Drag Handle',
  render: () => ({
    props: {
      _ngxDndStorySource: dragHandleTemplate.trim()
    },
    template: exampleStoryLayoutTemplate(dragHandleTemplate),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES, dragHandleDemoStyles]
  })
};

export const FromArrayModel: Story = {
  name: 'From Array model',
  render: () => ({
    props: {
      orderableList: ['Item 1', 'Item 2', 'Item 3'] as string[],
      _ngxDndStorySource: fromArrayModelTemplate.trim()
    },
    template: exampleStoryLayoutTemplate(fromArrayModelTemplate),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES]
  })
};

export const Nested: Story = {
  name: 'Nested',
  render: () => ({
    props: {
      orderableLists: [
        ['Item 1a', 'Item 2a', 'Item 3a'],
        ['Item 1b', 'Item 2b', 'Item 3b']
      ] as string[][],
      _ngxDndStorySource: nestedTemplate.trim()
    },
    template: exampleStoryLayoutTemplate(nestedTemplate),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES]
  })
};

export const NestedWithContainers: Story = {
  name: 'Nested with Containers',
  render: () => ({
    props: {
      nestedLists: nestedListsModel,
      _ngxDndStorySource: nestedWithContainersTemplate.trim()
    },
    template: exampleStoryLayoutTemplate(nestedWithContainersTemplate),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES]
  })
};
