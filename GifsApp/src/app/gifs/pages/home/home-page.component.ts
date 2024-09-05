import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  constructor(private gifsService: GifsService) {}

  @Input()
  public showSidebar!: string;

  @Output() variableChanged: EventEmitter<any> = new EventEmitter();

  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }

  showSidebarClick(): void {
    this.variableChanged.emit('');
  }
}
