import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';

@Component({
  selector: 'change-title',
  templateUrl: './change-title.component.html',
  styleUrls: []

})
export class ChangeTitleComponent implements OnInit {
  title: string | undefined
  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.title?.subscribe((value: string) => {
      this.title = value
    })
  }

  changeTitle(e: any) {
    const newTitle = e.target.value
    // USANDO SUBJECT OBSERVABLE
    this.titleService.title.next(newTitle)
  }
}
