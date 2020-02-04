import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InGridDemoComponent } from './in-grid-demo.component';

describe('InGridDemoComponent', () => {
  let component: InGridDemoComponent;
  let fixture: ComponentFixture<InGridDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InGridDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InGridDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
