import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodResolver } from './_resolver/food.resolver';
import { FoodComponent } from './food/food.component';
import { AgGridDemoComponent } from './ag-grid-demo/ag-grid-demo.component';
import { CategoryResolver } from './_resolver/category.resolver';
import { AgGridexampleComponent } from './ag-gridexample/ag-gridexample.component';
import { InGridDemoComponent } from './in-grid-demo/in-grid-demo.component';


const routes: Routes = [
  {path: '', runGuardsAndResolvers:'always', component: FoodComponent, resolve: {foods: FoodResolver}},
  {path: 'ag', component:AgGridDemoComponent,resolve: {foods: FoodResolver ,categories: CategoryResolver}},
  {path: 'given', component: AgGridexampleComponent},
  {path: 'in', component: InGridDemoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
