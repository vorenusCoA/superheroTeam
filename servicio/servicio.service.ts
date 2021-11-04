import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private API_KEY = "Introducir access token proporcionado por https://superheroapi.com/"  

  constructor(private http: HttpClient) { }

  private vista_actual = new BehaviorSubject("");
  sharedView = this.vista_actual.asObservable();

  searchSuperhero(name:string):Observable<any> {
    const path = "/api/" + this.API_KEY + "/search/" + name
    return this.http.get(path)
  }

  getSuperhero(id:number):Observable<any> {
    const path = "/api/"+ this.API_KEY + "/" + id
    return this.http.get(path)
  }

  cargarVista(vista: string) {
    this.vista_actual.next(vista)
  }
}
