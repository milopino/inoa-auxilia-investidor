import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8080/';
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  // Buscando todos os investidores cadastrados via serviço
  getAllInvestidores() : Observable<any> {
    return this.http.get(this.baseUrl + 'investidores/',
    {headers: this.httpHeaders});
  };

  // Buscando todos os ativos cadastrados via serviço
  getAllAtivos() : Observable<any> {
    return this.http.get(this.baseUrl + 'ativos/',
    {headers: this.httpHeaders});
  };

  // Buscando as informações de um único ativo
  getAtivo(id) : Observable<any> {
    return this.http.get(this.baseUrl + 'ativos/' + id + '/',
    {headers: this.httpHeaders});
  };
}
