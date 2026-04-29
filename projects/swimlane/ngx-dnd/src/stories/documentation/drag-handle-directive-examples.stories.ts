import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { NgxDnDModule } from '../../public_api';

import { EXAMPLE_STORY_LAYOUT_STYLES, exampleStoryLayoutTemplate } from '../examples/example-story-layout';

const verticalListTemplate = `
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
  title: 'Documentation/Directives/dragHandleDirective/Examples',
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

export const VerticalList: Story = {
  name: 'Vertical list',
  render: () => ({
    props: {
      _ngxDndStorySource: verticalListTemplate.trim()
    },
    template: exampleStoryLayoutTemplate(verticalListTemplate),
    styles: [EXAMPLE_STORY_LAYOUT_STYLES, dragHandleDemoStyles]
  })
};
