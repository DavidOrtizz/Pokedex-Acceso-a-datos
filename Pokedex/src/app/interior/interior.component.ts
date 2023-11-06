import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-interior',
  templateUrl: './interior.component.html',
  styleUrls: ['./interior.component.css', '../app.component.css']
})
export class InteriorComponent {
  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemons(150).subscribe((dataPokemons: Pokemon[]) => {
      this.pokemons = dataPokemons;
      console.log(this.pokemons);
    });
  } 
}
