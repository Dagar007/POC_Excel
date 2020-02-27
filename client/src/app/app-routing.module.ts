import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AGGridComponent } from './ag-grid/ag-grid.component';


const routes: Routes = [
  { path: 'demo', component:AGGridComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
