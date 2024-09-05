import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'gifs-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  constructor(private http: HttpClient) {}

  @Input()
  public gif!: Gif;

  public isClickShared: boolean = false;

  downloadGif(gifUrl: string, nameDownload: string): void {
    this.http.get(gifUrl, { responseType: 'blob' }).subscribe((resp) => {
      const blob = new Blob([resp], { type: 'image/gif' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${nameDownload}.gif`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  onClickShared(): void {
    this.isClickShared = !this.isClickShared;
  }
}
