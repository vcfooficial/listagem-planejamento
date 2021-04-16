import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevComponent } from './plataformas/dev/dev.component';
import { SobreComponent } from './plataformas/sobre/sobre.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'planos'
  },
  
  { path: 'sobre', component: SobreComponent },
  { path: 'quem-sou', component: DevComponent },
  {
    path: 'planos',
    loadChildren: () => import('./plataformas/plataformas.module').then(m => m.PlataformasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
