import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

   temaOscuro: boolean = false;

  cambiarTema() {
    this.temaOscuro = !this.temaOscuro;
  }

  isOscuro() {
    return this.temaOscuro;
  }
}
