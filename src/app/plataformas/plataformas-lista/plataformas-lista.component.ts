import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, empty, of, Subject, EMPTY } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { Plataforma } from './plataforma';
import { PlataformasService } from './plataformas.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Plataformas2Service } from './plataforma2.service';


@Component({
  selector: 'app-plataformas-lista',
  templateUrl: './plataformas-lista.component.html',
  styleUrls: ['./plataformas-lista.component.scss'],
  preserveWhitespaces: true
})
export class PlataformasListaComponent implements OnInit {

 // bsModalRef: BsModalRef;
 // plataformas: Plataforma[];
 // deleteModalRef: BsModalService;
 deleteModalRef: BsModalRef;
 @ViewChild('deleteModal', { static: true }) deleteModal;

 cursos$: Observable<Plataforma[]>;
 error$ = new Subject<boolean>();

  plataformaSelecionado: Plataforma;
  plataformas$: Observable<Plataforma[]>;

  constructor(private service: PlataformasService,
      private modalService: BsModalService,
      private alertService: AlertModalService,
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit() {
//    this.service.list()
//    .subscribe(dados => this.plataformas = dados);
this.onRefresh();
}

onRefresh() {
  this.plataformas$ = this.service.list()
.pipe(
catchError(error => {
  console.error(error);
 // this.error$.next(true);
 this.handleError();
  return empty();
})
);



/* this.service.list()
  .pipe(
    catchError(error => empty())
  )
  .subscribe(
  dados=> {
    console.log(dados);
  },
  error => console.error(error),
  () => console.log('Observable completo!')
);*/
}

handleError() {
  this.alertService.showAlertDanger('Erro ao carregar as planos. Tente novamente mais tarde.');
/*  this.bsModalRef = this.modalService.show(AlertModalComponent);
   this.bsModalRef.content.type = 'danger';
   this.bsModalRef.content.message = 'Erro ao carregar as plataformas. Tente novamente mais tarde.'; */
}

onEdit(id) {
  this.router.navigate(['editar', id], { relativeTo: this.route});
}

onDelete(plataforma) {
  this.plataformaSelecionado = plataforma;
  this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });

  /*const result$ = this.alertService.showConfirm('Confirmacao', 'Tem certeza que deseja remover essa plataforma?');
  result$.asObservable()
  .pipe(
    switchMap(result => result ? this.service.remove(plataforma.id) : EMPTY)
  )
  .subscribe(
    success => {
      this.onRefresh();
    },
    error => {
      this.alertService.showAlertDanger('Erro ao remover. Tente novamente mais tarde.');
    }
  ); */
}

onConfirmDelete() {
  this.service.remove(this.plataformaSelecionado.id)
  .subscribe(
    success => {
      this.onRefresh();
      this.deleteModalRef.hide();
    },
    error => {
      this.alertService.showAlertDanger('Erro ao tentar remover. Tente novamente mais tarde.');
      this.deleteModalRef.hide();
    }
  );
}

onDeclineDelete() {
  this.deleteModalRef.hide();
}

}
