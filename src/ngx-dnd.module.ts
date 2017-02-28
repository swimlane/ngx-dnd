import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { DragulaModule, DragulaDirective } from 'ng2-dragula';

import 'dragula/dist/dragula.css';

/* import {
  OrderableDirective,
  DraggableDirective
} from './directives'; */

import { ContainerComponent } from './components';

@NgModule({
  imports: [
    DragulaModule,
    BrowserModule
  ],
  declarations: [
    ContainerComponent
  ],
  exports: [
    ContainerComponent, DragulaDirective
  ]
})
export class NgxDnDModule {}
