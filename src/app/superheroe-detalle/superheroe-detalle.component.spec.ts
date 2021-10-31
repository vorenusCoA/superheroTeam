import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroeDetalleComponent } from './superheroe-detalle.component';

describe('SuperheroeDetalleComponent', () => {
  let component: SuperheroeDetalleComponent;
  let fixture: ComponentFixture<SuperheroeDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperheroeDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperheroeDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
