import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DraggableDirective, DroppableDirective, DragHandleDirective } from './directives';
import { ContainerComponent, ItemComponent } from './components';
import { DrakeStoreService } from './services';

const components = [ContainerComponent, ItemComponent];
const directives = [DraggableDirective, DroppableDirective, DragHandleDirective];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule
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
