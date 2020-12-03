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

  // Buscando as informações de um único investidor
  getInvestidor(id) : Observable<any> {
    return this.http.get(this.baseUrl + 'investidores/' + id + '/',
    {headers: this.httpHeaders});
  };

  // Buscando todos os ativos cadastrados via serviço
  getAllAtivos() : Observable<any> {
    return this.http.get(this.baseUrl + 'ativos/',
    {headers: this.httpHeaders});
  };

  // Buscando todos as carteiras cadastradas via serviço
  getAllCarteiras() : Observable<any> {
    return this.http.get(this.baseUrl + 'carteiras/',
    {headers: this.httpHeaders});
  };

  // Buscando as informações de um único ativo
  getAtivo(id) : Observable<any> {
    return this.http.get(this.baseUrl + 'ativos/' + id + '/',
    {headers: this.httpHeaders});
  };

  // Atualizar informações do Ativo
  atualizarAtivo(ativo) : Observable<any> {
    return this.http.put(this.baseUrl + 'ativos/' + ativo.id + '/', ativo,
    {headers: this.httpHeaders});
  };

  // Cadastrar um novo ativo
  salvarAtivo(ativo) : Observable<any> {
    return this.http.post(this.baseUrl + 'ativos/' , ativo,
    {headers: this.httpHeaders});
  };

  excluirAtivo(id) : Observable<any> {
    return this.http.delete(this.baseUrl + 'ativos/' + id + '/',
    {headers: this.httpHeaders});
  }
}
