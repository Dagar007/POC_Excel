import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodResolver } from './_resolver/food.resolver';
import { FoodComponent } from './food/food.component';
import { AgGridDemoComponent } from './ag-grid-demo/ag-grid-demo.component';


const routes: Routes = [
  {path: '', runGuardsAndResolvers:'always', component: FoodComponent, resolve: {foods: FoodResolver}},
  {path: 'ag', component:AgGridDemoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
