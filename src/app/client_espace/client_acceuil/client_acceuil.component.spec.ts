import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Client_acceuilComponent } from './client_acceuil.component';

describe('Client_acceuilComponent', () => {
  let component: Client_acceuilComponent;
  let fixture: ComponentFixture<Client_acceuilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Client_acceuilComponent]
    });
    fixture = TestBed.createComponent(Client_acceuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
