import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: "app-ag-grid-cell-custom",
  templateUrl: "./ag-grid-cell-custom.component.html",
  styleUrls: ["./ag-grid-cell-custom.component.css"]
})
export class AgGridCellCustomComponent implements OnInit, ICellRendererAngularComp {
  refresh(params: any): boolean {
    this.params = params;
    this.cellValue = params.value;
    return true;
  }
  
  constructor() {}

  cellValue: any;
  params: any;

  agInit(params) {
    this.params = params;
    this.cellValue = params.value;
  }

  ngOnInit() {}
}
