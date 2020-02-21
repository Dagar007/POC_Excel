import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdTemplatesService } from '../shared/ad-templates.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  elemPos;  
  id;
  constructor(private route : ActivatedRoute, private adTemplateService : AdTemplatesService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id') - 1;     
    this.elemPos = this.adTemplateService.getAdTemplateById(this.id);
  }

  public saveAsNewTemplate() {
    var arr = [];
    var c = document.getElementsByClassName("example-box");
    for (var i = 0; i < c.length; i++) {
      let pos = c[i].getBoundingClientRect();
      let parentPosition = this.getPosition(c[i]);
      arr.push({ x: pos.left - parentPosition.left, y: pos.top - parentPosition.top });
    }
    //console.log(arr);
    this.adTemplateService.addNewTemplate(arr);    
    this.router.navigate(['/adlayout']);
  }

  private getPosition(el) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { left: x, top: y};
  }

}
