import { ApiService } from './api.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aux-invest-frontend';
  ativos = []
  carteiras = []
  investidor_selecionado = {first_name: '', last_name: '', email: '', password: ''}
  id_selecionado;
  
  /* Exemplo de vetor de ativos
  ativos = [
    {nome_ativ: 'Ativo 1', sigla: TSTE1, PRECO: 10.01"},
    {nome_ativ: 'Ativo 2', sigla: TSTE2, PRECO: 10.01"},
    {nome_ativ: 'Ativo 3', sigla: TSTE3, PRECO: 10.01"},
  ]*/

  constructor(private api:ApiService, private router: Router, private route: ActivatedRoute) {
    this.getAtivos();
    this.getCarteiras();
  }

  ngOnInit(): void {
      let id = 1;
      this.id_selecionado = id;
      this.carregarInvestidor(id);
  }

  carregarInvestidor(id) {
    this.api.getInvestidor(id).subscribe(
      data =>   {
        this.investidor_selecionado = data;
      },
      error => {
        console.log("Erro no serviço:", error.message);
      }
    );
  };

  getCarteiras = () => {
    this.api.getAllCarteiras().subscribe(
      data => {
        this.carteiras = data
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
    this.router.navigate(['ativo-detalhe', ativo.id]);
  };
}
