import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonComponent} from "./pokemon/pokemon.component";
import {AppComponent} from "./app.component";
import {ListPokemonsComponent} from "./list-pokemons/list-pokemons.component";

const routes: Routes = [
  {
    path:'',
    component:ListPokemonsComponent
  },
  {
    path:'pokemon/:name',
    component : PokemonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
