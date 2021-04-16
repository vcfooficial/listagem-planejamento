import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { PlataformasService } from '../plataformas-lista/plataformas.service';

@Component({
  selector: 'app-plataformas-form',
  templateUrl: './plataformas-form.component.html',
  styleUrls: ['./plataformas-form.component.scss'],
  preserveWhitespaces: true
})
export class PlataformasFormComponent implements OnInit {

 form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private service: PlataformasService,
              private modal: AlertModalService, 
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit() {

 //   let registro = null;

/*    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        console.log(id);
        const plataforma$ = this.service.loadByID(id);
        plataforma$.subscribe(plataforma => {
          registro = plataforma;
        this.updateForm(plataforma);
        });
      }
    ); */

    // console.log(registro);

   /*
   this.route.params
   .pipe(
    map((params:any) => params['id']),
    switchMap(id => this.service.loadByID(id))
    )
   .subscribe(plataforma => this.updateForm(plataforma));
*/

const plataforma = this.route.snapshot.data['plataforma'];

this.form = this.fb.group({
      id: [plataforma.id],
      nome: [plataforma.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

/*  updateForm(plataforma){
    this.form.patchValue({
      id: plataforma.id,
      nome: plataforma.nome
    })
  } */

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      if(this.form.value.id) {
        //update
        this.service.update(this.form.value).subscribe(success => { this.modal.showAlertSucess('Plano atualizado com sucesso');
        this.location.back();
      },
        error => this.modal.showAlertDanger('Erro ao editar, tente novamente'),
        () => console.log('Update completo')
        );
        
      }else {
      this.service.create(this.form.value).subscribe(
        success => { this.modal.showAlertSucess('Registrado com sucesso');
        this.location.back();
      },
        error => this.modal.showAlertDanger('Erro ao criar, tente novamente'),
        () => console.log('request completo')
      );
    }
  }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
  //  console.log('onCancel');

  }

}
