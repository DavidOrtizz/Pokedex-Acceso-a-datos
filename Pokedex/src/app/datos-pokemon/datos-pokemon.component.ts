import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter, Input, OnInit } from '@angular/core';

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
    descripcion: '',
  };
  cont: number = 0;
  debilidadesAux: string[] = [];
  fortalezasAux: string[] = [];
  inmunidadAux: string[] = [];
  muyEficaz: string[] = [];
  muyResistente: string[] = [];

  debilidadesAux2: string[] = [];
  fortalezasAux2: string[] = [];
  inmunidadAux2: string[] = [];

  botonActivoInicio = true;
  botonActivoFinal = true;
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
    this.pokemonService.getPokemonsDetalle(id).subscribe(
      (pokemonDatos: PokemonDetalle) => {
        this.pokemon = pokemonDatos;

        this.pokemonService.cargarTiposDebilidadesFortalezas(pokemonDatos.tipos).subscribe(() => {
          this.actualizarDebilidadesYFortalezas();
        })
      }
    );
  }

  actualizarDebilidadesYFortalezas() {
    this.debilidadesAux = [];
    this.fortalezasAux = [];
    this.inmunidadAux = [];
    this.muyResistente = [];
    this.muyEficaz = [];

    if (this.pokemon && this.pokemon.tipos && this.pokemon.tipos.length > 0) {
      console.log('Tipos:', this.pokemon.tipos);

      // Obtener debilidades y fortalezas de cada tipo del Pokémon
      this.pokemon.tipos.forEach((tipo) => {
        let inmunidad = this.pokemonService.obtenerInmunidadDeTipo(tipo);
        let debilidades = this.pokemonService.obtenerDebilidadesDeTipo(tipo);
        let fortalezas = this.pokemonService.obtenerFortalezasDeTipo(tipo);
        // Almacenar las debilidades y fortalezas correspondientes
        if (this.cont == 0) {
          console.log('debilidades:', debilidades);
          console.log('fortalezas:', fortalezas);
          console.log('inmunidad:', inmunidad);
          this.debilidadesAux = debilidades;
          this.fortalezasAux = fortalezas;
          this.inmunidadAux = inmunidad;
        } else {
          console.log('debilidades2:', debilidades);
          console.log('fortalezas2:', fortalezas);
          console.log('inmunidad2:', inmunidad);
          this.debilidadesAux2 = debilidades;
          this.fortalezasAux2 = fortalezas;
          this.inmunidadAux2 = inmunidad;
          this.ordenarTipos();
        }
        this.cont++;
      });

      // Imprimir los resultados por consola
      console.log('Muy resistente:', this.muyResistente);
      console.log('DebilidadesAux:', this.debilidadesAux);
      console.log('FortalezasAux:', this.fortalezasAux);
      console.log('Muy Eficaz:', this.muyEficaz);
      console.log('InmunidadAux. ', this.inmunidadAux);
    }
  }


  ordenarTipos() {
    this.inmunidadAux2.forEach((elemento) => {
      if (!this.inmunidadAux.includes(elemento)) {
        this.inmunidadAux.push(elemento);
      }
    });
    this.muyEficaz = this.debilidadesAux.filter((item) =>
      this.debilidadesAux2.includes(item)
    );
    this.debilidadesAux2.forEach((elemento) => {
      if (!this.debilidadesAux.includes(elemento)) {
        this.debilidadesAux.push(elemento);
      }
    });
    this.muyResistente = this.fortalezasAux.filter((item) =>
      this.fortalezasAux2.includes(item)
    );
    this.fortalezasAux2.forEach((elemento) => {
      if (!this.fortalezasAux.includes(elemento)) {
        this.fortalezasAux.push(elemento);
      }
    });
    this.debilidadesAux = this.debilidadesAux.filter((item) => !this.muyEficaz.includes(item));
    this.fortalezasAux = this.fortalezasAux.filter(
      (item) => !this.muyResistente.includes(item)
    );
    this.debilidadesAux = this.debilidadesAux.filter((item) => !this.inmunidadAux.includes(item));

    this.fortalezasAux = this.fortalezasAux.filter(
      (item) => !this.inmunidadAux.includes(item)
    );
    let listaX2copia: String[] = this.debilidadesAux;
    this.debilidadesAux = this.debilidadesAux.filter(
      (elemento) => !this.fortalezasAux.includes(elemento)
    );
    this.fortalezasAux = this.fortalezasAux.filter(
      (elemento) => !listaX2copia.includes(elemento)
    );
  }

  idPokemon(id: number) {
    this.router.navigate(['/datos/', id]);
  }

  anteriorPokemon() {
    if ((this.pokemon.id - 1) != 0) { // Para controlar a que no se pase del mínimo
      this.idPokemon(this.pokemon.id - 1);
      setTimeout(() => {
        location.reload();
      }, 1);
    } else {
        this.botonActivoInicio = !this.botonActivoInicio;
    }
  }

  siguientePokemon() {
    if ((this.pokemon.id + 1) != 1009) { // Para controlar a que no se pase del máximo
      this.idPokemon(this.pokemon.id + 1);
      setTimeout(() => {
        location.reload();
      }, 1);
    } else {
      this.botonActivoFinal = !this.botonActivoFinal;
    }
  }

  botonActivo(){
    if(this.pokemon.id  == 1) {
      this.botonActivoInicio = !this.botonActivoInicio;
    }
  }
}