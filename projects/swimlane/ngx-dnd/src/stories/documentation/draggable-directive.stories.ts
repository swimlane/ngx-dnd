import type { Meta, StoryObj } from '@storybook/angular';

import { DirectiveDocComponent } from './directive-doc.component';
import type { DirectiveDoc } from './directive-doc.types';
import draggableSource from './directives/draggableDirective.mx';

const doc = JSON.parse(draggableSource) as DirectiveDoc;

const meta: Meta<DirectiveDocComponent> = {
  title: 'Documentation/Directives/draggableDirective',
  component: DirectiveDocComponent,
  args: { doc }
};

export default meta;

type Story = StoryObj<DirectiveDocComponent>;

export const Overview: Story = {};
