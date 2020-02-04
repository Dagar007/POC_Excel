import { Component, ViewChild, ElementRef } from "@angular/core";
import { ILoadingOverlayComp } from "ag-grid-community";
import { FormControl } from '@angular/forms';

@Component({
  selector: "app-loading-overlay",
  templateUrl: "./custom-header.components.html", 
  styleUrls: ["./custom-header.component.css"]
 
})
export class CustomHeader {
  private params: any;

  private ascSort: string;
  private descSort: string;
  private noSort: string;

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  @ViewChild("menuButton", { static: false }) public menuButton: ElementRef;

  agInit(params): void {
    this.params = params;
    console.log(params);
    params.column.addEventListener(
      "sortChanged",
      this.onSortChanged.bind(this)
    );
    this.onSortChanged();
  }

  onMenuClicked() {
    //this.params.showColumnMenu(this.menuButton.nativeElement);
  }

  onSortChanged() {
    this.ascSort = this.descSort = this.noSort = "inactive";
    if (this.params.column.isSortAscending()) {
      this.ascSort = "active";
    } else if (this.params.column.isSortDescending()) {
      this.descSort = "active";
    } else {
      this.noSort = "active";
    }
  }

  onSortRequested(order, event) {
    this.params.setSort(order, event.shiftKey);
  }
}
