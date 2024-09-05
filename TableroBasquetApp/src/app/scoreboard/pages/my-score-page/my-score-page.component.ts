import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Score } from '../../interfaces/scoreboard.interface';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'scoreboard-my-score',
  templateUrl: './my-score-page.component.html',
  styleUrls: ['./my-score-page.component.css'],
})
export class MyScorePageComponent implements OnInit {
  constructor(
    private scoreService: ScoreService,
    private authService: AuthService
  ) {}

  get user(): string {
    return this.authService.currentUser;
  }

  public allScores: Score[] = [];

  ngOnInit(): void {
    this.scoreService
      .getScoresCreatedBy(this.user.replace(/\s/g, ''))
      .subscribe((response) => {
        console.log(response.scores);
        this.allScores = response.scores;
      });
  }
}
