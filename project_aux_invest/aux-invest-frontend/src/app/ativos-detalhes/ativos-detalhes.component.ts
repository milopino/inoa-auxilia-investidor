import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-ativos-detalhes',
  templateUrl: './ativos-detalhes.component.html',
  styleUrls: ['./ativos-detalhes.component.css']
})
export class AtivosDetalhesComponent implements OnInit {
  ativo_selecionado = {nome_ativ: '', sigla: '', preco: null}
  id_selecionado;

  constructor(private route: ActivatedRoute, 
              private api: ApiService, 
              private router: Router, 
              private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      let id = parseInt(param.get('id'));
      this.id_selecionado = id;
      this.CarregarAtivo(id);
    });
  }

  CarregarAtivo(id) {
    this.api.getAtivo(id).subscribe(
      data =>   {
        this.ativo_selecionado = data;
      },
      error => {
        console.log("Erro no serviço:", error.message);
      }
    );
  };

  atualizarAtivo() {
    this.api.atualizarAtivo(this.ativo_selecionado).subscribe(
      data =>   {
        this.ativo_selecionado = data;
      },
      error => {
        console.log("Erro no serviço:", error.message);
      }
    );
  };

  novoAtivo() {
    this.router.navigate(['novo-ativo']);
  }

  excluirAtivo() {
    this.api.excluirAtivo(this.id_selecionado).subscribe(
      data => {
        let index;

        this.appComponent.ativos.forEach((e, i) => {
          if(e.id == this.id_selecionado)
            index = i;
        });

        this.appComponent.ativos.splice(index, 1);
      },
      error => {
        console.log("Erro no serviço:", error.message);
      }
    )
  }
}
