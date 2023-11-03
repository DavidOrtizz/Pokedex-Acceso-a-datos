import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemons: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  getPokemon(i: number): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + i);
  }

  getPokemons(cantidad: number): Observable<Pokemon[]> {
    const requests: Observable<any>[] = [];

    for (let i = 1; i <= cantidad; i++) {
      const pokemonActual = this.getPokemon(i);

      requests.push(pokemonActual);
    }

    return forkJoin(requests).pipe(map((dataPokemons: Pokemon[]) => dataPokemons))
  }
}

