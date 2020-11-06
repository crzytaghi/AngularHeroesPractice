import { MessageService } from './../message.service';
import { HeroService } from './../hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';


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
  // heroes = HEROES;

  // Replaced the heroes = HEROES property with a simple declaration
  heroes: Hero[];

  // This assigns the clicked hero from the template to the component's selectedHero
  selectedHero: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  }

  // The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site. When Angular creates a HeroesComponent, the dependency injection system sets the heroService paramter to the singleton instance of HeroService.
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  // Create a method to retrieve the heroes from the service. This waits for the Observable to emit the array of heroes - which could happen now or several minutes from now. The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  // ngOnInit is a lifecycle hook which Angular calls on shortly after creating a component. It's a good place to put initialization logic
  ngOnInit(): void {
    this.getHeroes();
  }

}
