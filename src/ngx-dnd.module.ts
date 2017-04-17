import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { DraggableDirective, DroppableDirective } from './directives';
import { ContainerComponent, ItemComponent } from './components';
import { DrakeStoreService } from './services';

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
  ],
  providers: [DrakeStoreService]
})
export class NgxDnDModule {}
