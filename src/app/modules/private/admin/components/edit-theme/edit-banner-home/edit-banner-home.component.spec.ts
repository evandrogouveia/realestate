import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBannerHomeComponent } from './edit-banner-home.component';

describe('EditBannerHomeComponent', () => {
  let component: EditBannerHomeComponent;
  let fixture: ComponentFixture<EditBannerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBannerHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBannerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
