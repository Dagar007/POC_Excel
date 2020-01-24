import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class FoodService {
  constructor(private http:HttpClient) {}

  postFood(formData) {
    return this.http.post(environment.baseUrl, formData);
  }
  putFood(id,formData) {
    return this.http.put(environment.baseUrl + id, formData);
  }
  deleteFood(id) {
    return this.http.delete(environment.baseUrl+id);
  }

  foodList(){
    return this.http.get(environment.baseUrl)
  }
}
