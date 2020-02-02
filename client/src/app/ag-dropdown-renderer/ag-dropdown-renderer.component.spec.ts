import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgDropdownRendererComponent } from './ag-dropdown-renderer.component';

describe('AgDropdownRendererComponent', () => {
  let component: AgDropdownRendererComponent;
  let fixture: ComponentFixture<AgDropdownRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgDropdownRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgDropdownRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
