import { Component, Output } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { EventEmitter, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-interior',
  templateUrl: './interior.component.html',
  styleUrls: ['./interior.component.css', '../app.component.css']
})
export class InteriorComponent {
  pokemons: Pokemon[] = [];
  pokemonsBuscador: Pokemon[] = [];
  buscadorPokemon = ''; // Variable para almacenar el nombre del Pokémon a buscar

  @Output() 
  menuAbierto = false;
  buscamos = new EventEmitter<string>(); // Emitir el nombre del Pokémon a buscar
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemons(151).subscribe((dataPokemons: Pokemon[]) => {
      this.pokemons = dataPokemons;
      this.pokemonsBuscador = dataPokemons;
    });
  } 
  abrirMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
    // Método para buscar el Pokémon y emitir el evento
    buscarPokemon() {
      // Convierte el nombre a minúsculas para que la búsqueda sea insensible a mayúsculas y minúsculas
      const nombreABuscar = this.buscadorPokemon.toLowerCase();
      // Filtra los Pokémon cuyo nombre coincide con la búsqueda
      this.pokemons = this.pokemonsBuscador.filter(pokemon => pokemon.nombre.toLowerCase().includes(nombreABuscar));


    }
}
