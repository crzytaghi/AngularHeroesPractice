import { Component, OnInit } from '@angular/core';

import { HeroService } from './../hero.service';
import { Hero } from '../hero';


// @Component is a decorator function that specifies the Angular metadata for the component.
@Component({
  selector: 'app-heroes', // the components CSS element selector
  templateUrl: './heroes.component.html', // the location of the components emplate file
  styleUrls: ['./heroes.component.css'] // the location of the component's private CSS styles
})
export class HeroesComponent implements OnInit {

  // Replaced the heroes = HEROES property with a simple declaration
  heroes: Hero[];

  // The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site. When Angular creates a HeroesComponent, the dependency injection system sets the heroService paramter to the singleton instance of HeroService.
  constructor(private heroService: HeroService) { }

  // ngOnInit is a lifecycle hook which Angular calls on shortly after creating a component. It's a good place to put initialization logic
  ngOnInit(): void {
    this.getHeroes();
  }

  // Create a method to retrieve the heroes from the service. This waits for the Observable to emit the array of heroes - which could happen now or several minutes from now. The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

}
