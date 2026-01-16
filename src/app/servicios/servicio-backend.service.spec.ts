import { TestBed } from '@angular/core/testing';

import { ServicioBackendService } from './servicio-backend.service';

describe('ServicioBackendService', () => {
  let service: ServicioBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
