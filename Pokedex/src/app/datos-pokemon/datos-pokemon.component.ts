import { Component, Output } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { EventEmitter, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon';

@Component({
selector: 'app-detalle',
templateUrl: './datos-pokemon.component.html',
styleUrls: ['./datos-pokemon.component.css']
})
export class DatosPokemonComponent implements OnInit {
    pokemon: Pokemon = {
      id: 0,
      nombre: "",
      tipos: [],
      imagen:"",
      shiny: "",
      peso:0,    
      vida:0,
      ataque:0,
      defensa:0,
      atqEspecial:0,
      defEspecial:0,
      velocidad:0
    };
constructor(
private PokemonService: PokemonService, private activatedRoute: ActivatedRoute) { }

ngOnInit(): void {
const id = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;
this.PokemonService.getPokemon(id).subscribe((pokemonDatos: Pokemon) => {
    this.pokemon = pokemonDatos;

  });


}
}