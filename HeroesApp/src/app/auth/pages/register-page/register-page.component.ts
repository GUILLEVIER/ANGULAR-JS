import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserAdd } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent {
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  private user: UserAdd = { username: '', name: '', password: '' };

  public usernameInput = new FormControl('');
  public nameInput = new FormControl('');
  public passwordInput = new FormControl('');

  public hasLoaded: boolean = false;

  onChangeUsernameInput() {
    const value: string = this.usernameInput.value || '';
    this.user.username = value;
  }
  onChangeNameInput() {
    const value: string = this.passwordInput.value || '';
    this.user.name = value;
  }

  onChangePasswordInput() {
    const value: string = this.passwordInput.value || '';
    this.user.password = value;
  }

  onAddUser(): void {
    this.hasLoaded = true;
    this.authService.addUser(this.user).subscribe((user) => {
      if (!user.token) {
        this.showSnackbar(`${user.message}`);
        this.hasLoaded = false;
        return;
      }
      this.hasLoaded = false;
      this.router.navigate(['/']);
    });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Aceptar', {
      duration: 2500,
    });
  }
}
