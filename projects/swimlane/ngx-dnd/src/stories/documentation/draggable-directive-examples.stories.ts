import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { NgxDnDModule } from '../../public_api';

import { EXAMPLE_STORY_LAYOUT_STYLES, exampleStoryLayoutTemplate } from '../examples/example-story-layout';

const noModelTemplate = `
<div class="ngx-dnd-container" ngxDroppable="example-two">
  <div class="ngx-dnd-item" ngxDraggable>Item 1a</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2a</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3a</div>
</div>
<div class="ngx-dnd-container" ngxDroppable="example-two">
  <div class="ngx-dnd-item" ngxDraggable>Item 1b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3b</div>
</div>
`;

const restrictedTemplate = `
<div class="ngx-dnd-container" ngxDroppable>
  <div class="ngx-dnd-item" [ngxDraggable]="['restricted-target']">Item 1a</div>
  <div class="ngx-dnd-item" [ngxDraggable]="['restricted-target']">Item 2a</div>
  <div class="ngx-dnd-item" [ngxDraggable]="['restricted-target']">Item 3a</div>
</div>
<div class="ngx-dnd-container" ngxDroppable="restricted-target">
  <div class="ngx-dnd-item" ngxDraggable>Item 1b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3b</div>
</div>
`;

const meta: Meta = {
  title: 'Documentation/Directives/draggableDirective/Examples',
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

export const NoModel: Story = {
  name: 'No model',
  render: () => ({
    props: {
      _ngxDndStorySource: noModelTemplate.trim()
    },
    template: exampleStoryLayoutTemplate(noModelTemplate),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES]
  })
};

export const Restricted: Story = {
  render: () => ({
    props: {
      _ngxDndStorySource: restrictedTemplate.trim()
    },
    template: exampleStoryLayoutTemplate(restrictedTemplate),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES]
  })
};
