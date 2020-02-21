import { Component, OnInit } from '@angular/core';
import { ConcurrencyManagementService } from '../shared/concurrency-management.service';
import { BankAccount } from '../model/bank-account.model';

@Component({
  selector: 'app-concurrency-management',
  templateUrl: './concurrency-management.component.html',
  styleUrls: ['./concurrency-management.component.css']
})
export class ConcurrencyManagementComponent implements OnInit {
  bankAccount: BankAccount = new BankAccount();

  constructor(private concurrencyManagementService: ConcurrencyManagementService) { }

  ngOnInit() {
    this.getBalance();
  }

  getBalance() {
    this.concurrencyManagementService.getBalance().subscribe(data => {
      this.bankAccount = data;
    });
  }
  add(amount: number) {
    let updatedData = {
      
        id: this.bankAccount.id,
        balance: this.bankAccount.balance + amount,
        timestamp: this.bankAccount.timestamp
      
    }
    this.concurrencyManagementService.updateBalance(updatedData).subscribe(data => {
      this.bankAccount = data;
    }, err => {
      alert(err);
    });
  }
}
