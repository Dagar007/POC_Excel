import { Component, OnInit } from "@angular/core";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel
} from "@microsoft/signalr";
import { CustomHeader } from "./custom-header.component";
import { FoodService } from "../shared/food.service";
import { AgGridCellCustomComponent } from "../ag-grid-cell-custom/ag-grid-cell-custom.component";
import { environment } from "src/environments/environment";
import { ActivatedRoute } from "@angular/router";
import { AgDropdownRendererComponent } from "../ag-dropdown-renderer/ag-dropdown-renderer.component";

@Component({
  selector: "app-ag-grid-demo",
  templateUrl: "./ag-grid-demo.component.html",
  styleUrls: ["./ag-grid-demo.component.css"]
})
export class AgGridDemoComponent implements OnInit {
  colState
  gridApi;
  gridColumnApi;
  columnDefs;
  defaultColDef;
  editingRowIndex;
  private _hubConnection: HubConnection;
  itemId: string;
  categoriesName = {};
   categories;
   frameworkComponents;

  rowData: any;

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createConnection();

    this.route.data.subscribe(data => {
      this.categories = data["categories"];
    });
    this.route.data.subscribe(data => {
      this.rowData = data["foods"].result;
    });
    this.categories.forEach(item => {
      this.categoriesName[item.id] = item.value;
    });
    this.categoriesName[0] = "Select";

