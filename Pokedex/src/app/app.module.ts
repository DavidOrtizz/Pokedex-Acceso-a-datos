import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { PieDePaginaComponent } from './pie-de-pagina/pie-de-pagina.component';
import { InteriorComponent } from './interior/interior.component';
import { PruebasComponent } from './pruebas/pruebas.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PieDePaginaComponent,
    InteriorComponent,
    PruebasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
