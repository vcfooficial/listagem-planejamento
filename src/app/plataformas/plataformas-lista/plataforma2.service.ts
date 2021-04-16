import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/crud-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Plataforma } from './plataforma';

@Injectable({
  providedIn: 'root'
})
export class Plataformas2Service extends CrudService<Plataforma> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}plataformas`);
  }

  loadByID(id) {
    return null;
  }
}
