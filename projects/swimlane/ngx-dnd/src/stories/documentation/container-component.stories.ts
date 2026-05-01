import type { Meta, StoryObj } from '@storybook/angular';

import { ContainerComponentDocComponent } from './container-component-doc.component';

const meta: Meta<ContainerComponentDocComponent> = {
  title: 'Documentation/Components/ContainerComponent',
  component: ContainerComponentDocComponent
};

export default meta;

type Story = StoryObj<ContainerComponentDocComponent>;

export const Overview: Story = {};