    this.columnDefs = [
      {
        headerName: "Name",
        field: "name",
       // headerComponentParams: { menuIcon: "fa-external-link-alt" },
        cellRendererFramework: AgGridCellCustomComponent
      },
      {
        headerName: "Category",
        field: "category",
        cellEditor: "agSelectCellEditor",
        cellRenderer: this.colorCellRenderer,
        //headerComponentParams: { menuIcon: "fa-cog" },

        cellEditorParams: {
          values: extractValues(this.categoriesName),
          cellRenderer: this.colorCellRenderer
        },
        valueFormatter: params => {
          return lookupValue(this.categoriesName, params.value);
        },
        valueParser: params => {
          return lookupKey(this.categoriesName, params.newValue);
        }
      },
      {
        headerName: "Ingrident 1",
        field: "ingrident1",
        cellRendererFramework: AgGridCellCustomComponent
      },
      {
        headerName: "Ingrident 2",
        field: "ingrident2",
        cellRendererFramework: AgGridCellCustomComponent
      },
      {
        headerName: "Ingrident 3",
        field: "ingrident3",
        cellRendererFramework: AgGridCellCustomComponent
      },
      {
        headerName: "Ingrident 4",
        field: "ingrident4",
        cellRendererFramework: AgGridCellCustomComponent
      },
      {
        headerName: "Ingrident 5",
        field: "ingrident5",
        cellRendererFramework: AgGridCellCustomComponent
      },
      {
        headerName: "Ingrident 6",
        field: "ingrident6",
        cellRendererFramework: AgGridCellCustomComponent
      },
      {
        headerName: "Edit Mode",
        field: "editMode"
      },
      {
        headerName: "Edit Field",
        field: "editField"
      }

      
    ];
    //this.frameworkComponents = { agColumnHeader: CustomHeader };
    this.defaultColDef = {
      sortable: true,
      headerComponentParams: { menuIcon: "fa-bars" },
      filter: true,
      resizable: true,
      editable: this.calculateEditStatus.bind(this)
    };

  }

  calculateEditStatus(params) {
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

    if (!localStorage.getItem('colstate')) {
      console.log("no columns state to restore by, you must save state first");
      return;
    }
    console.log(JSON.parse(localStorage.getItem('colstate')))
    this.gridColumnApi.setColumnState(JSON.parse(localStorage.getItem('colstate')));
    console.log("column state restored");
  }

  updateRow() {
    this.gridApi.forEachNode(function(rowNode, index) {});

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
  }
  onCellClicked($event) {
    $event.api.startEditingCell({
      rowIndex: $event.rowIndex,
      colKey: $event.column.colId
    });
  }

  onCellEditingStarted($event) {
    this.itemId = $event.data.id;
    this._hubConnection.invoke("SendEdit", {
      id: $event.data.id,
      field: $event.colDef.field,
      index: $event.rowIndex
    });
  }

  onCellEditingStoped($event) {
    this._hubConnection
      .invoke("SendUpdatedFood", {
        id: $event.data.id,
        name: $event.data.name,
        category: +$event.data.category,
        ingrident1: $event.data.ingrident1,
        ingrident2: $event.data.ingrident2,
        ingrident3: $event.data.ingrident3,
        ingrident4: $event.data.ingrident4,
        ingrident5: $event.data.ingrident5,
        ingrident6: $event.data.ingrident6,
        editMode: $event.data.editMode,
        editField: $event.data.editField,
        index: $event.rowIndex
      })
      .then(() => {
        this._hubConnection.invoke("SendEditComplete", {
          id: $event.data.id,
          field: $event.colDef.field,
          index: $event.rowIndex
        });
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
      if (node.data.id === update.id) {
        node.setDataValue("editField", update.field);
        this.gridApi.redrawRows();
      } else
      // if values have been sorted / filtered, might be proformance a hit in bigger data sets
      {
        this.gridApi.forEachNode((rowNode, index) => {
          if (rowNode.data.id === update.id) {
            rowNode.setDataValue("editField", update.field);
            this.gridApi.redrawRows();
          }
        });
      }
    });

    this._hubConnection.on("SendEditComplete", (update: any) => {
      var node = this.gridApi.getRowNode(update.index);
      if (node.data.id === update.id) {
        node.setDataValue("editField", null);
        this.gridApi.redrawRows();
      } else 
      // if values have been sorted / filtered, might be proformance a hit in bigger data sets
      {
        this.gridApi.forEachNode((rowNode, index) => {
          if (rowNode.data.id === update.id) {
            rowNode.setDataValue("editField", null);
            this.gridApi.redrawRows();
          }
        });
      }
    });

    this._hubConnection.on("RecieveUpdatedFood", (updatedFood: any) => {
      var node = this.gridApi.getRowNode(updatedFood.index);
      if (node.data.id === updatedFood.id) {
        node.setData(updatedFood);
      }else 
      // if values have been sorted / filtered, might be proformance a hit in bigger data sets
      {
        this.gridApi.forEachNode((rowNode, index) => {
          if (rowNode.data.id === updatedFood.id) {
            rowNode.setData(updatedFood);
            this.gridApi.redrawRows();
          }
        });
      }
    });
  }
  colorCellRenderer(params) {
    if (params.data.editField === params.colDef.field) {
      return (
        "<i class='fa fa-lock' aria-hidden='true'></i> </t>" +
        "<span style='color:" +
        removeSpaces(params.valueFormatted) +
        "'>" +
        params.valueFormatted +
        "</span>"
      );
    } else {
      return (
        "<span style='color:" +
        removeSpaces(params.valueFormatted) +
        "'>" +
        params.valueFormatted +
        "</span>"
      );
    }
  }

  storeState() {
    this.colState = this.gridColumnApi.getColumnState();
    localStorage.setItem('colstate',JSON.stringify(this.colState));
  

  }

  reStoreState() {
    if (!localStorage.getItem('colstate')) {
      console.log("no columns state to restore by, you must save state first");
      return;
    }
    console.log(JSON.parse(localStorage.getItem('colstate')))
    this.gridColumnApi.setColumnState(JSON.parse(localStorage.getItem('colstate')));
    console.log("column state restored");
  }

  resetState() {
    this.gridColumnApi.resetColumnState();
  }
}

function extractValues(mappings) {
  return Object.keys(mappings);
}
function lookupValue(mappings, key) {
  return mappings[key];
}
function lookupKey(mappings, name) {
  for (var key in mappings) {
    if (mappings.hasOwnProperty(key)) {
      if (name === mappings[key]) {
        return key;
      }
    }
  }
}
function removeSpaces(str) {
  return str ? str.replace(/\s/g, "") : str;
}
