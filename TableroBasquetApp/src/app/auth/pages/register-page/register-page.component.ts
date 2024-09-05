import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  AddUserResponse,
  ErrorServices,
  User,
} from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['../login-page/login-page.component.css'],
})
export class RegisterPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
  public isLoading: boolean = false;
  public errorsUser: User = {
    email: '',
    username: '',
    password: '',
  };

  public registerForm = new FormGroup({
    email: new FormControl<string>(''),
    username: new FormControl<string>(''),
    password: new FormControl<string>(''),
    confirmPassword: new FormControl<string>(''),
  });

  onSubmit(): void {
    const { email, username, password } = this.registerForm.value;
    const bodyParams = {
      email: email ? email : '',
      username: username ? username : '',
      password: password ? password : '',
    };
    this.isLoading = true;
    this.authService
      .addUser(bodyParams)
      .pipe(
        tap((userService: any) => {
          const errorsService: ErrorServices[] = userService.errors || [];
          if (errorsService.length > 0) {
            for (let i = 0; i < errorsService.length; i++) {
              const { path, msg } = errorsService[i];
              const errors: any = this.errorsUser;
              errors[path] = msg;
            }
          }
          this.isLoading = false;
        })
      )
      .subscribe((userService: AddUserResponse) => {
        if (userService.message !== '') this.showSnackbar(userService.message);
        if (userService.CodeResult === 'SUCCESS') this.onClickLogin();
        this.isLoading = false;
      });
  }

  onChangeInput(name: string) {
    const userService: any = this.errorsUser;
    userService[name] = '';
  }

  onClickLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Ok', {
      duration: 2500,
    });
  }
}
