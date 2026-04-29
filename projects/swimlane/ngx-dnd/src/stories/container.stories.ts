import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ContainerComponent } from '../lib/components/container/container.component';
import { NgxDnDModule } from '../public_api';

const meta: Meta<ContainerComponent> = {
  title: 'ngx-dnd/Container',
  component: ContainerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NgxDnDModule.forRoot()]
    })
  ]
};

export default meta;
type Story = StoryObj<ContainerComponent>;

export const StringItems: Story = {
  args: {
    model: ['Alpha', 'Bravo', 'Charlie']
  }
};

export const NestedObjects: Story = {
  args: {
    model: [{ label: 'Task A', children: ['Sub 1', 'Sub 2'] }, { label: 'Task B' }]
  }
};
