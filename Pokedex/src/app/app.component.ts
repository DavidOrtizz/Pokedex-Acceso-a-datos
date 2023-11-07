import { Component} from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  nombrePokemon = '';
  buscarPokemon(nombre: string) {
    this.nombrePokemon = nombre; 
  }
}