import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  constructor() {}

  @Input()
  public gif!: Gif;

  @Output() showCardClick: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif property is required.');
  }

  showCard(gif: Gif): void {
    this.showCardClick.emit(gif);
  }
}
