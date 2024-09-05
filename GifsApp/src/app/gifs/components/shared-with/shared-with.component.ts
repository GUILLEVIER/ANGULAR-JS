import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-shared-with',
  templateUrl: './shared-with.component.html',
})
export class SharedWithComponent {
  @Input()
  public gif!: Gif;

  onClickSharedIcon(icon: string): void {
    const encodedUrl = encodeURIComponent(this.gif.images.downsized_medium.url);
    if (icon === 'whatsapp') {
      const whatsappUrl = `whatsapp://send?text=${encodedUrl}`;
      window.location.href = whatsappUrl;
    } else if (icon === 'messenger') {
      let messengerUrl = `https://www.facebook.com/dialog/send?app_id=123456789&link=${encodedUrl}`;
      const encodedCaption = encodeURIComponent('Check out this awesome GIF!');
      messengerUrl += `&caption=${encodedCaption}`;
      window.open(messengerUrl, '_blank');
    } else if (icon === 'x') {
      const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
      window.open(twitterUrl, '_blank');
    }
  }
}
