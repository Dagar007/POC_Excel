import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
//import * as fromRoot from './../app.reducer';
//import { Store } from '@ngrx/store';
//import * as UI from './../_shared/ui.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(/*private store: Store<fromRoot.State>*/){}
  intercept(
    req: import("@angular/common/http").HttpRequest<any>,
    next: import("@angular/common/http").HttpHandler
  ): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        //this.store.dispatch(new UI.StopLoading());
        if (error.status === 401) {
          return throwError(error.statusText);
        }
        
        if(error instanceof HttpErrorResponse) {
           // const applicationError = error.headers.get('Application-Error')
            if(error.status === 500) {
                //console.log(error.error.errors)
                return throwError(error.error.errors)
            }
            const serverError = error.error;
            let modelStateError = '';
            if(serverError.errors && typeof serverError.errors === 'object')
            {
                for(const key in serverError.errors)
                {
                    if(serverError.errors[key]) {
                        modelStateError += serverError.errors[key] + '\n';
                    }
                }
            }
            return throwError(modelStateError || serverError || 'Server Error');
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
