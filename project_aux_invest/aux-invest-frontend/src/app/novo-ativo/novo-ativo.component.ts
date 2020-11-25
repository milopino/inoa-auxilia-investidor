import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-novo-ativo',
  templateUrl: './novo-ativo.component.html',
  styleUrls: ['./novo-ativo.component.css']
})
export class NovoAtivoComponent implements OnInit {

  ativo = {nome_ativ: '', sigla: '', preco: null}

  constructor(private api: ApiService, private appComponent: AppComponent) { }

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
}
