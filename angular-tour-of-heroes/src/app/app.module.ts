import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // <-- Allows you to add forms to your application
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
