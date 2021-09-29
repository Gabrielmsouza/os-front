import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  id_tec = 0;

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [
    Validators.minLength(11),
    Validators.maxLength(18)
  ]);

  constructor(
    private router: Router,
    private service: TecnicoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_tec =  Number(this.route.snapshot.paramMap.get('id'));
    this.findById();
  }

  findById(): void{
    this.service.findById(this.id_tec).subscribe(resposta => {
      this.tecnico = resposta;
    }, erro => {
      this.service.message(erro.error.message)
      this.navigateToCancel();
    })
  }

  navigateToUpdate(): void {
    this.service.update(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['/tecnicos'])
      this.service.message('Tecnico alterado com sucesso!')
    }, err => {
      this.service.message(err.error.message)
      console.log(err);

    });
  }

  navigateToCancel(): void {
    this.router.navigate(['/tecnicos'])
  }

  errorValidName() {
    if (this.nome.invalid) {
      return 'Informe o Nome!';
    }
    return false;
  }

  errorValidCpf() {
    if (this.cpf.invalid) {
      return 'Informe o CPF!';
    }
    return false;
  }

  errorValidTelefone() {
    if (this.telefone.invalid) {
      return 'Informe o Telefone!';
    }
    return false;
  }

  habilitarBotaoCreate() {
    if (this.errorValidName() || this.errorValidCpf() || this.errorValidTelefone()) return true
    else return false;
  }

}
