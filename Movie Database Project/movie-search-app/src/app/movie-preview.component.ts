import { Component, OnInit, Input } from "@angular/core"
import { Movie } from './Movie'

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html'
})
export class MoviePreviewComponent implements OnInit {
  @Input() movie: Movie = {}
  @Input() index: number = 1
  constructor() {

  }
  ngOnInit(): void {

  }

  backdropStyle = () => ({
    'background': `linear-gradient(180deg, rgba(0,0,0,.7), transparent), url(${this.movie.backdropURL})`,
    'background-size': 'cover'
  })

  animationDelay = () => ({
    'animation-delay': `${this.index * .3}s`
  })
}