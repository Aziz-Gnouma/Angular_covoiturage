import { ComponentFixture, TestBed } from '@angular/core/testing';

import { List_covoiturage2Component } from './list_covoi2.component';

describe('List_covoiturage2Component', () => {
  let component: List_covoiturage2Component;
  let fixture: ComponentFixture<List_covoiturage2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [List_covoiturage2Component]
    });
    fixture = TestBed.createComponent(List_covoiturage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
