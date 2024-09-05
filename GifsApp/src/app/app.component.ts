import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showSide!: string;
  title = 'gifs-app';

  constructor() {
    this.showSide = 'd-none';
  }

  showSidebar(newValue: string): void {
    if (this.showSide === '') {
      this.showSide = 'd-none';
    } else {
      this.showSide = newValue;
    }
  }
}
