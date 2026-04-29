import type { Meta, StoryObj } from '@storybook/angular';

import { DirectiveDocComponent } from './directive-doc.component';
import type { DirectiveDoc } from './directive-doc.types';
import droppableSource from './directives/droppableDirective.mx';

const doc = JSON.parse(droppableSource) as DirectiveDoc;

const meta: Meta<DirectiveDocComponent> = {
  title: 'Documentation/Directives/droppableDirective',
  component: DirectiveDocComponent,
  args: { doc }
};

export default meta;

type Story = StoryObj<DirectiveDocComponent>;

export const Overview: Story = {};
