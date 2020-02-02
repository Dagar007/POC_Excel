import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
import {AgGridModule} from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodResolver } from './_resolver/food.resolver';
import { FoodComponent } from './food/food.component';
import { AgGridDemoComponent } from './ag-grid-demo/ag-grid-demo.component';
import { AgGridexampleComponent } from './ag-gridexample/ag-gridexample.component';
import { AgGridCellCustomComponent } from './ag-grid-cell-custom/ag-grid-cell-custom.component';
import { AgDropdownRendererComponent } from './ag-dropdown-renderer/ag-dropdown-renderer.component';
import { CategoryResolver } from './_resolver/category.resolver';
import { ReadyExampleComponent } from './ready-example/ready-example.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodComponent,
    AgGridDemoComponent,
    AgGridexampleComponent,
    AgGridCellCustomComponent,
    AgDropdownRendererComponent,
    ReadyExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    AgGridModule.withComponents(),
    ReactiveFormsModule
  ],
  entryComponents: [AgGridCellCustomComponent, AgDropdownRendererComponent],
  providers: [FoodResolver, CategoryResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
