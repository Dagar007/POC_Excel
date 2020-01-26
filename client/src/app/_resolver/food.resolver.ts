import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";

import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { FoodService } from "../shared/food.service";
import { Food } from "../model/food";

@Injectable()
export class FoodResolver implements Resolve<Food[]> {
  pageNumber = 1;
  pageSize = 3;
  constructor(private foodService: FoodService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Food[]> {
    return this.foodService.foodList(this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        console.log(error);
        return of(null);
      })
    );
  }
}
