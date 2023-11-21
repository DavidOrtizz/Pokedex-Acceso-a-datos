import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs';
import { PokemonDetalle } from './pokemonDetalle';


@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemons: Pokemon[] = [];
  tiposDebilidadesFortalezas: any;
  private tiposUrl = 'assets/tablaTipos.json'; // Ruta del archivo JSON con la información de tipos
  constructor(private http: HttpClient) {}


//conseguir un pokemon con sus datos
//ruta para gifts
//imagen: data.sprites.versions['generation-v']['black-white'].animated.front_default,
  getPokemon(i: number): Observable<Pokemon> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + i).pipe(map((data: any) => {
      return {
        id: data.id,
        nombre: data.name,
        altura: data.height,
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
  //descripion de pokemon
  getDescripcion(i: number): Observable<string>{
    return this.http.get('https://pokeapi.co/api/v2/pokemon-species/' + i).pipe(map((data: any) => {
      return data.flavor_text_entries[0].flavor_text
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


  getPokemonsDetalle(identificador: number): Observable<PokemonDetalle> {
    return forkJoin([
      this.getPokemon(identificador),
      this.getDescripcion(identificador)
    ]).pipe(map(([pokemonData, descripcion]: [Pokemon, string]) => {
      const tipos = pokemonData.tipos || [];
      this.cargarTiposDebilidadesFortalezas(tipos);
        return {
          ...pokemonData,
          descripcion: descripcion
        };
      })
    );
  }

  cargarTiposDebilidadesFortalezas(tiposPokemon: string[]) {
    return this.http.get(this.tiposUrl).subscribe((data: any) => {
      this.tiposDebilidadesFortalezas = data.Types;

      tiposPokemon.forEach(tipo => {
        this.obtenerDebilidadesDeTipo(tipo);
        this.obtenerFortalezasDeTipo(tipo);
        this.obtenerInmunidadDeTipo(tipo);
      });
    });
  }

  obtenerDebilidadesDeTipo(tipo: string): string[] {
  const debilidades: string[] = [];
  const tipos = this.tiposDebilidadesFortalezas[tipo];


    if (tipos && tipos["2"]) {

      debilidades.push(...tipos["2"]);
    } 
  

    return debilidades;
  }

  obtenerFortalezasDeTipo(tipo: string): string[] {
    const fortalezas: string[] = [];
    const tipos = this.tiposDebilidadesFortalezas[tipo];

    if (tipos && tipos["0.5"]) {

      fortalezas.push(...tipos["0.5"]);
    }

    return fortalezas;
  }
  obtenerInmunidadDeTipo(tipo: string): string[] {
    const inmunidad: string[] = [];
    const tipos = this.tiposDebilidadesFortalezas[tipo];

    if (tipos && tipos["0"]) {

      inmunidad.push(...tipos["0"]);
    }

    return inmunidad;
  }
}
