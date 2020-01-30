import { Component, OnInit } from "@angular/core";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel
} from "@microsoft/signalr";
import { FoodService } from "../shared/food.service";
import { AgGridCellCustomComponent } from "../ag-grid-cell-custom/ag-grid-cell-custom.component";
import { environment } from "src/environments/environment";
import { CompileShallowModuleMetadata } from "@angular/compiler";

@Component({
  selector: "app-ag-grid-demo",
  templateUrl: "./ag-grid-demo.component.html",
  styleUrls: ["./ag-grid-demo.component.css"]
})
export class AgGridDemoComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  //private defaultColDef;
  private sortingOrder;
  private editingRowIndex;
  private _hubConnection: HubConnection;
  private itemId: string;

  columnDefs = [
    {
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Category",
      field: "category"
    },
    {
      headerName: "Ingrident 1",
      field: "ingrident1"
    },
    {
      headerName: "Ingrident 2",
      field: "ingrident2"
    },
    {
      headerName: "Ingrident 3",
      field: "ingrident3"
    },
    {
      headerName: "Ingrident 4",
      field: "ingrident4"
    },
    {
      headerName: "Ingrident 5",
      field: "ingrident5"
    },
    {
      headerName: "Ingrident 6",
      field: "ingrident6",
      sortable: true,
      filter: true
    },
    {
      headerName: "Edit Mode",
      field: "editMode",
      hidden: true
    },
    {
      headerName: "Edit Field",
      field: "editField",
      hidden: true
    }
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    editable: this.calculateEditStatus.bind(this),
    cellRendererFramework: AgGridCellCustomComponent
  };
  
  rowData: any;

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.createConnection();
  }

  calculateEditStatus(params) {
     console.log(params);
    if (params.data.editField !== params.colDef.field) {
      return true;
    } else {
      return false;
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    this.gridColumnApi.setColumnVisible("editMode", false);
    this.gridColumnApi.setColumnVisible("editField", false);
    
    this.foodService.foodList().subscribe((data: any) => {
      this.rowData = data.result;
    });
  }

  updateRow() {
    this.gridApi.forEachNode(function(rowNode, index) {
      if (rowNode.data.id === "e4760870-7b3f-4600-bbbb-8ed58f3ba829")
        console.log(rowNode);
    });

    var rowNode = this.gridApi.getRowNode(1);
    rowNode.setData({
      name: "deepak",
      category: 1,
      ingrident1: "ingrident1"
    });
  }

  updateCell() {
    var rowNode = this.gridApi.getRowNode(1);
    rowNode.setDataValue("ingrident5", "IN5");
    // rowNode.setDataValue({
    //   ingrident5: "In5"
    // });
  }
  updateAllRow() {
    this.foodService.foodList().subscribe(data => {
      this.gridApi.setRowData([]);
      var newData = data.result;

      this.gridApi.updateRowData({ add: newData });
    });
  }

  onBtWhich() {
    var cellDefs = this.gridApi.getEditingCells();
    if (cellDefs.length > 0) {
      var cellDef = cellDefs[0];
      console.log(
        "editing cell is: row = " +
          cellDef.rowIndex +
          ", col = " +
          cellDef.column.getId() +
          ", floating = " +
          cellDef.rowPinned
      );
    } else {
      console.log("no cells are editing");
    }
  }
  onCellClicked($event) {
    // check whether the current row is already opened in edit or not
    // console.log(this.editingRowIndex  )
    // console.log($event.rowIndex)
    // if(this.editingRowIndex != $event.rowIndex) {
    // console.log('clicked event');
    // console.log( $event);
    $event.api.startEditingCell({
      rowIndex: $event.rowIndex,
      colKey: $event.column.colId
    });
    // this.editingRowIndex = $event.rowIndex;
    //}
  }

  onCellEditingStarted($event) {
    console.log($event);
    console.log($event.colDef.field);
    this.itemId = $event.data.id;
    this._hubConnection.invoke("SendEdit", {
      id: $event.data.id,
      field: $event.colDef.field,
      index: $event.rowIndex
    });
  }

  onCellEditingStoped($event) {
    this._hubConnection.invoke("SendEditComplete", {
      id: this.itemId,
      field: $event.value,
      index: $event.rowIndex
    });
  }

  clear() {
    this.gridApi.setRowData([]);
  }

  createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(environment.baseUrl + "agedit")
      .build();
    this._hubConnection
      .start()
      .then(() => {})
      .catch(err => console.log(err));

    this._hubConnection.on("ReceiveEdit", (update: any) => {
      var node = this.gridApi.getRowNode(update.index);
      console.log(update);
      console.log(node);
      if (node.data.id === update.id) {
        node.setDataValue("editField", update.field);

        // node.setData({
        //   ...node.data,
        //   editField: update.field
        // });
      }
    });

    this._hubConnection.on("SendEditComplete", (update: any) => {
      //console.log(update );
      var node = this.gridApi.getRowNode(update.index);
      console.log(node);
      if (node.data.id === update.id) {
        node.setDataValue("editField", null);
        console.log("here also");
        // node.setData({
        //   ...node.data,
        //   editField: null
        // });
      }
    });
  }
}
