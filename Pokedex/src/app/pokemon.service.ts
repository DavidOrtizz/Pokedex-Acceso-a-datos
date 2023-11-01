import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private http: HttpClient) { }

  getIdPokemon(): Observable<string> {
    return this.http.get()
  }

  getNombrePokemon(): Observable<string> {
    return
  }

  getTipoPokemon(): Observable<string> {
    return
  }
}
