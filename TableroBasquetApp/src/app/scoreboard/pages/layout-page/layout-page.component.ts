import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'scoreboard-layout-page',
  templateUrl: './layout-page.component.html',
})
export class LayoutPageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  get user(): string {
    return this.authService.currentUser;
  }

  // airplay
  public sidebarItems = [
    { label: 'Marcador', icon: 'view_module', url: './home' },
    { label: 'Mis Marcadores', icon: 'label', url: './my-score' },
    { label: 'Compartir Pantalla', icon: 'airplay', url: './shared-window' },
  ];

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
