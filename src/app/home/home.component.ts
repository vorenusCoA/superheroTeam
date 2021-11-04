import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperHeroe } from 'modelo/superheroe';
import { ServicioService } from 'servicio/servicio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  goodHero: number
  badhero: number

  constructor(private servicio: ServicioService, private fb: FormBuilder,
    private elementRef: ElementRef, private _route: ActivatedRoute, private _router: Router,
    private toastr: ToastrService) {
    this.buscador = this.fb.group({
      name: ["", Validators.required]
    })
    this.vista_actual = ""
    this.goodHero = 0
    this.badhero = 0
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

    console.log("team: ", this.team)

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
    let malo = false
    let bueno = false

    if (this.team.indexOf(superheroe) !== -1) {
      this.toastr.toastrConfig.preventDuplicates = true;
      this.toastr.info('Ya es parte del equipo', 'Atencion', { timeOut: 2000 })
    }

    if (this.team.length < 6 && this.team.indexOf(superheroe) === -1) {
      this.team.push(superheroe)
      this.toastr.toastrConfig.preventDuplicates = true;
      this.toastr.success('Personaje agregado', 'Exito!', { timeOut: 2000 })
      if (superheroe.biography.alignment === "good") {
        bueno = true
      } else {
        malo = true
      }
      if (bueno) {
        this.goodHero++
      }
      if (malo) {
        this.badhero++
      }
      if (this.goodHero > 3) {
        this.toastr.toastrConfig.preventDuplicates = true;
        this.toastr.info('Solo 3 Superheroes permitidos', 'Limite alcanzado', { timeOut: 2000 })
        this.team.splice(this.team.length - 1, 1)
        this.goodHero--
      }
      if (this.badhero > 3) {
        this.toastr.toastrConfig.preventDuplicates = true;
        this.toastr.info('Solo 3 Villanos permitidos', 'Limite alcanzado', { timeOut: 2000 })
        this.team.splice(this.team.length - 1, 1)
        this.badhero--
      }
    }

    if (this.team.length === 6) {
      this.toastr.toastrConfig.preventDuplicates = true;
      this.toastr.info('Ya no podrás agregar más miembros al equipo', 'Limite alcanzado', { timeOut: 2000 })
    }

    console.log("bad: ", this.badhero)
    console.log("good: ", this.goodHero)
  }

  borrarSuperheroe(superheroe: SuperHeroe) {
    if (superheroe.biography.alignment === "good") {
      this.goodHero--
    } else {
      this.badhero--
    }
    let index = this.team.indexOf(superheroe);
    this.team.splice(index, 1);

    console.log("bad: ", this.badhero)
    console.log("good: ", this.goodHero)
  }

  compartirVista() { // le pasa al servicio la info
    console.log("dentro de compartirVista ", this.vista_actual)
    this.servicio.cargarVista(this.vista_actual)
  }

}
