import { TestBed } from '@angular/core/testing';

import { EditFooterService } from './edit-footer.service';

describe('EditFooterService', () => {
  let service: EditFooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditFooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
