import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes'; // Importing the mock HEROES from the mock-heroes file.

// @Component is a decorator function that specifies the Angular metadata for the component.
@Component({
  selector: 'app-heroes', // the components CSS element selector
  templateUrl: './heroes.component.html', // the location of the components emplate file
  styleUrls: ['./heroes.component.css'] // the location of the component's private CSS styles
})
export class HeroesComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  // Define a property called heroes to expose the HEROES array for binding.
  heroes = HEROES;

  // This assigns the clicked hero from the template to the component's selectedHero
  selectedHero: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  constructor() { }

  // ngOnInit is a lifecycle hook which Angular calls on shortly after creating a component. It's a good place to put initialization logic
  ngOnInit(): void {
  }

}
