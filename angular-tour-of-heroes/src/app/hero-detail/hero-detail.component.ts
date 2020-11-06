import { Component, OnInit, Input } from '@angular/core';
import { Hero } from "../hero";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // This component simply receives a hero objext through its hero property and displays it. This allows Angular to share data between the parent context and the child directives or components. The @Input() property is writable while an @Output() property is observable.
  @Input() hero: Hero;

  constructor() { }

  ngOnInit(): void {
  }

}
