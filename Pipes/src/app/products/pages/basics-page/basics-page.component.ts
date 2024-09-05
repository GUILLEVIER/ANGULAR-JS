import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrls: ['./basics-page.component.css'],
})
export class BasicsPageComponent {
  public nameLower: string = 'alexander';
  public nameUpper: string = 'ALEXANDER';
  public nameTitle: string = 'aLexANdEr';

  public customDate: Date = new Date();
}
