import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemons: Pokemon[] = [];

  constructor(private http: HttpClient) {}

//conseguir un pokemon con sus datos

  getPokemon(i: number): Observable<Pokemon> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + i).pipe(map((data: any) => {
      return {
        id: data.id,
        nombre: data.name,
        tipos: data.types.map((dat: any) => dat.type.name),
        imagen: data.sprites.other['official-artwork'].front_default,
        shiny: data.sprites.other['official-artwork'].front_shiny,
        peso: data.weight,      
        vida:data.stats['0'].base_stat,
        ataque:data.stats['1'].base_stat,
        defensa:data.stats['2'].base_stat,
        atqEspecial:data.stats['3'].base_stat,
        defEspecial:data.stats['4'].base_stat,
        velocidad:data.stats['5'].base_stat
        
      }
    }));
  }
//conseguir todos los pokemons
  getPokemons(cantidad: number): Observable<Pokemon[]> {
    const requests: Observable<Pokemon>[] = [];

    for (let i = 1; i <= cantidad; i++) {
      const pokemonActual = this.getPokemon(i);

      requests.push(pokemonActual);
    }

    return forkJoin(requests).pipe(map((dataPokemons: Pokemon[]) => dataPokemons))
  }
}


