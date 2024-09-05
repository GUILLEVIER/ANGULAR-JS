import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent implements OnInit {
  public hasLoaded: boolean = false;
  public serviceName: string = '';

  public heroForm = new FormGroup({
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  public publishers = [
    { id: 'DC Comics', value: 'DC - Comics' },
    { id: 'Marvel Comics', value: 'Marvel  - Comics' },
  ];

  constructor(
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  public currentHero: Hero = {
    _id: '',
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  };

  get currentHeroForm(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.hasLoaded = true;
    this.serviceName = 'Obtener heroe';
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero?.heroe) return this.router.navigateByUrl('/');
        this.currentHero = hero.heroe;
        this.heroForm.reset(hero.heroe);
        this.hasLoaded = false;
        return;
      });
    this.serviceName = '';
    this.hasLoaded = false;
  }

  onSubmit(): void {
    this.hasLoaded = true;
    if (this.heroForm.invalid) {
      this.hasLoaded = false;
      return;
    }
    if (this.currentHero._id) {
      this.serviceName = 'Modificar heroe';
      this.heroService
        .updateHero(this.currentHeroForm, this.currentHero._id)
        .subscribe((hero) => {
          this.hasLoaded = false;
          this.showSnackbar(`${hero.heroe.superhero} actualizado!`);
        });
      return;
    }
    this.serviceName = 'Crear nuevo heroe';
    this.heroService.addHero(this.currentHeroForm).subscribe((hero) => {
      this.hasLoaded = false;
      this.showSnackbar(`${hero.heroe.superhero} creado!`);
    });
  }

  onDeleteHero() {
    if (!this.currentHero._id) {
      this.showSnackbar(`La id del Heroe es requerida.`);
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });
    dialogRef
      .afterClosed()
      .pipe(
        tap(() => {
          this.hasLoaded = true;
          this.serviceName = 'Eliminar heroe.';
        }),
        filter((res: boolean) => res),
        switchMap(() => this.heroService.deleteHeroById(this.currentHero._id)),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(() => {
        this.hasLoaded = false;
        this.router.navigate(['/heroes']);
      });
  }
  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Aceptar', {
      duration: 2500,
    });
  }
}
