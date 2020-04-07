import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.http.get<User>(`${environment.api}/users/current`);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.api}/users`);
  }
}
