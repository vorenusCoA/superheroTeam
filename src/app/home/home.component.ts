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
  averageWeight: any
  averageHeight: any
  totalCombat: number
  totalDurability: number
  totalIntelligence: number
  totalPower: number
  totalSpeed: number
  totalStrength: number
  arrayPowerstats: any

  constructor(private servicio: ServicioService, private fb: FormBuilder,
    private elementRef: ElementRef, private _route: ActivatedRoute, private _router: Router,
    private toastr: ToastrService) {
    this.buscador = this.fb.group({
      name: ["", Validators.required]
    })
    this.vista_actual = ""
    this.averageWeight = 0
    this.averageHeight = 0
    this.totalCombat = 0
    this.totalDurability = 0
    this.totalIntelligence = 0
    this.totalPower = 0
    this.totalSpeed = 0
    this.totalStrength = 0    
  
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body
      .style.backgroundColor = 'black';
  }

  ngOnInit(): void {
    let token = localStorage.getItem("token")
    if (!token) {
      this._router.navigate(['/login']);
    }
    this._route.queryParams.subscribe(params => {
      if (params['search'] !== undefined) {
        this.vista_actual = params['search']
        console.log("cargando vista actual ", this.vista_actual)
        this.buscarSuperheroe(params['search'])
      }
    });

    this.servicio.sharedmyTeam.subscribe(myTeam => {
      this.team = myTeam
      for (let i = 0; i < this.team.length; i++) {
        this.averageWeight += parseInt(myTeam[i].appearance.weight[1].replace("kg", ""))
        this.averageHeight += parseInt(myTeam[i].appearance.height[1].replace("cm", ""))  
        this.totalCombat += parseInt(myTeam[i].powerstats.combat)
        this.totalDurability += parseInt(myTeam[i].powerstats.durability)
        this.totalIntelligence += parseInt(myTeam[i].powerstats.intelligence)
        this.totalPower += parseInt(myTeam[i].powerstats.power)
        this.totalSpeed += parseInt(myTeam[i].powerstats.speed)
        this.totalStrength += parseInt(myTeam[i].powerstats.strength)

      }
      if(myTeam.length > 0) {
        this.averageWeight = (this.averageWeight / myTeam.length).toFixed(2)      
        this.averageHeight = (this.averageHeight / myTeam.length).toFixed(2)
      }  

    })

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

    if (this.team.length === 6) {
      this.toastr.toastrConfig.preventDuplicates = true;
      this.toastr.info('Ya no podes agregar más miembros al equipo', 'Limite alcanzado', { timeOut: 2000 })
      return
    }

    for (let i = 0; i < this.team.length; i++) {
      if (this.team[i].id === superheroe.id) {
        this.toastr.toastrConfig.preventDuplicates = true;
        this.toastr.warning('Ya es parte del equipo', 'Atencion', { timeOut: 2000 })
        return
      }
    }
    let badHero = 0
    let goodHero = 0

    for (let i = 0; i < this.team.length; i++) {
      if (this.team[i].biography.alignment === "good") {
        goodHero++
      } else if (this.team[i].biography.alignment === "bad") {
        badHero++
      }
    }

    if (superheroe.biography.alignment === "good" && goodHero === 3) {
      this.toastr.toastrConfig.preventDuplicates = true;
      this.toastr.info('Solo 3 Superheroes permitidos', 'Limite alcanzado', { timeOut: 2000 })
      return
    }

    if (superheroe.biography.alignment === "bad" && badHero === 3) {
      this.toastr.toastrConfig.preventDuplicates = true;
      this.toastr.info('Solo 3 Villanos permitidos', 'Limite alcanzado', { timeOut: 2000 })
      return
    }

    let msj = ""
    if (superheroe.biography.alignment === "good") {
      msj = "Superheroe agregado"

    } else if (superheroe.biography.alignment === "bad") {
      msj = "Villano agregado"
    } else {
      msj = "Personaje neutral agregado"
    }

    this.team.push(superheroe)
    this.toastr.toastrConfig.preventDuplicates = true;
    this.toastr.success(msj, 'Exito!', { timeOut: 2000 })

    this.calcularPromedios()
  }

  borrarSuperheroe(superheroe: SuperHeroe) {

    let msj = ""

    if (superheroe.biography.alignment === "good") {
      msj = 'Superheroe eliminado'
    } else if (superheroe.biography.alignment === "bad") {
      msj = 'Villano eliminado'
    } else {
      msj = "Personaje neutral eliminado"
    }

    let index = this.team.indexOf(superheroe);
    this.team.splice(index, 1);
    this.toastr.toastrConfig.preventDuplicates = true;
    this.toastr.error(msj, 'Exito!', { timeOut: 2000 })
    this.calcularPromedios()

  }

  calcularPromedios() {
    
    let peso = 0
    let altura = 0
    let combat = 0
    let durability = 0
    let intelligence = 0
    let power = 0
    let speed = 0
    let strength = 0    

    for (let i = 0; i < this.team.length; i++) {
      peso += parseInt(this.team[i].appearance.weight[1].replace("kg", ""))
      altura += parseInt(this.team[i].appearance.height[1].replace("cm", ""))
      combat += parseInt(this.team[i].powerstats.combat)
      durability += parseInt(this.team[i].powerstats.durability)
      intelligence += parseInt(this.team[i].powerstats.intelligence)
      power += parseInt(this.team[i].powerstats.power)
      speed += parseInt(this.team[i].powerstats.speed)
      strength += parseInt(this.team[i].powerstats.strength)

    }
    this.averageWeight = (peso / this.team.length).toFixed(2)
    this.averageHeight = (altura / this.team.length).toFixed(2)
    this.totalCombat = combat
    this.totalDurability = durability
    this.totalIntelligence = intelligence
    this.totalPower = power
    this.totalSpeed = speed
    this.totalStrength = strength

    this.arrayPowerstats = [this.totalCombat, this.totalDurability, this.totalIntelligence, this.totalPower, this.totalSpeed, this.totalStrength]
    console.log("sin sort: ",this.arrayPowerstats)
    this.arrayPowerstats.sort((a:number,b:number)=>b-a)
    console.log("con sort: ",this.arrayPowerstats)

  }

  compartirDatosServicio() { // le pasa al servicio la info
    console.log("dentro de compartirVista ", this.vista_actual)
    this.servicio.cargarVista(this.vista_actual)
    this.servicio.cargarmyTeam(this.team)
  }

}
