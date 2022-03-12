import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRutasComponent } from './create-rutas.component';

describe('CreateRutasComponent', () => {
  let component: CreateRutasComponent;
  let fixture: ComponentFixture<CreateRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRutasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
