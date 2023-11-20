import { Component, Output } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { EventEmitter, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonDetalle } from '../pokemonDetalle';

@Component({
selector: 'app-detalle',
templateUrl: './datos-pokemon.component.html',
styleUrls: ['./datos-pokemon.component.css']
})
export class DatosPokemonComponent implements OnInit {
      pokemon: PokemonDetalle = {
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
      velocidad:0,
      altura:0,
      descripcion:"",

    };
    debilidades: string[] = [];
    fortalezas: string[] = [];

constructor(private PokemonService: PokemonService, private activatedRoute: ActivatedRoute) { }

ngOnInit(): void {
const id = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;
this.PokemonService.getPokemonsDetalle(id).subscribe((pokemonDatos: PokemonDetalle) => {
    this.pokemon = pokemonDatos;
    this.actualizarDebilidadesYFortalezas();
  });

}


actualizarDebilidadesYFortalezas() {
  this.debilidades = [];
  this.fortalezas = [];
  console.log('sdadadsad')
  if (this.pokemon && this.pokemon.tipos && this.pokemon.tipos.length > 0) {
    console.log('Tipos:', this.pokemon.tipos);
    
    this.pokemon.tipos.forEach(tipo => {
      let debilidades = this.PokemonService.obtenerDebilidadesDeTipo(this.pokemon.tipos[0]);
      let fortalezas = this.PokemonService.obtenerFortalezasDeTipo(this.pokemon.tipos[0]);
      this.debilidades.push(...debilidades);
      this.fortalezas.push(...fortalezas);
      console.log('Debilidades actualizadas:', this.debilidades);
      console.log('Fortalezas actualizadas:', this.fortalezas);
    });
  }


}


}