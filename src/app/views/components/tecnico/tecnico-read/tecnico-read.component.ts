import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/utils/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tecnico-read',
  templateUrl: './tecnico-read.component.html',
  styleUrls: ['./tecnico-read.component.css']
})
  
export class TecnicoReadComponent implements  AfterViewInit {
  result: string = '';
  tecnicos: Tecnico[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: TecnicoService,
    private router: Router,
    public dialog: MatDialog
    ){}

  ngAfterViewInit() {
    this.findAll();
  }  
 
  findAll(): void{
    this.service.findAll().subscribe((resposta) => {
      this.tecnicos = resposta;
      this.dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);
      this.dataSource.paginator = this.paginator;
    });
  } 

  navigateToCreate(): void{
    this.router.navigate(['tecnicos/create'])
  }

  deleteTecnico(id:number, nome:string): void {
    const message = `Deseja realmente excluir o técnico ${nome}?`;

    const dialogData = new ConfirmDialogModel("Deletar Técnico", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true){
        this.service.delete(id).subscribe((resposta) => {
          this.service.message('Técnico excluído com sucesso!');
          this.findAll();
        }, erro => {
          this.service.message(erro.error.message);
        });
        
      
      }
      
    });
  }
}

