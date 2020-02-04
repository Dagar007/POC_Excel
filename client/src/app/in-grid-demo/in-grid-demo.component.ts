import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-in-grid-demo',
  templateUrl: './in-grid-demo.component.html',
  styleUrls: ['./in-grid-demo.component.css']
})
export class InGridDemoComponent implements OnInit {
  title = 'My Ignite UI project';
  constructor() { }

  localData = [
    { Name:'John', Age: 29 },
    { Name:'Alice', Age: 27 },
    { Name:'Jessica', Age: 31 },
  ];


  ngOnInit() {
  }

}
