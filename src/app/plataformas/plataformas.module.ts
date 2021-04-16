import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlataformasRoutingModule } from './plataformas-routing.module';
import { PlataformasListaComponent } from './plataformas-lista/plataformas-lista.component';
import { PlataformasFormComponent } from './plataformas-form/plataformas-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SobreComponent } from './sobre/sobre.component';
import { DevComponent } from './dev/dev.component';


@NgModule({
  declarations: [
    PlataformasListaComponent,
    PlataformasFormComponent,
    SobreComponent,
    DevComponent

  ],
  imports: [
    CommonModule,
    PlataformasRoutingModule,
    ReactiveFormsModule
  ]
})
export class PlataformasModule { }
