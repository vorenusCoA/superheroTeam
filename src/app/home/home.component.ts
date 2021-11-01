import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperHeroe } from 'modelo/superheroe';
import { ServicioService } from 'servicio/servicio.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  buscador: FormGroup
  superheroes: SuperHeroe[] = []
  vista_actual: string
  team: SuperHeroe[] = []

  constructor(private servicio: ServicioService, private fb: FormBuilder,
    private elementRef: ElementRef, private _route: ActivatedRoute, private _router: Router) {
    this.buscador = this.fb.group({
      name: ["", Validators.required]
    })
    this.vista_actual = ""
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body
      .style.backgroundColor = 'black';
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      if (params['search'] !== undefined) {
        this.vista_actual = params['search']
        console.log("cargando vista actual ", this.vista_actual)
        this.buscarSuperheroe(params['search'])
      }
    });
  }

  btnSearchOnClick() {
    let name = this.buscador.get("name")?.value
    this.buscarSuperheroe(name)
    this.agregarSearchURL(name)
  }

  buscarSuperheroe(name: string) {
    this.servicio.searchSuperhero(name).subscribe(data => {
      console.log(data)
      this.superheroes = data.results
      console.log("esta es la lista: ", this.superheroes)

    }, error => {
      console.log("imprimiendo error ", error)
    })
  }

  agregarSearchURL(searchValue: string) {
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        search: searchValue
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation
    });
  }

  agregarSuperheroe(superheroe: SuperHeroe) {
    this.team.push(superheroe)
  }

  borrarSuperheroe(superheroe: SuperHeroe) {
    let index = this.team.indexOf(superheroe);
    this.team.splice(index, 1);
  }

  compartirVista() { // le pasa al servicio la info
    console.log("dentro de compartirVista ", this.vista_actual)
    this.servicio.cargarVista(this.vista_actual)
  }

}
