import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pagina404Component } from './pagina404/pagina404.component';
import { InteriorComponent } from './interior/interior.component';
import { DatosPokemonComponent } from './datos-pokemon/datos-pokemon.component';

const routes: Routes = [
  { path: 'listado', component: InteriorComponent },
  { path: 'datos/:id', component:  DatosPokemonComponent },
  { path: 'error:', component:  Pagina404Component },
  { path: '', redirectTo: '/listado', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }