import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http"
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Food } from '../model/food';
import { PaginatedResult } from '../model/pagination';

@Injectable({
  providedIn: "root"
})
export class FoodService {
  constructor(private http:HttpClient) {}

  postFood(formData) {
    return this.http.post(environment.baseUrl +'api/food/', formData);
  }
  putFood(id,formData) {
    return this.http.put(environment.baseUrl+'api/food/' + id, formData);
  }
  deleteFood(id) {
    return this.http.delete(environment.baseUrl+'api/food/'+id);
  }

  getCategories() {
    return this.http.get(environment.baseUrl+'api/food/'+'categories');
  }

  getFilterDropdown(field: string) {
    return this.http.get(environment.baseUrl+'api/food/filter/' + field);
  }

  foodList(page?,itemsPerPage?, userParams?): Observable<PaginatedResult<Food[]>>{
    const paginatedResult: PaginatedResult<Food[]> = new PaginatedResult<Food[]>();
    let params = new HttpParams();
    if(page != null && itemsPerPage!= null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if(userParams != null){
      params = params.append('category',userParams.category);
      params = params.append('name', userParams.nameStartsWith);
      params = params.append('orderBy', userParams.orderBy);
    }
    return this.http.get<Food[]>(environment.baseUrl+'api/food/', {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if(response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }
}
