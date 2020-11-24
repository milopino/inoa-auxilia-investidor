import { ApiService } from './api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aux-invest-frontend';
  ativos = []
  investidores = []
  
  /* Exemplo de vetor de ativos
  ativos = [
    {nome_ativ: 'Ativo 1', sigla: TSTE1, PRECO: 10.01"},
    {nome_ativ: 'Ativo 2', sigla: TSTE2, PRECO: 10.01"},
    {nome_ativ: 'Ativo 3', sigla: TSTE3, PRECO: 10.01"},
  ]*/

  constructor(private api:ApiService) {
    this.getAtivos();
  }

  getInvestidores = () => {
    this.api.getAllInvestidores().subscribe(
      data => {
        this.investidores = data
      },
      error => {
        console.log("Erro no serviço:", error.message);
      }
    );
  };

  getAtivos = () => {
    this.api.getAllAtivos().subscribe(
      data => {
        this.ativos = data
      },
      error => {
        console.log("Erro no serviço:", error.message);
      }
    );
  };

  ativoClicado = (ativo) => {
    this.api.getAtivo(ativo.id).subscribe(
      data => {
        console.log(data);
        //this.ativo_selecionado = data;
      },
      error => {
        console.log("Erro no serviço:", error.message);
      }
    );
  };
}
