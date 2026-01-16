import { TestBed } from '@angular/core/testing';

import { ServiciosMensajeService } from './servicios-mensaje.service';

describe('ServiciosMensajeService', () => {
  let service: ServiciosMensajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosMensajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
