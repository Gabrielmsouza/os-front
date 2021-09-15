import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: 'Valdir',
    cpf: '639.902.030-10',
    telefone: '48 9 9652-6966'
  }

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
    }, err => {
      this.service.message(err.error.message)
    });
  }

}
