import { TestBed } from '@angular/core/testing';

import { DepoimentosService } from './depoimentos.service';

describe('DepoimentosService', () => {
  let service: DepoimentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepoimentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
