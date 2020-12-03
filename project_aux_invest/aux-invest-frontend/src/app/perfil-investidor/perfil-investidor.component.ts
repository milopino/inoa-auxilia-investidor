import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-perfil-investidor',
  templateUrl: './perfil-investidor.component.html',
  styleUrls: ['./perfil-investidor.component.css']
})
export class PerfilInvestidorComponent implements OnInit {
  investidor_selecionado = {first_name: '', last_name: '', email: '', password: ''}
  id_selecionado;

  constructor(private api: ApiService) { }

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

}
