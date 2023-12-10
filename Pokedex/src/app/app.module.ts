import { NgModule, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { PieDePaginaComponent } from './pie-de-pagina/pie-de-pagina.component';
import { InteriorComponent } from './interior/interior.component';
import { Pagina404Component } from './pagina404/pagina404.component';
import { DatosPokemonComponent } from './datos-pokemon/datos-pokemon.component';
import { ServiceWorkerModule } from '@angular/service-worker';

//aaaaa
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
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]  
})
export class AppModule { }
