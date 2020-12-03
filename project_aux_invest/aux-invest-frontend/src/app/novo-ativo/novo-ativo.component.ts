import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-novo-ativo',
  templateUrl: './novo-ativo.component.html',
  styleUrls: ['./novo-ativo.component.css']
})
export class NovoAtivoComponent implements OnInit {

  ativo = {nome_ativ: '', sigla: '', preco: null, lim_sup: null, lim_inf: null, carteira: null}
  carteiras = []

  constructor(private api: ApiService, private appComponent: AppComponent, private router: Router) { 
    this.getCarteiras();
  }

  ngOnInit(): void {
  }

  salvarAtivo(){
    this.api.salvarAtivo(this.ativo).subscribe(
      data => {
        this.appComponent.ativos.push(data);
      },
      error => {
        console.log("Erro no serviço:", error.message);
      }
    )
  }

  cancelarNovoAtivo(){
    this.router.navigate(['/']);
  }

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
}
