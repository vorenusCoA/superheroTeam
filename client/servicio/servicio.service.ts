import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SuperHeroe } from 'modelo/superheroe';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  private vista_actual = new BehaviorSubject("");
  sharedView = this.vista_actual.asObservable();

  private myTeam = new BehaviorSubject<SuperHeroe[]>([]);
  sharedmyTeam= this.myTeam.asObservable();

  searchSuperhero(name:string):Observable<any> {
    const path = "/api/search/" + name
    return this.http.get(path)
  }

  getSuperhero(id:number):Observable<any> {
    const path = "/api/superhero/"+ id
    return this.http.get(path)
  }

  cargarVista(vista: string) {
    this.vista_actual.next(vista)
  }

  cargarmyTeam(team:SuperHeroe[]) {
    this.myTeam.next(team)
  }
}
