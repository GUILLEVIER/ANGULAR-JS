import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Movie } from './Movie'
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";


@Injectable()
export class MovieService {
  private selectedMovie$: Subject<Movie> = new Subject<Movie>()
  private apiKey: string = 'f3a4c6248e449ba173af43842ac66c41'
  private baseApiURL: string = 'https://api.themoviedb.org/3/movie'
  private baseConfigurationURL: string = 'https://api.themoviedb.org/3/configuration'
  private imageBaseURL: string = ''
  private imageSizes: { backdrop: string[], poster: string[] } = { backdrop: [], poster: [] }
  constructor(private http: HttpClient) {
    this.setImageConfiguration()
  }
  get currentMovie() {
    return this.selectedMovie$
  }

  searchMovie(query: string) {
    const params = new HttpParams().set('api_key', this.apiKey).set('query', query)
    return this.http.get<any>(this.baseApiURL, { params }).pipe(map(res => res.results.map((result: Movie) => {
      return {
        ...result,
        backdropURL: this.createPhotoURL(result.backdrop_path || '', true),
        posterURL: this.createPhotoURL(result.poster_path || '', false)
      }
    }))
    )
  }

  changeSelectedMovie(movie: Movie) {
    this.selectedMovie$.next(movie)
  }

  setImageConfiguration() {
    const params = new HttpParams().set('api_key', this.apiKey)
    this.http.get<any>(this.baseConfigurationURL, { params }).pipe(map(res => res)).subscribe((config: any) => {
      this.imageBaseURL = config.images.base_url
      this.imageSizes = {
        backdrop: config.images.backdrop_sizes,
        poster: config.images.poster_sizes
      }
    })
  }
  createPhotoURL(path: string, isBackdrop: boolean) {
    if (!path) {
      return ""
    }
    const { backdrop, poster } = this.imageSizes
    const imageSize = isBackdrop ? backdrop[0] : poster[this.imageSizes.poster?.length - 1]
    return `${this.imageBaseURL}${imageSize}${path}`
  }
}