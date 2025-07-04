import { TestBed } from '@angular/core/testing';

import { EditThemeService } from './edit-theme.service';

describe('EditThemeService', () => {
  let service: EditThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
