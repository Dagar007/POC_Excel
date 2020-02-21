import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { IgxGridModule } from 'igniteui-angular';
import { PopoverModule } from 'ngx-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';

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
import { InGridDemoComponent } from './in-grid-demo/in-grid-demo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomHeader } from './ag-grid-demo/custom-header.component';
import { Food1Component } from './food1/food1.component';
import { DropComponent } from './drop/drop.component';
import { ConcurrencyManagementComponent } from './concurrency-management/concurrency-management.component';
import { ErrorInterceptorProvider } from './error.interceptor';
import { AdLayoutComponent} from './ad-layout/ad-layout.component';
import { TemplateComponent } from './template/template.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodComponent,
    AgGridDemoComponent,
    AgGridexampleComponent,
    AgGridCellCustomComponent,
    AgDropdownRendererComponent,
    ReadyExampleComponent,
    InGridDemoComponent,
    CustomHeader,
    Food1Component,
    DropComponent,
    ConcurrencyManagementComponent,
    AdLayoutComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    PopoverModule.forRoot(),
    AgGridModule.withComponents([CustomHeader]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IgxGridModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    DragDropModule
  ],
  entryComponents: [AgGridCellCustomComponent, AgDropdownRendererComponent],
  providers: [FoodResolver, CategoryResolver, ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
