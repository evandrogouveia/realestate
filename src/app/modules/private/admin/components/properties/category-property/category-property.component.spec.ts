import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPropertyComponent } from './category-property.component';

describe('CategoryPropertyComponent', () => {
  let component: CategoryPropertyComponent;
  let fixture: ComponentFixture<CategoryPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
