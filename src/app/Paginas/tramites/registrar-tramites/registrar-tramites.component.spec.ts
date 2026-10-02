import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTramitesComponent } from './registrar-tramites.component';

describe('RegistrarTramitesComponent', () => {
  let component: RegistrarTramitesComponent;
  let fixture: ComponentFixture<RegistrarTramitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarTramitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarTramitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
