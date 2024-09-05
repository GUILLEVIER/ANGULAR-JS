import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'scoreboard-score-modal',
  templateUrl: './score-modal.component.html',
  styleUrls: ['./score-modal.component.css'],
})
export class ScoreModalComponent {
  @Input()
  public inputValue: number = 0;

  @Input()
  public title: string = '';

  @Output()
  public showCloseModal: EventEmitter<number> = new EventEmitter();

  onChangeInput(event: Event) {
    const { value } = event.target as HTMLInputElement;
    if (value !== '') this.inputValue = parseInt(value);
  }

  onClickShowCloseModal() {
    this.showCloseModal.emit(this.inputValue);
  }
}
