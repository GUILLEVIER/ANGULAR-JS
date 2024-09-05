import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [],
})
export class DynamicPageComponent {
  constructor(private fb: FormBuilder) {}

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favouriteGames: this.fb.array([
      ['Metal gear', Validators.required],
      ['GTA V', Validators.required],
    ]),
  });

  public newFavourite: FormControl = new FormControl('', [Validators.required]);

  get favouriteGamesControl(): FormArray {
    return this.myForm.get('favouriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido.';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }
    return null;
  }

  isValidFieldInArray(formArray: FormArray, i: number) {
    return formArray.controls[i].errors && formArray.controls[i].touched;
  }

  onAddFavourite(): void {
    if (this.newFavourite.invalid) return;
    const newFavourite = this.newFavourite.value;
    this.favouriteGamesControl.push(
      this.fb.control(newFavourite, Validators.required)
    );
    this.newFavourite.reset();
  }

  onDeleteFavourite(index: number): void {
    this.favouriteGamesControl.removeAt(index);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    (this.myForm.controls['favouriteGames'] as FormArray) = this.fb.array([]);

    this.myForm.reset();
  }
}
