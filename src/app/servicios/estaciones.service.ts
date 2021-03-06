import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstacionModelo } from '../modelos/estacion.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EstacionesService {

  url = "https://apilookback.herokuapp.com"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
    this.token = this.seguridadService.getToken();
  }

  getAll(): Observable<EstacionModelo[]>{
    return this.http.get<EstacionModelo[]>(`${this.url}/estaciones`, {
     headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
     })
    })
  }

  store(estacion: EstacionModelo): Observable<EstacionModelo> {
    return this.http.post<EstacionModelo>(`${this.url}/estaciones`, {
      nombre: estacion.nombre,
      direccion: estacion.direccion,
      coordx: estacion.coordx,
      coordy: estacion.coordy,
      tipo: estacion.tipo
  }, {
      headers: new HttpHeaders({
         "Authorization": `Bearer ${this.token}`
      })
    });
  }

  update(estacion: EstacionModelo): Observable<EstacionModelo> {
    return this.http.put<EstacionModelo>(`${this.url}/estaciones/${estacion.id}`, {
      nombre: estacion.nombre,
      direccion: estacion.direccion,
      coordx: estacion.coordx,
      coordy: estacion.coordy,
      tipo: estacion.tipo
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<EstacionModelo[]>{
    return this.http.delete<EstacionModelo[]>(`${this.url}/estaciones/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<EstacionModelo>{
    return this.http.get<EstacionModelo>(`${this.url}/estaciones/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
}
