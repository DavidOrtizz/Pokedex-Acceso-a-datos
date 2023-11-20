import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    imagen: "",
    shiny: "",
    peso: 0,
    vida: 0,
    ataque: 0,
    defensa: 0,
    atqEspecial: 0,
    defEspecial: 0,
    velocidad: 0,
    altura: 0,
    descripcion: ""
  };

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDetalles();
  }

  cargarDetalles() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;
    this.idPokemon(id);
    this.pokemonService.getPokemonsDetalle(id).subscribe((pokemonDatos: PokemonDetalle) => {
      this.pokemon = pokemonDatos;
    });
  }

  idPokemon(id: number) {
    this.router.navigate(['/datos/', id]);
  }

  anteriorPokemon() {
    if ((this.pokemon.id - 1) != 0) { // Para controlar a que no llegue a pokemon 0
      this.idPokemon(this.pokemon.id - 1);
      setTimeout(() => {
        location.reload();
      }, 1);
    }
  }

  siguientePokemon() {
    this.idPokemon(this.pokemon.id + 1);
    setTimeout(() => {
      location.reload();
    }, 1);
  }
}