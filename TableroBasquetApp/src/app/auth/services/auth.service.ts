import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../../scoreboard/interfaces/scoreboard.interface';
import { Observable, of } from 'rxjs';
import {
  UserLogin,
  UserService,
  UserToken,
} from '../interfaces/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl: string = environments.baseURL;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  // * Users
  get currentUser(): string {
    const token: string = localStorage.getItem('access_token') || '';
    const decodedToken: typeof UserToken = this.jwtHelper.decodeToken(
      token
    ) || { user: { username: '' } };
    return decodedToken.user.username;
  }

  checkAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    if (isTokenExpired || !token) return of(false);
    else return of(true);
  }

  login(user: UserLogin): Observable<UserService> {
    return this.http.post<UserService>(`${this.baseUrl}/users/login`, user);
  }

  addUser(user: User): Observable<UserService> {
    return this.http.post<UserService>(`${this.baseUrl}/users/add`, user);
  }

  // updateUser
  // deleteUser
  // getUsers
  // getUserById

  logout() {
    localStorage.removeItem('access_token');
    localStorage.clear();
  }
}
