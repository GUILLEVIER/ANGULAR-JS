import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {
  showSide!: boolean;

  public gif!: Gif;

  constructor() {
    this.showSide = false;
  }
  @Input()
  public gifs: Gif[] = [];

  showCardClick(gif: Gif): void {
    this.showSide = !this.showSide;
    this.gif = gif;
  }
}
