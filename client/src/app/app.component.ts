import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { FoodService } from './shared/food.service';
import { v4 as uuid } from "uuid"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  foodForm: FormArray = this.fb.array([]);
  notification = null;

  constructor(private fb: FormBuilder, private foodService: FoodService) { }

  ngOnInit(): void {
    
    this.foodService.foodList().subscribe(resp => {
      if(resp == []) {
        this.addFood();
      } else {
        (resp as []).forEach(
          (food:any) => {
            this.foodForm.push(this.fb.group({
              id: [food.id],
              name:[food.name, Validators.required],
              ingrident1: [food.ingrident1, Validators.required],
              ingrident2: [food.ingrident2],
              ingrident3: [food.ingrident3],
              ingrident4: [food.ingrident4],
              ingrident5: [food.ingrident5],
              ingrident6: [food.ingrident6]
        
            }))
          }
        )
      }
    })
  }

  addFood() {
    this.foodForm.push(this.fb.group({
      id: [''],
      name:[''],
      ingrident1: ['', Validators.required],
      ingrident2: [''],
      ingrident3: [''],
      ingrident4: [''],
      ingrident5: [''],
      ingrident6: ['']

    }))
  }
  recordSubmit(fg: FormGroup) {
    if(fg.value.id == '') {
      fg.patchValue({id: uuid()})
      this.foodService.postFood(fg.value).subscribe((resp: any)=> {
        this.showNotification('insert');
      })
    } else {
      this.foodService.putFood(fg.value.id, fg.value).subscribe(()=> {
        this.showNotification('update');
      })
    }
   
  }

  onDelete(id, index) {
    if(id == '') {
      this.foodForm.removeAt(index);
    } else {
      this.foodService.deleteFood(id).subscribe(()=> {
        this.foodForm.removeAt(index);
        this.showNotification('delete');
      })
    }
  
  }
  showNotification(catgory) {
    switch (catgory) {
      case 'insert':
        this.notification = {class: 'text-success', message: 'saved'}
        break;
      case 'update':
        this.notification = {class: 'text-primary', message: 'updated!'}
        break;
      case 'delete':
        this.notification = {class: 'text-danger', message: 'deleted!'}
        break;
    
      default:
        break;
    }
    setTimeout(()=>{
      this.notification = null
    },3000)
  }

}
