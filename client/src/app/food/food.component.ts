import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";
import { FoodService } from "../shared/food.service";
import { v4 as uuid } from "uuid";
import { environment } from "src/environments/environment";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel
} from "@microsoft/signalr";
import { Pagination, PaginatedResult } from "../model/pagination";
import { ActivatedRoute } from "@angular/router";
import { Food } from "../model/food";

@Component({
  selector: "app-food",
  templateUrl: "./food.component.html",
  styleUrls: ["./food.component.css"]
})
export class FoodComponent implements OnInit {
  foodForm: FormArray = this.fb.array([]);
  notification = null;
  editingId;
  categories = [];
  pagination: Pagination;

  userParams: any = {};

  private _hubConnection: HubConnection;

  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.foodService.getCategories().subscribe(catgories => {
      this.categories = catgories as [];
    });
    this.createConnection();
    this.foodList();

    this.userParams.category = 0;
    this.userParams.nameStartsWith = "";
    this.userParams.orderBy = "name";
   
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

              name: [
                { value: food.name, disabled: !food.editMode },
                Validators.required
              ],
              category: [
                { value: food.category, disabled: !food.editMode },
                Validators.required
              ],
              ingrident1: [
                { value: food.ingrident1, disabled: !food.editMode },
                Validators.required
              ],
              ingrident2: [
                { value: food.ingrident2, disabled: !food.editMode }
              ],
              ingrident3: [
                { value: food.ingrident3, disabled: !food.editMode }
              ],
              ingrident4: [
                { value: food.ingrident4, disabled: !food.editMode }
              ],
              ingrident5: [
                { value: food.ingrident5, disabled: !food.editMode }
              ],
              ingrident6: [
                { value: food.ingrident6, disabled: !food.editMode }
              ],
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
          console.log(food);
          this.foodForm.push(
            this.fb.group({
              id: [food.id],
              name: [
                { value: food.name, disabled: !food.editMode },
                Validators.required
              ],
              category: [
                { value: food.category, disabled: !food.editMode },
                Validators.required
              ],
              ingrident1: [
                { value: food.ingrident1, disabled: !food.editMode },
                Validators.required
              ],
              ingrident2: [
                { value: food.ingrident2, disabled: !food.editMode }
              ],
              ingrident3: [
                { value: food.ingrident3, disabled: !food.editMode }
              ],
              ingrident4: [
                { value: food.ingrident4, disabled: !food.editMode }
              ],
              ingrident5: [
                { value: food.ingrident5, disabled: !food.editMode }
              ],
              ingrident6: [
                { value: food.ingrident6, disabled: !food.editMode }
              ],
              editMode: [food.editMode],
              message: [""]
            })
          );
        });
      }
    });
    // this.foodService.foodList(this.pageNumber, this.pageSize).subscribe(resp => {

    // });
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
          category:   fg.value.category,
          ingrident1: fg.value.ingrident1,
          ingrident2: fg.value.ingrident2,
          ingrident3: fg.value.ingrident3,
          ingrident4: fg.value.ingrident4,
          ingrident5: fg.value.ingrident5,
          ingrident6: fg.value.ingrident6
        })

        .then(() => {
          this._hubConnection.invoke("SendEditComplete", { id: fg.value.id });
          this.foodForm.controls.forEach(item => {
            if (item.value.id === fg.value.id) {
              item.disable();
            }
          });
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
      .withUrl(environment.baseUrl+ "edit")
      .build();
    this._hubConnection
      .start()
      .then(() => {})
      .catch(err => console.log(err));

    this._hubConnection.on("ReceiveEdit", (update: any) => {
      this.foodForm.controls.forEach(item => {
        if (item.value.id === update) {
          item.patchValue({ message: "editing" });
        }
      });
    });

    this._hubConnection.on("ReceiveEditComplete", (update: any) => {
      this.foodForm.controls.forEach(item => {
        if (item.value.id === update) {
          item.patchValue({ message: "" });
        }
      });
    });

    this._hubConnection.on("ReceiveAdd", (food: any) => {
      this.foodForm.push(
        this.fb.group({
          id: [food.id],
          name: [
            { value: food.name, disabled: !food.editMode },
            Validators.required
          ],
          category: [
            { value: food.category, disabled: !food.editMode },
            Validators.required
          ],
          ingrident1: [
            { value: food.ingrident1, disabled: !food.editMode },
            Validators.required
          ],
          ingrident2: [{ value: food.ingrident2, disabled: !food.editMode }],
          ingrident3: [{ value: food.ingrident3, disabled: !food.editMode }],
          ingrident4: [{ value: food.ingrident4, disabled: !food.editMode }],
          ingrident5: [{ value: food.ingrident5, disabled: !food.editMode }],
          ingrident6: [{ value: food.ingrident6, disabled: !food.editMode }],
          editMode: [food.editMode],
          message: [""]
        })
      );
    });

    this._hubConnection.on("ReceiveDelete", () => {
      this.foodList();
    });

    this._hubConnection.on("RecieveUpdatedFood", (updatedFood: any) => {
      var index;
      this.foodForm.controls.forEach(c => {
        if (c.value.id == updatedFood.id) {
          index = this.foodForm.controls.indexOf(c);
        }
      });
      // var index = this.foodForm.controls.indexOf(updatedFood)
      //console.log(index)
      this.foodForm.removeAt(index);
      this.foodForm.insert(
        index,

        this.fb.group({
          id: [updatedFood.id],
          name: [
            { value: updatedFood.name, disabled: !updatedFood.editMode },
            Validators.required
          ],
          category: [
            { value: updatedFood.category, disabled: !updatedFood.editMode },
            ,
            Validators.required
          ],
          ingrident1: [
            { value: updatedFood.ingrident1, disabled: !updatedFood.editMode },
            Validators.required
          ],
          ingrident2: [
            { value: updatedFood.ingrident2, disabled: !updatedFood.editMode }
          ],
          ingrident3: [
            { value: updatedFood.ingrident3, disabled: !updatedFood.editMode }
          ],
          ingrident4: [
            { value: updatedFood.ingrident4, disabled: !updatedFood.editMode }
          ],
          ingrident5: [
            { value: updatedFood.ingrident5, disabled: !updatedFood.editMode }
          ],
          ingrident6: [
            { value: updatedFood.ingrident6, disabled: !updatedFood.editMode }
          ],
          editMode: [updatedFood.editMode],
          message: [""]
        })
      );
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
}
