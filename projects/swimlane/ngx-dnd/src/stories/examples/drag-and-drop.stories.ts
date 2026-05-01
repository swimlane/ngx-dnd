import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { NgxDnDModule } from '../../public_api';

import { EXAMPLE_STORY_LAYOUT_STYLES, exampleStoryLayoutTemplate } from './example-story-layout';

/** Demos from src/docs/dnd.md */
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

const copyAndRemoveTemplate = `
<div class="ngx-dnd-examples-dnd-row">
  <ngx-dnd-container
    [model]="sourceItems"
    [copy]="true"
    [dropZones]="['multiple-target-a', 'multiple-target-b']">
  </ngx-dnd-container>
  <ngx-dnd-container
    [model]="targetItemsA"
    dropZone="multiple-target-a"
    [removeOnSpill]="true">
  </ngx-dnd-container>
  <ngx-dnd-container
    [model]="targetItemsB"
    dropZone="multiple-target-b"
    [removeOnSpill]="true">
  </ngx-dnd-container>
</div>
`;

const copyAndRemoveRowStyles = `
  .ngx-dnd-examples-dnd-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: flex-start;
  }
  .ngx-dnd-examples-dnd-row > ngx-dnd-container {
    min-width: 12rem;
  }
`;

const meta: Meta = {
  title: 'Examples/Drag-and-drop',
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

export const Restricted: Story = {
  name: 'Restricted',
  render: () => ({
    props: {
      _ngxDndStorySource: restrictedTemplate.trim()
    },
    template: exampleStoryLayoutTemplate(restrictedTemplate),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES]
  })
};

export const CopyAndRemoveOnSpill: Story = {
  name: 'Copy and remove on spill',
  render: () => ({
    props: {
      sourceItems: ['Item 1a', 'Item 2a', 'Item 3a'] as string[],
      targetItemsA: [] as string[],
      targetItemsB: [] as string[],
      _ngxDndStorySource: copyAndRemoveTemplate.trim()
    },
    template: exampleStoryLayoutTemplate(copyAndRemoveTemplate),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES, copyAndRemoveRowStyles]
  })
};
