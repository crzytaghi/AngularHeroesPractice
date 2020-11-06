
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Location } from '@angular/common';

import { Hero } from "../hero";
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // This component simply receives a hero objext through its hero property and displays it. This allows Angular to share data between the parent context and the child directives or components. The @Input() property is writable while an @Output() property is observable.
  hero: Hero;

  constructor(
    private route: ActivatedRoute, // Holds information about the Route to this instance of the HeroDetailComponent. This component is interested in the route's parameters extracted from the URL. The "id" parameter is the id of the hero to display.
    private heroService: HeroService, // Gets hero data from the remote server adn this component will use it to the get the hero-to-display
    private location: Location // Angular service for interacting with the browser.
  ) { }

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id'); // The route.snapshot is a static image of the route information shortly after the component was created. The paramMap is a dictionary of the route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch. Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is what a hero id should be.
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back(); // Allows the user to go back
  }

  save(): void {
    this.heroService.updatedHero(this.hero).subscribe(() => this.goBack());
  }

}
