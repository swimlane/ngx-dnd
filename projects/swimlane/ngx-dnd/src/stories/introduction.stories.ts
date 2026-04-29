import type { Meta, StoryObj } from '@storybook/angular';

import { IntroductionDocComponent } from './introduction-doc.component';

const meta: Meta<IntroductionDocComponent> = {
  title: 'Introduction',
  component: IntroductionDocComponent
};

export default meta;

type Story = StoryObj<IntroductionDocComponent>;

export const Introduction: Story = {
  name: 'Overview'
};
