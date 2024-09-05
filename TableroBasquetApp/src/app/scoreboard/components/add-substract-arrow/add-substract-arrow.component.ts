import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'scoreboard-add-substract-arrow',
  templateUrl: './add-substract-arrow.component.html',
  styleUrls: ['./add-substract-arrow.component.css'],
})
export class AddSubstractArrowComponent {
  constructor() {}

  @Input()
  public value: boolean = false;

  @Input()
  public disabledClick: boolean = false;

  @Input()
  public clickPause: boolean = false;

  @Output()
  public backArrow: EventEmitter<number> = new EventEmitter();

  @Output()
  public nextArrow: EventEmitter<number> = new EventEmitter();

  onClickBackArrow(): void {
    this.backArrow.emit();
  }

  onClickNextArrow(): void {
    this.nextArrow.emit();
  }
}
