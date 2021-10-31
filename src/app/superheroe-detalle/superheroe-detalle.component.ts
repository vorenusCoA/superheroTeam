import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperHeroe } from 'modelo/superheroe';
import { ServicioService } from 'servicio/servicio.service';

@Component({
  selector: 'app-superheroe-detalle',
  templateUrl: './superheroe-detalle.component.html',
  styleUrls: ['./superheroe-detalle.component.css']
})
export class SuperheroeDetalleComponent implements OnInit {
  id: number | null;
  superheroe: SuperHeroe | null
  rutaARegresar = ""

  constructor(private aRouter: ActivatedRoute, private servicio: ServicioService, private elementRef: ElementRef,
    private _router: Router) {
    this.id = Number(this.aRouter.snapshot.paramMap.get("id"))
    this.superheroe = null
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body
      .style.backgroundColor = 'black';
  }

  ngOnInit(): void {
    this.getSuperhero()
    this.servicio.sharedView.subscribe(vista_actual => {
      this.rutaARegresar = vista_actual
      console.log("ruta a regresar ", this.rutaARegresar)
    })
  }

  getSuperhero() {
    if (this.id !== null) {
      this.servicio.getSuperhero(this.id).subscribe(data => {
        console.log(data)
        this.superheroe = data
      })
    }
  }
}
