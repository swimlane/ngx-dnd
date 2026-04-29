import type { Meta, StoryObj } from '@storybook/angular';

import { DirectiveDocComponent } from './directive-doc.component';
import type { DirectiveDoc } from './directive-doc.types';
import dragHandleSource from './directives/dragHandleDirective.mx';

const doc = JSON.parse(dragHandleSource) as DirectiveDoc;

const meta: Meta<DirectiveDocComponent> = {
  title: 'Documentation/Directives/dragHandleDirective',
  component: DirectiveDocComponent,
  args: { doc }
};

export default meta;

type Story = StoryObj<DirectiveDocComponent>;

export const Overview: Story = {};
