import { Injectable } from '@angular/core';
import { HEROES } from "./mock-heroes";
import { Observable, of } from "rxjs";
import { Hero } from "./hero";
import { MessageService } from "./message.service"; // Injecting MessageService into HeroService

// This marks the class as one that participates in the dependancy injection system. The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies. The @Injectable() decorator accepts a metadata object for the service, the same way the @Component() decorator did for your component classes.
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // Adds a getHeroes method to return the mock heroes that we imported from the mock-heroes file. We modified the getHeroes() method to send a message when the heroes are fetched.
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fecthed heroes');
    return of(HEROES);
  }

  // This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService which is injected into the HeroesComponent.
  constructor(private messageService: MessageService) { }
}
