import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosVendedoresComponent } from './pagos-vendedores.component';

describe('PagosVendedoresComponent', () => {
  let component: PagosVendedoresComponent;
  let fixture: ComponentFixture<PagosVendedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosVendedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
