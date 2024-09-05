import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ErrorServices,
  LoginUserResponse,
  UserLogin,
} from '../../interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  public errorsUser: UserLogin = { email: '', password: '' };
  public isLoading: boolean = false;

  public loginForm = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });

  onLogin(): void {
    const { email, password } = this.loginForm.value;
    const bodyParams = {
      email: email ? email : '',
      password: password ? password : '',
    };
    this.isLoading = true;
    this.authService
      .login(bodyParams)
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
      .subscribe((userService: LoginUserResponse) => {
        if (userService.message !== '') this.showSnackbar(userService.message);
        if (userService.CodeResult === 'SUCCESS')
          localStorage.setItem('access_token', userService.token);
        this.isLoading = false;
        this.router.navigate(['/scoreboard/home']);
      });
  }

  onChangeInput(name: string) {
    const userService: any = this.errorsUser;
    userService[name] = '';
  }

  onClickCreateAccount() {
    this.router.navigate(['/auth/new-account']);
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Ok', {
      duration: 2500,
    });
  }
}
