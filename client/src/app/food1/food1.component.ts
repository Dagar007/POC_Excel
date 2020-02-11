import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";
import { FoodService } from "../shared/food.service";
import { v4 as uuid } from "uuid";
import { environment } from "src/environments/environment";
import { IDropdownSettings  } from 'ng-multiselect-dropdown';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel
} from "@microsoft/signalr";
import { Pagination, PaginatedResult } from "../model/pagination";
import { ActivatedRoute } from "@angular/router";
import { Food } from "../model/food";
import { FilterParams } from '../model/filter';




@Component({
  selector: "app-food1",
  templateUrl: "./food1.component.html",
  styleUrls: ["./food1.component.css"]
})
export class Food1Component implements OnInit {
  foodForm: FormArray = this.fb.array([]);
  reference: FormArray = this.fb.array([]);
  notification = null;
  editingId;
  categories = [];
  pagination: Pagination;
  
  filterParams: FilterParams[] = [];

  userParams: any = {};

  nameSort = "";
  nameFilter = "";
  showmutilselectdropdown= false
 
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  private _hubConnection: HubConnection;

  private enteredValue;
  private outValue;

  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.foodService.getCategories().subscribe(catgories => {
      this.categories = catgories as [];
    });

    this.dropdownSettings  = {
      singleSelection: false,
      idField: 'id',
      textField: 'item',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.createConnection();
    this.foodList();

    this.userParams.category = 0;
    this.userParams.nameStartsWith = "";
    this.userParams.orderBy = "name";
  }

  onFilterClick(field: string) {
    this.showmutilselectdropdown = !this.showmutilselectdropdown;
    if(this.showmutilselectdropdown && this.dropdownList.length === 0) {
      //console.log('fetching filter')
      this.foodService.getFilterDropdown(field).subscribe((data: any) => {
        //console.log(data);
        this.dropdownList = data;
        if(this.selectedItems.length == 0)
        {
          this.selectedItems = data
        }
      })
    }
    
  }
  onItemSelect(item: any) {
    this.filterParams.push(item);
    console.log(this.filterParams);
  }
  onSelectAll(items: any) {
    //console.log(items);
  }
  onItemDeSelect(item: any) {
    this.filterParams = this.selectedItems;
    var index = this.filterParams.indexOf(item);
    if(index> -1)
    {
      this.filterParams.splice(index, 1)
    }
    console.log(this.filterParams);
  }
  resetFilters() {
    this.userParams.category = 0;
    this.userParams.nameStartsWith = "";
    this.userParams.orderBy = "name";
    this.loadFood();
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadFood();
  }

  loadFood() {
    this.foodForm.clear();
    this.foodService
      .foodList(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userParams
      )
      .subscribe((res: PaginatedResult<Food[]>) => {
        this.pagination = res.pagination;
        (res.result as []).forEach((food: any) => {
          this.foodForm.push(
            this.fb.group({
              id: [food.id],

              name: [food.name, Validators.required],
              category: [food.category, Validators.required],
              ingrident1: [food.ingrident1, Validators.required],
              ingrident2: [food.ingrident2],
              ingrident3: [food.ingrident3],
              ingrident4: [food.ingrident4],
              ingrident5: [food.ingrident5],
              ingrident6: [food.ingrident6],
              editMode: [food.editMode],
              message: [""]
            })
          );
        });
      });
  }

  foodList() {
    this.foodForm.clear();
    this.route.data.subscribe(data => {
      if (data["foods"].result == []) {
        this.addFood();
      } else {
        this.pagination = data["foods"].pagination;
        (data["foods"].result as []).forEach((food: any) => {
          this.foodForm.push(
            this.fb.group({
              id: [food.id],
              name: [food.name, Validators.required],
              category: [food.category, Validators.required],
              ingrident1: [food.ingrident1, Validators.required],
              ingrident2: [food.ingrident2],
              ingrident3: [food.ingrident3],
              ingrident4: [food.ingrident4],
              ingrident5: [food.ingrident5],
              ingrident6: [food.ingrident6],
              editMode: [food.editMode],
              message: [""]
            })
          );
        });
      }
    });
  }

  addFood() {
    this.foodForm.push(
      this.fb.group({
        id: [""],
        name: [""],
        category: [0],
        ingrident1: ["", Validators.required],
        ingrident2: [""],
        ingrident3: [""],
        ingrident4: [""],
        ingrident5: [""],
        ingrident6: [""],
        editMode: [false],
        message: [""]
      })
    );
  }

  recordSubmit(fg: FormGroup) {
    if (fg.value.id == "") {
      fg.patchValue({ id: uuid() });
      fg.patchValue({ category: +fg.value.category });
      fg.disable();

      this._hubConnection.invoke("SendAdd", fg.value);
      this.showNotification("insert");
    } else if (!fg.value.editMode) {
      this._hubConnection!.invoke("AddToGroup", fg.value.id);
      this._hubConnection.invoke("SendEdit", { id: fg.value.id });
      this.foodForm.controls.forEach(item => {
        if (item.value.id === fg.value.id) {
          item.enable();
        }
      });
      fg.patchValue({ editMode: !fg.value.editMode });
    } else {
      console.log(fg.value);
      console.log(fg.value.category);
      this._hubConnection
        .invoke("SendUpdatedFood", {
          id: fg.value.id,
          name: fg.value.name,
          category: fg.value.category,
          ingrident1: fg.value.ingrident1,
          ingrident2: fg.value.ingrident2,
          ingrident3: fg.value.ingrident3,
          ingrident4: fg.value.ingrident4,
          ingrident5: fg.value.ingrident5,
          ingrident6: fg.value.ingrident6
        })

        .then(() => {
          this._hubConnection.invoke("SendEditComplete", { id: fg.value.id });
          // this.foodForm.controls.forEach(item => {
          //   if (item.value.id === fg.value.id) {
          //     item.disable();
          //   }
          // });
          fg.patchValue({ editMode: !fg.value.editMode });
          fg.patchValue({ message: "" });
          this.showNotification("update");
        });
      // this.foodService.putFood(fg.value.id, fg.value).subscribe(() => {

      // });
    }
  }

