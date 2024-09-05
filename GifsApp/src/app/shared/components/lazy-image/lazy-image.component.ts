import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  @Input()
  public height: string = '35';

  @Input()
  public width: string = '35';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.url) throw new Error('Url property is required.');
  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 300);
  }
}
