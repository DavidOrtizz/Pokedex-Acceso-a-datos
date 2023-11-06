import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-interior',
  templateUrl: './interior.component.html',
  styleUrls: ['./interior.component.css', '../app.component.css']
})
export class InteriorComponent {


  constructor(private servicioPokemon: PokemonService) {}
    }
  

