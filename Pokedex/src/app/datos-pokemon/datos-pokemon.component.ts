import { Component} from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';

import { PokemonDetalle } from '../pokemonDetalle';
import { Trigger } from '../trigger';
import { Evolution } from '../evolution';
import { Movimiento } from '../movimiento';

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
    movimientosURL:"",
    nivelMovimiento:[],
  };
movimiento: Movimiento={
  name: "",
  accuracy: 0,
  power: 0,
  damage_class: "",
  type:"",
}

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
    relative_physical_stats: "",
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

movimientos :Movimiento[]=[];

  botonActivoInicio = true;
  botonActivoFinal = true;
  imagenes: any;
  mostrarDatosEvo = false;
  stats: string = "";
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
    console.log("id"+ id)
    // Obtener detalles del Pokémon utilizando el servicio pasandole la id del pokemon 
    this.pokemonService.getPokemonsDetalle(id).subscribe(
      (pokemonDatos: PokemonDetalle) => {
        this.pokemon = pokemonDatos;  

        console.log('Detalles de evolución:', this.detallesEvo);
        console.log('Valor de relative_physical_stats:', this.detallesEvo.trigger.relative_physical_stats);

        this.pokemonService.getEvoluciones(this.pokemon.cadenas).subscribe((data:Evolution[]) => {
          this.evoluciones = data;
        })
        console.log(this.pokemon.movimientosURL)
        this.pokemonService.getMovimientos(this.pokemon.movimientosURL).subscribe((data:Movimiento[]) => {
          this.movimientos = data;
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
    const resultado = (this.pokemon.vida * 100) / 255
    return `${resultado}%`;
  }

  calcularAnchoAtaque(): string {
    const resultado = (this.pokemon.ataque * 100) / 255
    return `${resultado}%`;
  }

  calcularAnchoDefensa(): string {
    const resultado = (this.pokemon.defensa * 100) / 255
    return `${resultado}%`;
  }

  calcularAnchoAtqEspecial(): string {
    const resultado = (this.pokemon.atqEspecial * 100) / 255
    return `${resultado}%`;
  }

  calcularAnchoDefEspecial(): string {
    const resultado = (this.pokemon.defEspecial * 100) / 255
    return `${resultado}%`;
  }

  calcularAnchoVelocidad(): string {
    const resultado = (this.pokemon.velocidad * 100) / 255
    return `${resultado}%`;
  }

  actualizarPagina(){
    setTimeout(() => {
      location.reload();
      window.scrollTo(0, 0); // Manda al inicio del html
    }, 2);
  }

  // Comprueba el stats
  comprobarStats(num: number): string {
    //Si está vacio muestra que no hay datos
    if (num === undefined || num === null) {
      return "No hay datos disponible";
    }

    // Si contiene datos pues entonces comprueba 
    if (num < 0) {
      return "Más defensa que daño";
    } else {
      return "Más daño que defensa";
    }
  }

    // Comprueba el stats
    comprobarGenero(num: number): string {
      //Si está vacio muestra que no hay datos
      if (num === undefined || num === null) {
        return "No hay datos disponible";
      }
  
      // Si contiene datos pues entonces comprueba 
      if (num < 0) {
        return "Hembra";
      } else {
        return "Macho";
      }
    }

    controlEvoluciones(evolucion: Evolution): boolean {
      // Verificar si la evolución es Sylveon y el Pokémon actual es Eevee
      if (evolucion.nombre === 'sylveon' && this.pokemon.nombre === 'eevee') {
        return false; // No mostrar a sylveon cuando evoluciona desde eevee
      }
      // Cuando podamos mostrar a Sylveon lo añasimos aquí
      return true;
    }

    contadorNivel: number = 0;
    nivelMovimiento(){
      this.contadorNivel++;
    }

    controlTraducirTipos(tipo: string): string {
      switch (tipo) {
        case "fire":
          return "Fuego";
        case "water":
          return "Agua";
        case "grass":
          return "Planta";
        case "bug":
          return "Bicho";
        case "dark":
          return "Siniestro";
        case "dragon":
          return "Dragón";
        case "electric":
          return "Eléctrico";
        case "fairy":
          return "Hada";
        case "fighting":
          return "Lucha";
        case "flying":
          return "Volador";
        case "ghost":
          return "Fantasma";
        case "ground":
          return "Tierra";
        case "ice":
          return "Hielo";
        case "normal":
          return "Normal";
        case "poison":
          return "Veneno";
        case "psychic":
          return "Psísico";
        case "rock":
          return "Roca";
        case "steel":
          return "Acero";
        default:
          return "";
      }
    }  
}
