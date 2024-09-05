import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import {
  ScoreServiceParams,
  AddScoreService,
  GetScoresService,
  MessageScoreService,
} from '../interfaces/scoreboard.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScoreService {
  private baseUrl: string = environments.baseURL;
  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  });

  //* Score
  addScore(score: ScoreServiceParams): Observable<AddScoreService> {
    return this.http.post<AddScoreService>(`${this.baseUrl}/score/add`, score, {
      headers: this.headers,
    });
  }

  getScores(): Observable<GetScoresService> {
    return this.http.get<GetScoresService>(`${this.baseUrl}/score`, {
      headers: this.headers,
    });
  }

  getScoresCreatedBy(createdBy: string): Observable<GetScoresService> {
    return this.http.get<GetScoresService>(
      `${this.baseUrl}/score/${createdBy}`,
      { headers: this.headers }
    );
  }

  updateScore(
    scoreId: string,
    score: ScoreServiceParams
  ): Observable<MessageScoreService> {
    return this.http.patch<MessageScoreService>(
      `${this.baseUrl}/score/${scoreId}`,
      score,
      { headers: this.headers }
    );
  }

  deleteScore(scoreId: string): Observable<MessageScoreService> {
    return this.http.delete<MessageScoreService>(
      `${this.baseUrl}/score/${scoreId}`,
      { headers: this.headers }
    );
  }
}
