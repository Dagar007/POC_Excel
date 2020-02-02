import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ag-gridexample',
  templateUrl: './ag-gridexample.component.html',
  styleUrls: ['./ag-gridexample.component.css']
})
export class AgGridexampleComponent implements OnInit {

  private gridApi;
  private gridColumnApi;

  private rowData;
  private defaultColDef;
  private columnDefs;

  constructor() {
    
  }
  ngOnInit() {
    this.rowData = [
      {
        make: "tyt",
        exteriorColour: "fg",
        interiorColour: "bw",
        price: 35000
      },
      {
        make: "frd",
        exteriorColour: "bw",
        interiorColour: "cb",
        price: 32000
      },
      {
        make: "prs",
        exteriorColour: "cb",
        interiorColour: "fg",
        price: 72000
      },
      {
        make: "tyt",
        exteriorColour: "fg",
        interiorColour: "bw",
        price: 35000
      },
      {
        make: "frd",
        exteriorColour: "bw",
        interiorColour: "cb",
        price: 32000
      },
      {
        make: "prs",
        exteriorColour: "cb",
        interiorColour: "fg",
        price: 72000
      },
      {
        make: "tyt",
        exteriorColour: "fg",
        interiorColour: "bw",
        price: 35000
      },
      {
        make: "frd",
        exteriorColour: "bw",
        interiorColour: "cb",
        price: 32000
      },
      {
        make: "prs",
        exteriorColour: "cb",
        interiorColour: "fg",
        price: 72000
      },
      {
        make: "tyt",
        exteriorColour: "fg",
        interiorColour: "bw",
        price: 35000
      },
      {
        make: "frd",
        exteriorColour: "bw",
        interiorColour: "cb",
        price: 32000
      },
      {
        make: "prs",
        exteriorColour: "cb",
        interiorColour: "fg",
        price: 72000
      },
      {
        make: "tyt",
        exteriorColour: "fg",
        interiorColour: "bw",
        price: 35000
      },
      {
        make: "frd",
        exteriorColour: "bw",
        interiorColour: "cb",
        price: 32000
      },
      {
        make: "prs",
        exteriorColour: "cb",
        interiorColour: "fg",
        price: 72000
      },
      {
        make: "prs",
        exteriorColour: "cb",
        interiorColour: "fg",
        price: 72000
      },
      {
        make: "tyt",
        exteriorColour: "fg",
        interiorColour: "bw",
        price: 35000
      },
      {
        make: "frd",
        exteriorColour: "bw",
        interiorColour: "cb",
        price: 32000
      }
    ];
    this.defaultColDef = {
      filter: true,
      width: 185,
      editable: true
    };
    this.columnDefs = [
      {
        headerName: "Make",
        field: "make",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: { values: extractValues(carMappings) },
        valueFormatter: function(params) {
          return lookupValue(carMappings, params.value);
        },
        valueParser: function(params) {
          return lookupKey(carMappings, params.newValue);
        }
      },
      {
        headerName: "Exterior Colour",
        field: "exteriorColour",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: extractValues(colourMappings),
          cellRenderer: colorCellRenderer
        },
        // filter: "agSetColumnFilter",
        // filterParams: {
        //   values: extractValues(colourMappings),
        //   cellRenderer: colorCellRenderer
        // },
        valueFormatter: function(params) {
          return lookupValue(colourMappings, params.value);
        },
        valueParser: function(params) {
          return lookupKey(colourMappings, params.newValue);
        },
        cellRenderer: colorCellRenderer
      },
      {
        headerName: "Interior Colour",
        field: "interiorColour",
        cellEditor: "agTextCellEditor",
        cellEditorParams: { useFormatter: true },
        filter: "agSetColumnFilter",
        filterParams: {
          values: extractValues(colourMappings),
          cellRenderer: colorCellRenderer
        },
        valueFormatter: function(params) {
          return lookupValue(colourMappings, params.value);
        },
        valueParser: function(params) {
          return lookupKey(colourMappings, params.newValue);
        },
        cellRenderer: colorCellRenderer
      },
      {
        headerName: "Retail Price",
        field: "price",
        colId: "retailPrice",
        valueGetter: function(params) {
          return params.data.price;
        },
        valueFormatter: currencyFormatter,
        valueSetter: numberValueSetter
      },
      {
        headerName: "Retail Price (incl Taxes)",
        editable: false,
        valueGetter: function(params) {
          return params.getValue("retailPrice") * 1.2;
        },
        valueFormatter: currencyFormatter
      }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}

var carMappings = {
  tyt: "Toyota",
  frd: "Ford",
  prs: "Porsche",
  nss: "Nissan"
};
var colourMappings = {
  cb: "Cadet Blue",
  bw: "Burlywood",
  fg: "Forest Green"
};
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
function colorCellRenderer(params) {
  return "<span style='color:" + removeSpaces(params.valueFormatted) + "'>" + params.valueFormatted + "</span>";
}
function currencyFormatter(params) {
  var value = Math.floor(params.value);
  if (isNaN(value)) return "";
  return "\xA3" + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function numberValueSetter(params) {
  if (isNaN(parseFloat(params.newValue)) || !isFinite(params.newValue)) {
    return false;
  }
  params.data.price = params.newValue;
  return true;
}
function removeSpaces(str) {
  return str ? str.replace(/\s/g, "") : str;
}

