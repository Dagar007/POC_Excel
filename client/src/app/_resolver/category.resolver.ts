import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";

import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { FoodService } from "../shared/food.service";
import { Category } from "../model/food";

@Injectable()
export class CategoryResolver implements Resolve<Category[]> {
  pageNumber = 1;
  pageSize = 3;
  constructor(private foodService: FoodService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Category[]> {
    return this.foodService.getCategories().pipe(
      catchError(error => {
        console.log(error);
        return of(null);
      })
    );
  }
}
