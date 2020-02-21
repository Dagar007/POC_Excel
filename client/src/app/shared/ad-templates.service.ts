
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdTemplatesService {

  constructor() { }

  templates = [
    [{ x: 50, y: 0 }, { x: 300, y: -200 }, { x: 550, y: -400 }],
    [{ x: 50, y: 0 }, { x: 245, y: 0 }, { x: 440, y: -400 }],
    [{ x: 150, y: 0 }, { x: 300, y: -50 }, { x: 450, y: -100 }]
  ];

  public getAdTemplateById(id : number){
    return this.templates[id];
  }

  public setAdTemplateById(id : number, template){
    this.templates[id] = template;
  }

  public addNewTemplate(arr){
    this.templates.push(arr);
    console.log(this.templates);
  }
}
