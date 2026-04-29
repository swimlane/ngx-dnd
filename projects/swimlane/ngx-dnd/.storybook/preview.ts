import type { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    options: {
      storySort: (a, b) => {
        const titleA = a.title ?? '';
        const titleB = b.title ?? '';
        const root = t => t.split('/')[0] ?? '';
        const rank = t => {
          const r = root(t);
          if (r === 'Introduction') return 0;
          if (r === 'Documentation' || r === 'Examples') return 1;
          return 2;
        };
        const d = rank(titleA) - rank(titleB);
        if (d !== 0) return d;
        return titleA.localeCompare(titleB, undefined, { numeric: true });
      }
    }
  }
};

export default preview;
