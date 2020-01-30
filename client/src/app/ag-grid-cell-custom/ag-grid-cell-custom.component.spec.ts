import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridCellCustomComponent } from './ag-grid-cell-custom.component';

describe('AgGridCellCustomComponent', () => {
  let component: AgGridCellCustomComponent;
  let fixture: ComponentFixture<AgGridCellCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridCellCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridCellCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
