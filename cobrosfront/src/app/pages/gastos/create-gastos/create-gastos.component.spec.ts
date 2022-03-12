import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGastosComponent } from './create-gastos.component';

describe('CreateGastosComponent', () => {
  let component: CreateGastosComponent;
  let fixture: ComponentFixture<CreateGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGastosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
