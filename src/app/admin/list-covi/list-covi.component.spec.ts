import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoviComponent } from './list-covi.component';

describe('ListCoviComponent', () => {
  let component: ListCoviComponent;
  let fixture: ComponentFixture<ListCoviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCoviComponent]
    });
    fixture = TestBed.createComponent(ListCoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
