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
  oscuro = false;
  opcionSeleccionada: number = 0; 
  /*
  shiny= false;
  */
  textoOscuro = 'Tema claro';
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
    if(this.oscuro == false){
      this.oscuro = true;
      this.textoOscuro = 'Tema oscuro no existe asi que te quedas con el claro';
    } else {
      this.oscuro = false;
      this.textoOscuro = 'Tema claro';
    }
  }

    // Método para buscar el Pokémon y emitir el evento
    buscarPokemon() {
      const nombreBuscado = this.buscadorPokemon.toLowerCase();
      this.busquedaActual = nombreBuscado; // Almacena la búsqueda actual
      this.pokemons = this.pokemonsBuscador.filter(pokemon => pokemon.nombre.toLowerCase().includes(nombreBuscado));
    }
    filtrarPorTipos() {
      // Filtra los Pokémon solo si hay tipos seleccionados
      if (this.tiposSeleccionados.length > 0) {
        this.pokemons = this.pokemonsBuscador.filter(pokemon => 
          pokemon.tipos.some(tipo => this.tiposSeleccionados.includes(tipo))
        );
      } else {
        // Si no hay tipos seleccionados, muestra todos los Pokémon originales
        this.pokemons = this.pokemonsBuscador;
      }
    }

    filtroTipos(tipo: string) {
      if (this.tiposSeleccionados.includes(tipo)) {
        // Si el tipo ya está seleccionado, quítalo de la lista
        this.tiposSeleccionados = this.tiposSeleccionados.filter(t => t !== tipo);
      } else {
        // Si el tipo no está seleccionado, agrégalo a la lista
        this.tiposSeleccionados.push(tipo);
      }     
      // Realiza el filtrado solo cuando se selecciona o quita un tipo
      this.filtrarPorTipos();
    }

    
    cambiarGeneracion() {
      this.pokemonService.getPokemons(this.opcionSeleccionada).subscribe((dataPokemons: Pokemon[]) => {
        this.pokemons = dataPokemons;
        this.pokemonsBuscador = dataPokemons;
        //filtrar primero para que el filtro perdure antes del cambio de generaciones
        this.filtrarPorTipos();
        // Verifica si había una búsqueda activa
        if (this.busquedaActual) {
          this.pokemons = this.pokemons.filter(pokemon => pokemon.nombre.toLowerCase().includes(this.busquedaActual));
        }

      });
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
