import { Component} from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';

import { PokemonDetalle } from '../pokemonDetalle';
import { Trigger } from '../trigger';
import { Evolution } from '../evolution';


@Component({
  selector: 'app-detalle',
  templateUrl: './datos-pokemon.component.html',
  styleUrls: ['./datos-pokemon.component.css']
})
export class DatosPokemonComponent implements OnInit {
 //variables que comienzan vacias y se iran llegando
  pokemon: PokemonDetalle = {
    id: 0,
    nombre: "",
    tipos: [],
    imagen: "",
    shiny: "",
    animado: "",
    peso: 0,
    vida: 0,
    ataque: 0,
    defensa: 0,
    atqEspecial: 0,
    defEspecial: 0,
    velocidad: 0,
    altura: 0,
    descripcion: '',
    cadenas:"",
    movimientoURL:"",
    nivelMovimiento: 0,
  };

  detallesEvo: Trigger = {
    gender: "",
    held_item: "",
    item: "",
    known_move: "",
    known_move_type: "",
    location: "",
    min_affection: "",
    min_beauty:"",
    min_happiness: "",
    min_level:"",
    needs_overworld_rain:"",
    party_species:"",
    party_type:"",
    relative_physical_stats:"",
    time_of_day:"",
    trade_species: "",
    trigger:"",
    turn_upside_down:"",
  
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

  evoluciones:Evolution[]=[];


  botonActivoInicio = true;
  botonActivoFinal = true;
  imagenes: any;
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
    
    // Obtener detalles del Pokémon utilizando el servicio pasandole la id del pokemon 
    this.pokemonService.getPokemonsDetalle(id).subscribe(
      (pokemonDatos: PokemonDetalle) => {
        this.pokemon = pokemonDatos;  

        this.pokemonService.getEvoluciones(this.pokemon.cadenas).subscribe((data:Evolution[]) => {
          this.evoluciones = data;
        })

        this.pokemon = pokemonDatos;
        // Cargar tipos, debilidades y fortalezas del Pokémon
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

      // Obtener debilidades y fortalezas de cada tipo del Pokémon
      this.pokemon.tipos.forEach((tipo) => {
        let inmunidad = this.pokemonService.obtenerInmunidadDeTipo(tipo);
        let debilidades = this.pokemonService.obtenerDebilidadesDeTipo(tipo);
        let fortalezas = this.pokemonService.obtenerFortalezasDeTipo(tipo);
        // Almacenar las debilidades y fortalezas correspondientes
        if (this.cont == 0) {

          this.debilidadesAux = debilidades;
          this.fortalezasAux = fortalezas;
          this.inmunidadAux = inmunidad;
        } else {

          this.debilidadesAux2 = debilidades;
          this.fortalezasAux2 = fortalezas;
          this.inmunidadAux2 = inmunidad;
          this.ordenarTipos();
        }
        this.cont++;
      });

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

  calcularAnchoVida(): string {
    const resultado = (this.pokemon.vida * 100) / 255;
    return `${resultado}%`;
  }

  calcularAnchoAtaque(): string {
    const resultado = (this.pokemon.ataque * 100) / 255;
    return `${resultado}%`;
  }

  calcularAnchoDefensa(): string {
    const resultado = (this.pokemon.defensa * 100) / 255;
    return `${resultado}%`;
  }

  calcularAnchoAtqEspecial(): string {
    const resultado = (this.pokemon.atqEspecial * 100) / 255;
    return `${resultado}%`;
  }

  calcularAnchoDefEspecial(): string {
    const resultado = (this.pokemon.defEspecial * 100) / 255;
    return `${resultado}%`;
  }

  calcularAnchoVelocidad(): string {
    const resultado = (this.pokemon.velocidad * 100) / 255;
    return `${resultado}%`;
  }

  actualizarPagina(){
    setTimeout(() => {
      location.reload();
    }, 1);
  }
}
