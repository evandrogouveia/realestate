import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideLateralComponent } from './aside-lateral.component';

describe('AsideLateralComponent', () => {
  let component: AsideLateralComponent;
  let fixture: ComponentFixture<AsideLateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideLateralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
