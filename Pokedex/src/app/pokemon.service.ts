import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { PokemonDetalle } from './pokemonDetalle';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemons: Pokemon[] = [];
  tiposDebilidadesFortalezas: any;
  // Ruta del archivo JSON con la tabla de tipos
  private tiposUrl = 'assets/tablaTipos.json'; 

  constructor(private http: HttpClient) {}

  // Obtener información básica de un Pokémon a través de la PokeAPI
  getPokemon(i: number): Observable<Pokemon> {
    // Mapear la respuesta de la API a un objeto de tipo 'Pokemon'
    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + i).pipe(map((data: any) => {
    // Hace las peticiones para cada uno de los datos
      return {
        
        id: data.id,
        nombre: data.name,
        altura: data.height,
        tipos: data.types.map((dat: any) => dat.type.name),
        imagen: data.sprites.other['official-artwork'].front_default,
        shiny: data.sprites.other['official-artwork'].front_shiny,
        peso: data.weight,      
        vida: data.stats['0'].base_stat,
        ataque: data.stats['1'].base_stat,
        defensa: data.stats['2'].base_stat,
        atqEspecial: data.stats['3'].base_stat,
        defEspecial: data.stats['4'].base_stat,
        velocidad: data.stats['5'].base_stat    
      };
    }));
  }

  // Obtener la descripción de un Pokémon
  getDescripcion(i: number): Observable<string> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon-species/' + i).pipe(map((data: any) => {
      // Mapear la respuesta de la API para obtener la descripción del Pokémon
      return data.flavor_text_entries[0].flavor_text;
    }));
  }

  // Obtener un array con TODOS los pokemons
  getPokemons(cantidad: number): Observable<Pokemon[]> {
    const requests: Observable<Pokemon>[] = [];

    // realizar la petición mientras queden pokemons
    for (let i = 1; i <= cantidad; i++) {
      const pokemonActual = this.getPokemon(i);
      requests.push(pokemonActual);
    }
    
    // Combinar todas las peticiones en paralelo usando forkJoin
    return forkJoin(requests).pipe(map((dataPokemons: Pokemon[]) => dataPokemons));
  }

  // Obtener detalles de un Pokémon, incluyendo su descripción
  getPokemonsDetalle(identificador: number): Observable<PokemonDetalle> {
    return forkJoin([
      this.getPokemon(identificador),
      this.getDescripcion(identificador)
      // Combinar la información básica y la descripción en un objeto 'PokemonDetalle'
    ]).pipe(map(([pokemonData, descripcion]: [Pokemon, string]) => {
      return {
        ...pokemonData,
        descripcion: descripcion
      };
    }));
  }

  // Cargar información sobre debilidades, fortalezas e inmunidades de tipos de Pokémon
  cargarTiposDebilidadesFortalezas(tiposPokemon: string[]): Observable<any> {
    return this.http.get(this.tiposUrl).pipe(map((data: any) => {
      this.tiposDebilidadesFortalezas = data.Types;

      // Llamamos a las funciones y hacemos un bucle para que compruebe las debilidades y las fortalezas y las inmunidades
      tiposPokemon.forEach(tipo => {
        this.obtenerDebilidadesDeTipo(tipo);
        this.obtenerFortalezasDeTipo(tipo);
        this.obtenerInmunidadDeTipo(tipo);
      });

      return [];
    }));
  }

  // Obtener debilidades de un tipo de Pokémon
  obtenerDebilidadesDeTipo(tipo: string): string[] {
    const debilidades: string[] = [];
    const tipos = this.tiposDebilidadesFortalezas[tipo];

    if (tipos && tipos["2"]) {
      debilidades.push(...tipos["2"]);
    } 

    return debilidades;
  }

  // Obtener fortalezas de un tipo de Pokémon
  obtenerFortalezasDeTipo(tipo: string): string[] {
    const fortalezas: string[] = [];
    const tipos = this.tiposDebilidadesFortalezas[tipo];

    if (tipos && tipos["0.5"]) {
      fortalezas.push(...tipos["0.5"]);
    }

    return fortalezas;
  }

  // Obtener inmunidades de un tipo de Pokémon
  obtenerInmunidadDeTipo(tipo: string): string[] {
    const inmunidad: string[] = [];
    //Nos aseguramos de que se definen antes de acceder
    if (this.tiposDebilidadesFortalezas && this.tiposDebilidadesFortalezas[tipo] && this.tiposDebilidadesFortalezas[tipo]["0"]) {
      inmunidad.push(...this.tiposDebilidadesFortalezas[tipo]["0"]);
    }
  
    return inmunidad;
  }
}
