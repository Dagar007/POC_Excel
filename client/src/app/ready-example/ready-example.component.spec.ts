import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyExampleComponent } from './ready-example.component';

describe('ReadyExampleComponent', () => {
  let component: ReadyExampleComponent;
  let fixture: ComponentFixture<ReadyExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
