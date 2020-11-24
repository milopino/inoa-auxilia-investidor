import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-ativos-detalhes',
  templateUrl: './ativos-detalhes.component.html',
  styleUrls: ['./ativos-detalhes.component.css']
})
export class AtivosDetalhesComponent implements OnInit {
  ativo_selecionado = {}

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.CarregarAtivo();
  }

  CarregarAtivo() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.api.getAtivo(id).subscribe(
      data => {
        console.log(data);
        this.ativo_selecionado = data;
      },
      error => {
        console.log("Erro no serviço:", error.message);
      }
    );
  }
}
