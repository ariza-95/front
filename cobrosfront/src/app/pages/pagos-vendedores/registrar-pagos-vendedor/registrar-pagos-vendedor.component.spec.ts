import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPagosVendedorComponent } from './registrar-pagos-vendedor.component';

describe('RegistrarPagosVendedorComponent', () => {
  let component: RegistrarPagosVendedorComponent;
  let fixture: ComponentFixture<RegistrarPagosVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPagosVendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPagosVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
