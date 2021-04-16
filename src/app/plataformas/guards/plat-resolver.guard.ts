import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Plataforma } from '../plataformas-lista/plataforma';
import { PlataformasService } from '../plataformas-lista/plataformas.service';

@Injectable({
  providedIn: 'root'
})
export class PlatResolverGuard implements Resolve<Plataforma> {
  constructor(private service: PlataformasService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Plataforma> {
    if (route.params && route.params['id']) {
      return this.service.loadByID(route.params['id']);
    }

    return of({
      id: null,
      nome: null
    });
  }
}
