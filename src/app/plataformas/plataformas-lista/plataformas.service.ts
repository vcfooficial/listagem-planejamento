import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plataforma } from './plataforma';
import { tap, delay } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlataformasService {

  private readonly API = `${environment.API}plataformas`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Plataforma[]>(this.API)
    .pipe(
      delay(1000),
      tap(console.log)
    );
  }

  loadByID(id) {
    return this.http.get<Plataforma>(`${this.API}/${id}`);
  }

  create(plataforma) {
    return this.http.post(this.API, plataforma);
  }

  update(plataforma) {
    return this.http.put(`${this.API}/${plataforma.id}`, plataforma);
  }

  save(plataforma) {
    if (plataforma.id) {
      return this.update(plataforma);
    }
    return this.create(plataforma);
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
