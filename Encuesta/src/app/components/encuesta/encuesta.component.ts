import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
   };


  public barChartLabels: string[] = ['Pregunta 1', 'Pregunta 2', 'Pregunta 4', 'Pregunta 4'];
  public barChartType = 'bar';

  public barChartData: any[] = [
    {data: [ 65, 59, 80, 81 ], label: 'Entrevistados'}
  ];


  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
  ) { }

  ngOnInit() {
    this.http.get('http://localhost:5000/grafica')
      .subscribe( (data: any) => this.barChartData = data );

    this.escucharSocket();
  }

  escucharSocket() {

    this.wsService.listen('cambio-grafica')
      .subscribe( (data: any) => this.barChartData = data );

  }

}
