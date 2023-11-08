import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { CabeceraComponent } from './cabecera/cabecera.component';
import { PieDePaginaComponent } from './pie-de-pagina/pie-de-pagina.component';
import { InteriorComponent } from './interior/interior.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { Pagina404Component } from './pagina404/pagina404.component';


@NgModule({
  declarations: [
    AppComponent, 
    CabeceraComponent,
    PieDePaginaComponent,
    InteriorComponent,
    PruebasComponent,
    Pagina404Component,

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
