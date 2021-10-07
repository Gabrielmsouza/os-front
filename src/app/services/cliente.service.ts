import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl : string = environment.baseUrl;

  constructor(
    private htpp : HttpClient,
    private snak : MatSnackBar
  ) { }

  findAll() : Observable<Cliente[]>{
    const url = this.baseUrl + '/clientes';
    return this.htpp.get<Tecnico[]>(url);
  }
}
