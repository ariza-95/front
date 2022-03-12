import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosCobradoresComponent } from './pagos-cobradores.component';

describe('PagosCobradoresComponent', () => {
  let component: PagosCobradoresComponent;
  let fixture: ComponentFixture<PagosCobradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosCobradoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosCobradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
