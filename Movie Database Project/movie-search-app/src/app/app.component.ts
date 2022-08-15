import { Component } from '@angular/core';
import { data } from './mock-data'
import { Movie } from './Movie'
import { MovieService } from './movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentMovie: Movie = data[0]

  constructor(private movieService: MovieService) {
    movieService
      .currentMovie
      .subscribe(movie => {
        this.currentMovie = movie
      })
  }

  startNewSearch() {
    this.movieService.changeSelectedMovie({})
  }
}
