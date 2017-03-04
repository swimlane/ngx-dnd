import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import 'dragula/dist/dragula.css';

import { DraggableDirective, DroppableDirective } from './directives';
import { ContainerComponent, ItemComponent } from './components';

const components = [ContainerComponent, ItemComponent];
const directives = [DraggableDirective, DroppableDirective];

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    ...components,
    ...directives
  ],
  exports: [
    ...components,
    ...directives
  ]
})
export class NgxDnDModule {}
