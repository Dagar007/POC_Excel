import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AllModules, Module, Grid } from "@ag-grid-enterprise/all-modules";
import * as _ from 'underscore';
import "@ag-grid-enterprise/column-tool-panel";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // var state= []
  private gridApi;
  private gridColumnApi;
  public modules: Module[] = AllModules;
  private columnDefs;
  private defaultColDef;
  private rowData: [];
  private sidebar;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        headerName: "Country",
        field: "country",
        width: 120,
        rowGroup: true,
      },
      {
        headerName: "Year",
        field: "year",
        width: 90,
        rowGroup: true
      },
      {
        headerName: "Sport",
        field: "sport",
        width: 110
      },
      {
        headerName: "Athlete",
        field: "athlete",
        width: 200,
        rowGroup: true
      },
      {
        headerName: "Gold",
        field: "gold",
        width: 100
      },
      {
        headerName: "Silver",
        field: "silver",
        width: 100
      },
      {
        headerName: "Bronze",
        field: "bronze",
        width: 100
      },
      {
        headerName: "Total",
        field: "total",
        width: 100
      },
      {
        headerName: "Age",
        field: "age",
        width: 90
      },
      {
        headerName: "Date",
        field: "date",
        width: 110
      }
    ];
    this.defaultColDef = {
      enableRowGroup: true,
      sortable: true,
      filter: true
    };
    this.sidebar = "columns";
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.loadGridState();
    this.http
      .get(
        "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
      )
      .subscribe((data: any) => {
        this.rowData = data;
      });
  }

  getMainMenuItems(params) {
    switch (params.column.getId()) {
      case "country":
        var athleteMenuItems = params.defaultItems.slice(0);
        athleteMenuItems.push({
          name: "Hide",
          action: function () {
            params.columnApi.setColumnVisible("country", false);
          }
        });

        return athleteMenuItems;
      default:
        return params.defaultItems;

    }
  }

  saveGridState() {
    var columnState = JSON.stringify(this.gridColumnApi.getColumnState());
    localStorage.setItem('myColumnState', columnState);
  }

  loadGridState() {
    var columnState = JSON.parse(localStorage.getItem('myColumnState'));
    if (columnState) {
      this.gridColumnApi.setColumnState(columnState);
    }
  }
}