import { AtivosDetalhesComponent } from './ativos-detalhes/ativos-detalhes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'ativo-detalhe/:id', component: AtivosDetalhesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ AtivosDetalhesComponent, ]