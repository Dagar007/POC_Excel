import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.css']
})
export class DropComponent implements OnInit {

  constructor() { }
  dragPosition 
  dragPosition1
  dragPosition2
  ngOnInit() {
    if(localStorage.getItem("dragPosition")){
      this.dragPosition = JSON.parse(localStorage.getItem("dragPosition"));
      localStorage.removeItem("dragPosition");
    }else {
      this.dragPosition = {x: 0, y: 0};
    }
    if(localStorage.getItem("dragPosition1")){
      this.dragPosition1 = JSON.parse(localStorage.getItem("dragPosition1"));
      localStorage.removeItem("dragPosition1");
    } else {
      this.dragPosition1 = {x: 0, y: 0};
    }
    if(localStorage.getItem("dragPosition2")){
      this.dragPosition2 = JSON.parse(localStorage.getItem("dragPosition2"));
      localStorage.removeItem("dragPosition2");
    } else {
      this.dragPosition2 = {x: 0, y: 0};
    }
  
     
  }
  
 
 

  onDragEnded(event) {
    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);
    this.dragPosition = {x: boundingClientRect.x - parentPosition.left, y: boundingClientRect.y - parentPosition.top}
    localStorage.setItem("dragPosition", JSON.stringify(this.dragPosition));
    console.log('x: ' + (boundingClientRect.x - parentPosition.left), 'y: ' + (boundingClientRect.y - parentPosition.top));        
  }
  onDragEnded1(event) {
    let element1 = event.source.getRootElement();
    let boundingClientRect1 = element1.getBoundingClientRect();
    let parentPosition1 = this.getPosition(element1);
    this.dragPosition1 = {x: boundingClientRect1.x - parentPosition1.left, y: boundingClientRect1.y - parentPosition1.top}
    localStorage.setItem("dragPosition1", JSON.stringify(this.dragPosition1));
    console.log('x: ' + (boundingClientRect1.x - parentPosition1.left), 'y: ' + (boundingClientRect1.y - parentPosition1.top));        
  }
  onDragEnded2(event) {
    let element2 = event.source.getRootElement();
    let boundingClientRect2 = element2.getBoundingClientRect();
    let parentPosition2 = this.getPosition(element2);
    this.dragPosition1 = {x: boundingClientRect2.x - parentPosition2.left, y: boundingClientRect2.y - parentPosition2.top}
    localStorage.setItem("dragPosition1", JSON.stringify(this.dragPosition1));
    console.log('x: ' + (boundingClientRect2.x - parentPosition2.left), 'y: ' + (boundingClientRect2.y - parentPosition2.top));        
  }
  
  getPosition(el) {
    let x = 0;
    let y = 0;
    while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

}
