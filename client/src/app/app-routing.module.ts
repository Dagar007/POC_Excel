import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodResolver } from './_resolver/food.resolver';
import { FoodComponent } from './food/food.component';
import { AgGridDemoComponent } from './ag-grid-demo/ag-grid-demo.component';
import { CategoryResolver } from './_resolver/category.resolver';
import { AgGridexampleComponent } from './ag-gridexample/ag-gridexample.component';
import { InGridDemoComponent } from './in-grid-demo/in-grid-demo.component';
import { Food1Component } from './food1/food1.component';
import { DropComponent } from './drop/drop.component';
import { ConcurrencyManagementComponent } from './concurrency-management/concurrency-management.component';
import { AdLayoutComponent } from './ad-layout/ad-layout.component';
import { TemplateComponent } from './template/template.component';


const routes: Routes = [
  {path: '', runGuardsAndResolvers:'always', component: FoodComponent, resolve: {foods: FoodResolver}},
  {path: 'ag', component:AgGridDemoComponent,resolve: {foods: FoodResolver ,categories: CategoryResolver}},
  {path: 'given', component: AgGridexampleComponent},
  {path: 'drop', component: DropComponent},
  {path: 'food',runGuardsAndResolvers:'always', component: Food1Component,resolve: {foods: FoodResolver}},
  {path : 'concurrencyCheck', component : ConcurrencyManagementComponent},
  {path : 'adlayout', component : AdLayoutComponent},
  {path: 'adlayout/template/:id', component : TemplateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
