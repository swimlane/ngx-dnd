import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DocspaCoreModule } from '@swimlane/docspa-core';

import { AppComponent } from './app.component';

import { config } from '../docspa.config';
import { BuilderModule } from './builder/builder.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DocspaCoreModule.forRoot(config),
    NgxDnDModule,
    FlexLayoutModule,
    BuilderModule
  ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
