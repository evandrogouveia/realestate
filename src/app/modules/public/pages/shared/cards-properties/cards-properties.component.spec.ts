import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPropertiesComponent } from './cards-properties.component';

describe('CardsComponentComponent', () => {
  let component: CardsPropertiesComponent;
  let fixture: ComponentFixture<CardsPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
