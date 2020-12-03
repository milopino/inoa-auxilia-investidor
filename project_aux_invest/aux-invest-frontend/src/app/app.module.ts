import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AtivosDetalhesComponent } from './ativos-detalhes/ativos-detalhes.component';
import { FormsModule } from '@angular/forms';
import { NovoAtivoComponent } from './novo-ativo/novo-ativo.component';
import { PerfilInvestidorComponent } from './perfil-investidor/perfil-investidor.component';

@NgModule({
  declarations: [
    AppComponent,
    AtivosDetalhesComponent,
    NovoAtivoComponent,
    PerfilInvestidorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
