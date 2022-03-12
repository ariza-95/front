import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCobradorComponent } from './crear-cobrador.component';

describe('CrearCobradorComponent', () => {
  let component: CrearCobradorComponent;
  let fixture: ComponentFixture<CrearCobradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCobradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCobradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
