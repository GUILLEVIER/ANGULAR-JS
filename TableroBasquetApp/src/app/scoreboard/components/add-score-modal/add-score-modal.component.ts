import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'scoreboard-add-score-modal',
  templateUrl: './add-score-modal.component.html',
  styleUrls: [
    './add-score-modal.component.css',
    '../score-modal/score-modal.component.css',
  ],
})
export class AddScoreModalComponent {
  @Input()
  public title: string = '';

  @Output()
  public acceptModal: EventEmitter<string> = new EventEmitter();

  @Output()
  public cancelModal: EventEmitter<string> = new EventEmitter();

  onClickAcceptCloseModal() {
    this.acceptModal.emit('');
  }

  onClickCancelCloseModal() {
    this.cancelModal.emit('');
  }
}
