import {AfterViewInit, Component, ViewChild, ViewContainerRef} from "@angular/core";
import { ICellEditorAngularComp, ICellRendererAngularComp } from 'ag-grid-angular';


@Component({
  selector: 'app-ag-dropdown-renderer',
  templateUrl: './ag-dropdown-renderer.component.html',
  styleUrls: ['./ag-dropdown-renderer.component.css']
})
export class AgDropdownRendererComponent implements ICellRendererAngularComp {
  refresh(params: any): boolean {
    return true
  }
  afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
    throw new Error("Method not implemented.");
  }
  private params: any;
  public value: number;
  public values;
  private options: any;




  agInit(params: any): void {
      this.params = params;
      this.value = this.params.value;
      this.options = params.options;
      this.values = params.colDef.cellEditorParams.values


       console.log(params);
       console.log(this.values);

  }



}