  onDelete(id, index) {
    if (id == "") {
      this.foodForm.removeAt(index);
    } else {
      this._hubConnection.invoke("SendDelete", id);
      this.foodForm.removeAt(index);
      this.showNotification("delete");
    }
  }
  showNotification(catgory) {
    switch (catgory) {
      case "insert":
        this.notification = { class: "text-success", message: "saved" };
        break;
      case "update":
        this.notification = { class: "text-primary", message: "updated!" };
        break;
      case "delete":
        this.notification = { class: "text-danger", message: "deleted!" };
        break;

      default:
        break;
    }
    setTimeout(() => {
      this.notification = null;
    }, 3000);
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
      this.foodForm.controls.forEach(element => {
        if (element.value.id === update.id) {
          element.get(update.field).disable();
        }
      });
    });

    this._hubConnection.on("ReceiveEditComplete", (update: any) => {
      this.foodForm.controls.forEach(element => {
        if (element.value.id === update.id) {
          element.get(update.field).enable();
        }
      });
    });

    this._hubConnection.on("ReceiveAdd", (food: any) => {
      this.foodForm.push(
        this.fb.group({
          id: [food.id],
          name: [food.name, Validators.required],
          category: [food.category, Validators.required],
          ingrident1: [food.ingrident1, Validators.required],
          ingrident2: [food.ingrident2],
          ingrident3: [food.ingrident3],
          ingrident4: [food.ingrident4],
          ingrident5: [food.ingrident5],
          ingrident6: [food.ingrident6],
          editMode: [food.editMode],
          message: [""]
        })
      );
    });

    this._hubConnection.on("ReceiveDelete", () => {
      this.foodList();
    });

    this._hubConnection.on("RecieveUpdatedFood", (updatedFood: any) => {
      console.log(updatedFood);
      this.foodForm.controls.forEach(element => {
        if (element.value.id === updatedFood.id) {
          console.log("RecieveUpdatedFood");
          element.patchValue({ ingrident1: updatedFood.ingrident1 })
        }
      });
    });
  }

  stopHubConnection() {
    if (this._hubConnection) {
      this._hubConnection.invoke("RemoveFromGroup", this.editingId).then(() => {
        this._hubConnection.stop();
      });
    }
  }

  ngOnDestroy(): void {
    this.stopHubConnection();
  }

  headerClicked(field: string) {
    switch (field) {
      case "name":
        if (this.nameSort === "") {
          this.nameSort = "asc";
          this.userParams.orderBy = "name";
          this.loadFood();
        } else if (this.nameSort === "asc") {
          this.nameSort = "desc";
          this.loadFood();
          this.userParams.orderBy = "name";
        } else if (this.nameSort === "desc") {
          this.nameSort = "";
        }

        break;
      default:
        console.log("name deosnot match");
        break;
    }
  }

  onfocus(fg: FormGroup, element: HTMLElement) {
    console.log("focus");
    this.enteredValue = fg.value[element.getAttribute("formControlName")];
    //this.itemId = $event.data.id;
    this._hubConnection.invoke("SendEdit", {
      id: fg.value.id,
      field: element.getAttribute("formControlName"),
      index: 0
    });
  }
  onBlur(fg: FormGroup, element: HTMLElement) {
    this.outValue = fg.value[element.getAttribute("formControlName")];
    if (this.enteredValue != this.outValue) {
      this._hubConnection
        .invoke("SendUpdatedFood", {
          id: fg.value.id,
          name: fg.value.name,
          category: +fg.value.category,
          ingrident1: fg.value.ingrident1,
          ingrident2: fg.value.ingrident2,
          ingrident3: fg.value.ingrident3,
          ingrident4: fg.value.ingrident4,
          ingrident5: fg.value.ingrident5,
          ingrident6: fg.value.ingrident6,
          editMode: fg.value.editMode,
          editField: fg.value.editField,
          index: 0
        })
        .then(() => {
          this._hubConnection.invoke("SendEditComplete", {
            id: fg.value.id,
            field: element.getAttribute("formControlName"),
            index: 0
          });
        });
    } else {
      console.log("Need Not to progress");
      this._hubConnection.invoke("SendEditComplete", {
        id: fg.value.id,
        field: element.getAttribute("formControlName"),
        index: 0
      });
    }
  }

  // Creates a reference of your initial value
  createReference(obj: any) {
    this.reference = Object.assign({}, obj);
  }

  // Returns true if the user has changed the value in the form
  isDifferent(obj: any, prop: string) {
    return this.reference[prop] !== obj[prop];
  }
}
