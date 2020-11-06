import { Injectable } from '@angular/core';

import { Observable, of } from "rxjs";

import { HEROES } from "./mock-heroes"; // <-- imports the mock heroes array from the file
import { Hero } from "./hero";
import { MessageService } from "./message.service"; // Injecting MessageService into HeroService

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators'; /* catchError displays the error to the console. Tap allows a tap into the flow of observable values and sends a message, via the log() method, to the messages area at the bottom of the page */

// This marks the class as one that participates in the dependancy injection system. The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies. The @Injectable() decorator accepts a metadata object for the service, the same way the @Component() decorator did for your component classes.
@Injectable({ providedIn: 'root' })

export class HeroService {

  // This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService which is injected into the HeroesComponent.
  constructor(private http: HttpClient, private messageService: MessageService) { }

  private heroesUrl = 'api/heroes'; // URL to web api

  // Adds a getHeroes method to return the mock heroes that we imported from the mock-heroes file. Accessing the Hero[] array. 
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  // Here we're accessing each individual hero
  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* PUT - Update */
  updatedHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`udpated hero id=${hero.id}`)),
      catchError(this.handleError<any>(`updateHero`))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /* DELETE: delete the hero from the server. Calls the HttpClient.delete() and accesses the specific ID of the hero. You don't send any data as you did with PUT and POST but you still send httpOptions. */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`))
    );
  }

  /* SEARCH FOR SPECIFIC HEROES BY NAME */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not seach term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /*
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
