import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [],
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];
  public hasLoaded: boolean = false;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.hasLoaded = true;
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes.heroes;
      this.hasLoaded = false;
    });
  }
}
