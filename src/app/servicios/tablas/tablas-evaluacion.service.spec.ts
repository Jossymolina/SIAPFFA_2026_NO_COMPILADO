import { TestBed } from '@angular/core/testing';

import { TablasEvaluacionService } from './tablas-evaluacion.service';

describe('TablasEvaluacionService', () => {
  let service: TablasEvaluacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablasEvaluacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
