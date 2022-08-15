import { Component, Input } from '@angular/core';

@Component({
  selector: 'segundo-componente',
  templateUrl: './segundo-componente.component.html',
  styleUrls: ['./segundo-componente.component.css']
})
export class SegundoComponente {
  @Input() name: string | undefined
  @Input() rut: string | undefined
  @Input() phone_number: string | undefined
  @Input() date_of_birth: string | undefined
  @Input() marital_status: string | undefined
}
