import { Component, Input } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  @Input()
  public showSidebar!: string;

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  updateGifs(gif: string): void {
    this.gifsService.searchTag(gif);
  }
}
