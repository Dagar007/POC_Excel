import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridexampleComponent } from './ag-gridexample.component';

describe('AgGridexampleComponent', () => {
  let component: AgGridexampleComponent;
  let fixture: ComponentFixture<AgGridexampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridexampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
