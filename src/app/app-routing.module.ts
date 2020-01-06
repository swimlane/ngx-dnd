import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocSPACoreComponent } from '@swimlane/docspa-core';

const routes: Routes = [
  { path: '**', component: DocSPACoreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }