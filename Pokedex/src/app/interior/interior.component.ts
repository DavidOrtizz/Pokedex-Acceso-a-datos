import { Component, Output } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { EventEmitter, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-interior',
  templateUrl: './interior.component.html',
  styleUrls: ['./interior.component.css', 
  '../app.component.css']
})
export class InteriorComponent implements OnInit {
  // Array original
  pokemons: Pokemon[] = [];
  //donde se guardan los tipos seleccionados
  tiposSeleccionados: string[] = [];
  //Array para usar en el buscador y muestre el resultado filtrado
  pokemonsBuscador: Pokemon[] = [];
  // Variable para almacenar el nombre del Pokémon a buscar

  @Output() 
  buscadorPokemon: string = '';
  busquedaActual: string = ''; 
  generacionSeleccionada: number = 0;
  menuAbierto = false;
  icono = true;
  fondoOscuro = true;
  textOscuro = true;
  opcionSeleccionada: number = 0; 
  mostrarEasterEgg = false;
  /*
  shiny= false;
  */
  textoOscuro = '';
  buscamos = new EventEmitter<string>(); // Emitir el nombre del Pokémon a buscar
  constructor(private pokemonService: PokemonService) {}
  
  ngOnInit() {
    //iimprime la primera generacion nada mas empezar
    this.pokemonService.getPokemons(151).subscribe((dataPokemons: Pokemon[]) => {
      this.pokemons = dataPokemons;
      this.pokemonsBuscador = dataPokemons;
    });
  }

  // Menu de tipos de la pokeball
  abrirMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  modoOscuro() {
    if(this.icono == false){
      this.icono = true;
      this.fondoOscuro = true;
      this.textOscuro = true;
    } else {
      this.icono = false;
      this.fondoOscuro = false;
      this.textOscuro = false;
    }
  }

  comprobarFondo():String{
    if(this.fondoOscuro == true){
      const fondo = "#1C1C27";
      return `${fondo}`;
    } else {
      const fondo = "white";
      return `${fondo}`;
    }
  }

  comprobarTexto():String{
    if(this.textOscuro == false){
      const letras = "black";
      return `${letras}`;
    } else {
      const letras = "white";
      return `${letras}`;
    }
  }

  buscarPokemon() {
    const nombreBuscado = this.buscadorPokemon.toLowerCase();
    this.busquedaActual = nombreBuscado; // Almacena la búsqueda actual
    this.aplicarFiltros(); // Aplica los filtros
  }
  
  filtrarPorTipos() {
    // Filtra los Pokemon solo si hay tipos seleccionados
    if (this.tiposSeleccionados.length > 0) {
      this.pokemons = this.pokemonsBuscador.filter(pokemon => pokemon.tipos.some(tipo => this.tiposSeleccionados.includes(tipo)));
    } else {
      // Si no hay tipos seleccionados, muestra todos los Pokemons
      this.pokemons = this.pokemonsBuscador;
    }
    this.aplicarFiltros(); // Aplica ambos filtros
  }

  filtroTipos(tipo: string) {
    if (this.tiposSeleccionados.includes(tipo)) {
      // Si el tipo ya está seleccionado se quíta de la lista
      this.tiposSeleccionados = this.tiposSeleccionados.filter(t => t !== tipo);
    } else {
      // Si el tipo no está seleccionado agrega a la lista
      this.tiposSeleccionados.push(tipo);
    }     
    this.aplicarFiltros(); // Muestra los filtros
  }

  aplicarFiltros() {
    // Filtra por nombre y tipos a la vez
    const nombreBuscado = this.busquedaActual.toLowerCase();
     // Si el nombre del pokemon y el tipo de pokemon estan en la lista entoces aparece
    this.pokemons = this.pokemonsBuscador.filter(pokemon => 
    pokemon.nombre.toLowerCase().includes(nombreBuscado) && (this.tiposSeleccionados.length == 0 || pokemon.tipos.some(tipo => this.tiposSeleccionados.includes(tipo))));
  }

    cambiarGeneracion() {
      const generacion = Number(this.opcionSeleccionada);
      let limiteInferior = 1;
      let limiteSuperior = 151;
    
      switch (generacion) {
        case 1:
          limiteInferior = 1;
          limiteSuperior = 151;
          break;
        case 2:
          limiteInferior = 152;
          limiteSuperior = 251;
          break;
        case 3:
          limiteInferior = 252;
          limiteSuperior = 386;
          break;
        case 4:
          limiteInferior = 387;
          limiteSuperior = 493;
          break;
      
      }

      this.pokemonService.getPokemons(limiteSuperior).subscribe((dataPokemons: Pokemon[]) => {
        // Filtrar los Pokémon según los límites establecidos
        this.pokemons = dataPokemons.filter((pokemon, index) => index + 1 >= limiteInferior && index + 1 <= limiteSuperior);
        this.pokemonsBuscador = this.pokemons;
    
        // Verifica si había una búsqueda activa
        if (this.busquedaActual) {
          this.pokemons = this.pokemons.filter(pokemon => pokemon.nombre.toLowerCase().includes(this.busquedaActual));
        }
        this.filtrarPorTipos();
      });
    }

    easterEgg(){
      this.mostrarEasterEgg = !this.mostrarEasterEgg;
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

    /*
    cambiarImagen() {
      if (this.shiny) {
        this.shiny = false; // Si ya está en modo shiny, volver a la normalidad
      } else {
        this.shiny = true; // Si está en modo normal, cambiar a shiny
      }
    }
*/
  } 
