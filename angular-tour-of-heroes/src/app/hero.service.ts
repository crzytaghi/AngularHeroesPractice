import { Injectable } from '@angular/core';

import { Observable, of } from "rxjs";

import { HEROES } from "./mock-heroes"; // <-- imports the mock heroes array from the file
import { Hero } from "./hero";
import { MessageService } from "./message.service"; // Injecting MessageService into HeroService

// This marks the class as one that participates in the dependancy injection system. The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies. The @Injectable() decorator accepts a metadata object for the service, the same way the @Component() decorator did for your component classes.
@Injectable({ providedIn: 'root' })

export class HeroService {

  // This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService which is injected into the HeroesComponent.
  constructor(private messageService: MessageService) { }

  // Adds a getHeroes method to return the mock heroes that we imported from the mock-heroes file. Accessing the Hero[] array
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    return of(HEROES);
  }

  // Here we're accessing each individual hero
  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
