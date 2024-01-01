import { ComponentFixture, TestBed } from '@angular/core/testing';

import { List_covoiturageComponent } from './list_covoi.component';

describe('List_covoiturageComponent', () => {
  let component: List_covoiturageComponent;
  let fixture: ComponentFixture<List_covoiturageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [List_covoiturageComponent]
    });
    fixture = TestBed.createComponent(List_covoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
