import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private weatherService: WeatherService) {
    // Si se quiere inicializar con un valor por defecto, se deberia setear aquí
    //this.cityName = 'Santiago'
  }

  // Local variable
  // Este valor será utilizado en la vista
  weatherData: WeatherData | undefined
  // Este valor almacenará el ingresado en el buscador
  cityName: string = 'Santiago'

  ngOnInit(): void {
    this.getWeatherData(this.cityName)
    this.cityName = ''
  }

  onSubmit() {
    this.getWeatherData(this.cityName)
    this.cityName = ''
  }

  private getWeatherData(cityName: string) {
    this.weatherService.getWeatherData(cityName)
      .subscribe({
        next: (response) => {
          // Asignamos la variable local weatherData a la respuesta de la API
          this.weatherData = response
        }
      })
  }
}
