import type { Meta, StoryObj } from '@storybook/angular';

import { ItemComponentDocComponent } from './item-component-doc.component';

const meta: Meta<ItemComponentDocComponent> = {
  title: 'Documentation/Components/ItemComponent',
  component: ItemComponentDocComponent
};

export default meta;

type Story = StoryObj<ItemComponentDocComponent>;

export const Overview: Story = {};
