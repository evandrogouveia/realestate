import { TestBed } from '@angular/core/testing';

import { PropriedadesService } from './propriedades.service';

describe('PropertyService', () => {
  let service: PropriedadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropriedadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
