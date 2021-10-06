import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Mask } from 'src/app/utils/Mask';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})

export class TecnicoCreateComponent implements OnInit {
  mascaraCpf = Mask.cpfMask;
  mascaraFone = Mask.phoneMask;

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
    private service: TecnicoService
  ) { }

  ngOnInit(): void {
  }

  navigateToCancel(): void {
    this.router.navigate(['/tecnicos'])
  }

  navigateToCreate(): void {
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['/tecnicos'])
      this.service.message('Tecnico criado com sucesso!')
    }, erro => {
      this.service.message(erro.error.message)
      console.log(erro);

    });
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
