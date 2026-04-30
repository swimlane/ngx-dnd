import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxDnDModule } from '@swimlane/ngx-dnd';

import { BuilderComponent } from './builder.component';

@NgModule({
  imports: [NgxDnDModule, CommonModule, FormsModule],
  declarations: [BuilderComponent],
  exports: [BuilderComponent]
})
export class BuilderModule {}
