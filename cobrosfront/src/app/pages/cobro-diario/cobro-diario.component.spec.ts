import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobroDiarioComponent } from './cobro-diario.component';

describe('CobroDiarioComponent', () => {
  let component: CobroDiarioComponent;
  let fixture: ComponentFixture<CobroDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobroDiarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CobroDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
