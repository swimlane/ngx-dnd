import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { FormsModule } from '@angular/forms';

import { BuilderComponent } from './builder.component';

@NgModule({
  imports: [
    NgxDnDModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    BuilderComponent
  ],
  exports: [
    BuilderComponent,
  ]
})
export class BuilderModule {
}
