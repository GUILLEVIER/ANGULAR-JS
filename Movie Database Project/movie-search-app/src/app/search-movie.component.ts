import { Component, Input, OnInit } from "@angular/core"
import { data } from "./mock-data"
import { Movie } from "./Movie"
import { MovieService } from "./movie.service"
import { Subject } from "rxjs"
import { map, debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html'
})
export class SearchMovieComponent implements OnInit {
  searchResults: Movie[] = []
  search$: Subject<string> = new Subject<string>()
  fetching: boolean = false
  search: string = ''
  constructor(private movieService: MovieService) { }

  /*
  ngOnInit(): void {
    this.search$.debounceTime(500).pipe(map(query => {
      this.fetching = true
      return query
    })).subscribe(this.searchQuery.bind(this))
  }
  */

  ngOnInit(): void {
    this.search$.pipe(
      debounceTime(500),
      map(query => {
        this.fetching = true;
        return query;
      })
    ).subscribe(this.searchQuery.bind(this));
  }

  searchQuery(query: string) {
    if (query.length > 0) {
      this.movieService.searchMovie(query).subscribe((results: any) => {
        this.fetching = false
        this.searchResults = results
      })
    } else {
      this.fetching = false
      this.searchResults = []
    }
  }

  setCurrentMovie(movie: Movie) {
    this.movieService.changeSelectedMovie(movie)
  }
}