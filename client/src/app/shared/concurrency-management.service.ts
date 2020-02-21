import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { BankAccount } from '../model/bank-account.model';
@Injectable({
    providedIn: 'root',
   })
export class ConcurrencyManagementService{
   
    constructor(private http : HttpClient){}
    
    getBalance(){
        return this.http.get<BankAccount>(environment.baseUrl+'api/ConcurrencyManagement');
    }
    updateBalance(formData){
        return this.http.post<BankAccount>(environment.baseUrl+'api/ConcurrencyManagement', formData);
    }
}