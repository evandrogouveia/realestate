import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryBannerPagesComponent } from './entry-banner-pages.component';

describe('EntryBannerPagesComponent', () => {
  let component: EntryBannerPagesComponent;
  let fixture: ComponentFixture<EntryBannerPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryBannerPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryBannerPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
