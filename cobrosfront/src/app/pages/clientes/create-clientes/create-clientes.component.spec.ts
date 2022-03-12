import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientesComponent } from './create-clientes.component';

describe('CreateClientesComponent', () => {
  let component: CreateClientesComponent;
  let fixture: ComponentFixture<CreateClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
