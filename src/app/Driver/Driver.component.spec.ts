import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverComponent } from './Driver.component';

describe('ProjectComponent', () => {
  let component: DriverComponent;
  let fixture: ComponentFixture<DriverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverComponent]
    });
    fixture = TestBed.createComponent(DriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
