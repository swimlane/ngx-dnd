import { environment } from './environments/environment';
import { CommonModule } from '@angular/common';

import { NgxDnDModule } from '@swimlane/ngx-dnd';

import { BuilderModule } from './app/builder/builder.module';
import { docspaRemarkPreset, prism, runtime, mermaid } from '@swimlane/docspa-remark-preset';
// import inlineLinks from 'remark-inline-links';

export const config = {
  name: 'ngx-dnd - Angular2+ Drag and Drop',
  basePath: 'docs/',
  homepage: 'README.md',
  notFoundPage: '_404.md',
  sideLoad: [
    '_sidebar.md',
    '_navbar.md',
    '_sidebar2.md',
    '_footer.md',
  ],
  coverpage: false,
  plugins: [
  ],
  remarkPlugins: [
    // inlineLinks,
    ...docspaRemarkPreset,
    runtime,
    prism
  ],
  runtimeModules: [
    CommonModule,
    NgxDnDModule,
    BuilderModule
  ],
  environment,
  theme: {
    '--theme-color': '#0089FF',
    '--theme-color-secondary-light': '#0074d92e',
    '--sidebar-width': '16rem',
    '--base-background-color': '#F5F7F9',
    '--sidebar-background': '#F5F7F9',
    '--cover-background-color': 'linear-gradient(to left bottom, hsl(211, 100%, 85%) 0%,hsl(169, 100%, 85%) 100%)'
  }
};


