import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as dayjs from 'dayjs';
import { Howl } from 'howler';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  AddScoreService,
  ErrorServices,
  Fouls,
  Score,
  Team,
  TeamKey,
  Timeouts,
} from '../../interfaces/scoreboard.interface';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'scoreboard-page-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(
    private scoreService: ScoreService,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  get user(): string {
    return this.authService.currentUser;
  }

  public homeTeam: Team = { name: 'Ingresar equipo local', showInput: false };
  public visitTeam: Team = { name: 'Ingresar equipo visita', showInput: false };
  public countdown: string = '01:00';
  public minutes: number = 1;
  public showPlayPause: boolean = false;
  public changeTitle: boolean = false;
  public alertCountdown: string = '';
  public showScoreModal: boolean = false;
  public clickPause: boolean = false;
  public score: Score = { home: 0, visit: 0, disabledClick: true };
  public fouls: Fouls = { foulsHome: 0, foulsVisit: 0 };
  public timeouts: Timeouts = { timeoutsHome: 0, timeoutsVisit: 0 };
  public period: number = 1;
  public addScoreModal: boolean = false;
  public errorsModal: Array<string> = [];
  public isLoading: boolean = false;

  private intervalId: any = null;
  private sound = new Howl({
    src: ['../../../../assets/basketball.mp3'],
  });

  //* Header actions: Home and Away
  onClickTeam(key: TeamKey): void {
    if (key === 'home') {
      const { showInput } = this.homeTeam;
      this.homeTeam.showInput = !showInput;
    } else if (key === 'visit') {
      const { showInput } = this.visitTeam;
      this.visitTeam.showInput = !showInput;
    }
  }

  onKeydownTeam(event: KeyboardEvent, key: TeamKey): void {
    if (event.key === 'Enter') {
      this.onChangeTeamName(event, key);
      this.onClickTeam(key);
    }
  }

  onChangeTeamName(event: Event, key: TeamKey): void {
    const { value } = event.target as HTMLInputElement;
    if (key === 'home') this.homeTeam.name = value;
    else if (key === 'visit') this.visitTeam.name = value;
  }

  onClickNextHome(): void {
    if (this.score.disabledClick) return;
    this.score.home += 1;
  }

  onClickBackHome(): void {
    this.score.home -= 1;
  }

  onClickNextVisit(): void {
    if (this.score.disabledClick) return;
    this.score.visit += 1;
  }

  onClickBackVisit(): void {
    this.score.visit -= 1;
  }

  //* Countdown
  onClickTapToStart(minutes: number, seconds?: number) {
    if (typeof seconds === 'undefined') {
      seconds = 0;
      this.score = { home: 0, visit: 0, disabledClick: false };
      this.fouls = { foulsHome: 0, foulsVisit: 0 };
      this.timeouts = { timeoutsHome: 0, timeoutsVisit: 0 };
      this.period = 1;
    }
    const currentTime: number = new Date().getTime();
    const durationInMilliseconds: number = (minutes * 60 + seconds) * 1000;
    const targetDate: Date = new Date(currentTime + durationInMilliseconds);
    this.changeTitle = true;
    this.intervalId = setInterval(() => {
      const currentTime: number = new Date().getTime();
      const distance: number = targetDate.getTime() - currentTime;
      if (distance <= 0) {
        this.onStop();
        this.countdown = '00:00';
      } else {
        this.showPlayPause = true;
        const minutes: string = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        )
          .toString()
          .padStart(2, '0');
        const seconds: string = Math.floor((distance % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, '0');
        this.countdown = `${minutes}:${seconds}`;
      }
    }, 1000);
  }

  onStop() {
    this.clearIntervalCountdown();
    this.showAddScoreModal();
    this.countdown = '00:00';
    this.changeTitle = false;
    this.score.disabledClick = true;
    this.alertCountdown = '';
    this.showPlayPause = false;
  }

  onClickPause() {
    this.clearIntervalCountdown();
    this.clickPause = true;
  }

  onClickPlay() {
    const splitCountdown = this.countdown.split(':');
    this.clickPause = false;
    this.onClickTapToStart(
      parseInt(splitCountdown[0]),
      parseInt(splitCountdown[1]) + 1
    );
  }

  showAddScoreModal() {
    this.sound.play();
    this.addScoreModal = true;
  }

  onClickAcceptAddScoreModal() {
    this.isLoading = true;
    const bodyParams = {
      homeTeam: this.homeTeam.name,
      visitTeam: this.visitTeam.name,
      scoreHome: this.score.home,
      scoreVisit: this.score.visit,
      foulsHome: this.fouls.foulsHome,
      foulsVisit: this.fouls.foulsVisit,
      timeoutsHome: this.timeouts.timeoutsHome,
      timeoutsVisit: this.timeouts.timeoutsVisit,
      period: this.period,
      dateCreation: dayjs().format('YYYY-MM-DD').toString(),
      createdBy: this.user.replace(/\s/g, ''),
    };
    this.scoreService
      .addScore(bodyParams)
      .subscribe((userService: AddScoreService) => {
        const errorsService: ErrorServices[] = userService.errors || [];
        if (errorsService.length > 0) {
          this.showSnackbar(
            'Error al ingresar marcador, se deben ingresar todos los campos obligatorios.'
          );
          this.isLoading = false;
          this.addScoreModal = false;
          return;
        }
        this.showSnackbar('Marcador agregado correctamente.');
        this.isLoading = false;
        this.addScoreModal = false;
      });
  }

  onClickAcceptCancelScoreModal() {
    this.addScoreModal = !this.addScoreModal;
  }

  showModalCountdown() {
    if (!this.score.disabledClick) return;
    this.showScoreModal = !this.showScoreModal;
  }

  clearIntervalCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  //* Body actions: Fouls
  onClickNextFoulsHome() {
    if (this.score.disabledClick) return;
    this.fouls.foulsHome += 1;
  }

  onClickBackFoulsHome() {
    this.fouls.foulsHome -= 1;
  }

  onClickNextFoulsVisit() {
    if (this.score.disabledClick) return;
    this.fouls.foulsVisit += 1;
  }

  onClickBackFoulsVisit() {
    this.fouls.foulsVisit -= 1;
  }

  //* Footer actions: Timeouts
  onClickNextTimeoutHome() {
    if (this.score.disabledClick) return;
    this.timeouts.timeoutsHome += 1;
  }

  onClickBackTimeoutHome() {
    this.timeouts.timeoutsHome -= 1;
  }

  onClickNextTimeoutVisit() {
    if (this.score.disabledClick) return;
    this.timeouts.timeoutsVisit += 1;
  }

  onClickBackTimeoutVisit() {
    this.timeouts.timeoutsVisit -= 1;
  }

  //* Period
  onClickNextPeriod() {
    if (this.score.disabledClick) return;
    this.period += 1;
  }

  onClickBackPeriod() {
    if (this.period > 1) {
      this.period -= 1;
    }
  }

  //* Click in score
  onClickShowCloseModal(score: number) {
    this.showScoreModal = false;
    this.showPlayPause = false;
    if (score) {
      this.minutes = score;
      if (score < 60) {
        this.countdown = `${score}:00`;
      } else {
        const hours = Math.floor(score / 60);
        const minutes = score % 60;
        this.countdown = `${hours}:${minutes.toString().padStart(2, '0')}:00`;
      }
    }
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Ok', {
      duration: 2500,
    });
  }
}
