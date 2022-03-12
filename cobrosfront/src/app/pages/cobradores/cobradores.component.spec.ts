import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobradoresComponent } from './cobradores.component';

describe('CobradoresComponent', () => {
  let component: CobradoresComponent;
  let fixture: ComponentFixture<CobradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobradoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CobradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
