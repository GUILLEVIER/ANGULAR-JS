import { Component, OnInit, Input } from "@angular/core"
import { Movie } from './Movie'

@Component({
  selector: 'app-display-movie',
  templateUrl: './display-movie.component.html'
})
export class DisplayMovieComponent implements OnInit {
  @Input() currentMovie: Movie = {}
  constructor() {

  }
  ngOnInit(): void {

  }
}