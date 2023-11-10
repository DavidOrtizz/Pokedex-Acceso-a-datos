import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { PieDePaginaComponent } from './pie-de-pagina/pie-de-pagina.component';
import { InteriorComponent } from './interior/interior.component';
import { Pagina404Component } from './pagina404/pagina404.component';
import { DatosPokemonComponent } from './datos-pokemon/datos-pokemon.component';


@NgModule({
  declarations: [
    AppComponent, 
    PieDePaginaComponent,
    InteriorComponent,
    Pagina404Component,
    DatosPokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]  
})
export class AppModule { }
