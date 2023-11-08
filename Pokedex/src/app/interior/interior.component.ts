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
  buscadorPokemon = ''; 
  opcionSeleccionada: string = '';
  generacionSeleccionada: number = 0;
  menuAbierto = false;
  oscuro = false;
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
      this.textoOscuro = 'Tema oscuro';
    } else {
      this.oscuro = false;
      this.textoOscuro = 'Tema claro';
    }
  }

    // Método para buscar el Pokémon y emitir el evento
  buscarPokemon() {
      // Convierte el nombre a minúsculas para que la búsqueda sea insensible a mayúsculas y minúsculas
      const nombreBuscado = this.buscadorPokemon.toLowerCase();
      // Filtra los Pokémon cuyo nombre coincide con la búsqueda
      this.pokemons = this.pokemonsBuscador.filter(pokemon => pokemon.nombre.toLowerCase().includes(nombreBuscado));

    }
  filtrarPorTipos() {
    if (this.tiposSeleccionados.length === 0) {
      // Si no hay tipos seleccionados, mostrar todos los Pokémon originales
      this.pokemons = this.pokemonsBuscador;
    } else {
      // Filtrar los Pokémon según los tipos seleccionados(viendo si alguno de los elementos coincide)
      this.pokemons = this.pokemonsBuscador.filter(pokemon => pokemon.tipos.some(tipo => this.tiposSeleccionados.includes(tipo))
      );
    }
  }

    filtroTipos(tipo: string) {
      if (this.tiposSeleccionados.includes(tipo)) {
        // Si el tipo ya está seleccionado, quitarlo de la lista
        this.tiposSeleccionados = this.tiposSeleccionados.filter(t => t !== tipo);
      } else {
        // Si el tipo no está seleccionado, agregarlo a la lista
        this.tiposSeleccionados.push(tipo);
      }
      //volver a la version inicial del array usando el condicional de filtrarPorTipos
      this.filtrarPorTipos();
    }

    
      cambiarGeneracion() {
        
      
        // Puedes realizar acciones adicionales en función de la generacion seleccionada
        if (this.opcionSeleccionada === '1') {
          this.pokemonService.getPokemons(151).subscribe((dataPokemons: Pokemon[]) => {
            this.pokemons = dataPokemons;
            this.pokemonsBuscador = dataPokemons;
            console.log('Opción:', this.opcionSeleccionada);
          });
        } else if (this.opcionSeleccionada === '2') {
          
          this.pokemonService.getPokemons(251).subscribe((dataPokemons: Pokemon[]) => {
            this.pokemons = dataPokemons;
            this.pokemonsBuscador = dataPokemons;
          });
        } else if (this.opcionSeleccionada === '3') {
          this.pokemonService.getPokemons(386).subscribe((dataPokemons: Pokemon[]) => {
            this.pokemons = dataPokemons;
            this.pokemonsBuscador = dataPokemons;
          });
        }else if (this.opcionSeleccionada === '4') {
          this.pokemonService.getPokemons(493).subscribe((dataPokemons: Pokemon[]) => {
            this.pokemons = dataPokemons;
            this.pokemonsBuscador = dataPokemons;
          });
        }else if (this.opcionSeleccionada === '5') {
          this.pokemonService.getPokemons(649).subscribe((dataPokemons: Pokemon[]) => {
            this.pokemons = dataPokemons;
            this.pokemonsBuscador = dataPokemons;
          });
        }else if (this.opcionSeleccionada === '6') {
          this.pokemonService.getPokemons(721).subscribe((dataPokemons: Pokemon[]) => {
            this.pokemons = dataPokemons;
            this.pokemonsBuscador = dataPokemons;
            
          });
        }else if (this.opcionSeleccionada === '7') {
          this.pokemonService.getPokemons(809).subscribe((dataPokemons: Pokemon[]) => {
            this.pokemons = dataPokemons;
            this.pokemonsBuscador = dataPokemons;
          });
        }else if (this.opcionSeleccionada === '8') {
          this.pokemonService.getPokemons(898).subscribe((dataPokemons: Pokemon[]) => {
            this.pokemons = dataPokemons;
            this.pokemonsBuscador = dataPokemons;
          });
        }else if (this.opcionSeleccionada === '9') {
          this.pokemonService.getPokemons(1017).subscribe((dataPokemons: Pokemon[]) => {
            this.pokemons = dataPokemons;
            this.pokemonsBuscador = dataPokemons;
          });
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
