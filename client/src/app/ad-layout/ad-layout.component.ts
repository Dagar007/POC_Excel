import { Component, OnInit } from '@angular/core';
import { AdTemplatesService } from '../shared/ad-templates.service';

@Component({
  selector: 'app-ad-layout',
  templateUrl: './ad-layout.component.html',
  styleUrls: ['./ad-layout.component.css']
})
export class AdLayoutComponent implements OnInit {
  templates;
  constructor(private adTemplateService: AdTemplatesService) {

  }
  ngOnInit(): void {
    this.templates = this.adTemplateService.templates;
  }
}
