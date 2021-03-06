import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar
  ) { }

  findAll(): Observable<Tecnico[]> {
    const url = this.baseUrl + "/tecnicos";
    return this.http.get<Tecnico[]>(url);
  }

  findById(id : number) : Observable<Tecnico> {
    const url = this.baseUrl + "/tecnicos/" + id;
    return this.http.get<Tecnico>(url);
  }   

  create(tecnico: Tecnico) : Observable<Tecnico> {
    const url = this.baseUrl + "/tecnicos";
    return this.http.post<Tecnico>(url,tecnico);
  }

  update(tecnico: Tecnico) : Observable<Tecnico> {
    const url = this.baseUrl + "/tecnicos";
    return this.http.put<Tecnico>(url,tecnico);    
  }

  delete (id : number) : Observable<void> {
    const url = this.baseUrl + "/tecnicos/" + id;
    console.log(url);
    
    return this.http.delete<void>(url);
  }

  message(msg: String){
    this.snack.open(`${msg}`,'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    });
  }
}
