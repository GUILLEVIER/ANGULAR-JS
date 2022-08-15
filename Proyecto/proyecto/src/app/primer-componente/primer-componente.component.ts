import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'primer-componente',
  templateUrl: 'primer-componente.component.html'
})

export class PrimerComponente {
  @Input() name: string | undefined
  @Input() favoriteColor: string | undefined
  @Output() detailsView: EventEmitter<any> = new EventEmitter()
  @Output() nameChange: EventEmitter<any> = new EventEmitter()
  @Output() colorChange: EventEmitter<any> = new EventEmitter()

  colorStyles = {
    color: this.goRed(),
    fontSize: '2rem'
  }

  goRed() {
    return 'red'
  }

  handleDetailsView() {
    this.detailsView.emit(null)
  }

  handleNameChange(e: any) {
    this.nameChange.emit(e.target.value)
  }

  handleColorChange(e: any) {
    this.colorChange.emit(e.target.value)
  }
}