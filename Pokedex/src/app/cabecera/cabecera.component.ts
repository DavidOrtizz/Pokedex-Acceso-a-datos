import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css', '../app.component.css']
})
export class CabeceraComponent implements OnInit {

  menuAbierto = false;

  @Input()
  buscadorPokemon = '';

  @Output()
  buscamos = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  abrirMenu() {
    if (this.menuAbierto == true) {
      this.menuAbierto = false;
    } else {
      this.menuAbierto = true;
    }
  }
}
