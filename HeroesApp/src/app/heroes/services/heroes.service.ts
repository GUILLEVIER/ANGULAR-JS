import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import {
  GetHeroService,
  GetHeroesService,
  Hero,
} from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments.prod';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private baseUrl: string = environments.baseURL;

  constructor(private httpClient: HttpClient) {}

  getHeroes(): Observable<GetHeroesService> {
    return this.httpClient.get<GetHeroesService>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<GetHeroService | undefined> {
    return this.httpClient
      .get<GetHeroService>(`${this.baseUrl}/heroes/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  getSuggestions(query: string): Observable<GetHeroesService> {
    return this.httpClient.get<GetHeroesService>(
      `${this.baseUrl}/heroes/suggestions?superhero=${query}`
    );
  }

  addHero(hero: Hero): Observable<GetHeroService> {
    return this.httpClient.post<GetHeroService>(
      `${this.baseUrl}/heroes/add`,
      hero
    );
  }

  updateHero(hero: Hero, id: string): Observable<GetHeroService> {
    return this.httpClient.patch<GetHeroService>(
      `${this.baseUrl}/heroes/${id}`,
      hero
    );
  }

  deleteHeroById(id: string): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/heroes/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
