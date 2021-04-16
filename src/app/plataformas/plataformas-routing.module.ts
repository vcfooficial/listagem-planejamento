import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatResolverGuard } from './guards/plat-resolver.guard';
import { PlataformasFormComponent } from './plataformas-form/plataformas-form.component';
import { PlataformasListaComponent } from './plataformas-lista/plataformas-lista.component';

const routes: Routes = [
  { path: '', component: PlataformasListaComponent },
  { path: 'novo', component: PlataformasFormComponent,
resolve: {
  plataforma: PlatResolverGuard
} },
  { path: 'editar/:id', component: PlataformasFormComponent,
  resolve: {
    plataforma: PlatResolverGuard
  } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlataformasRoutingModule { }
