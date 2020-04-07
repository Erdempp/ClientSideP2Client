import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}

  create(
    name: Team['name'],
    city: Team['city'],
    gender: Team['gender'],
    description: Team['description']
  ) {
    return this.http.post<Team>(`${environment.api}/teams`, { name, city, gender, description });
  }

  getAll() {
    return this.http.get<Team[]>(`${environment.api}/teams`);
  }

  get(id: Team['_id']) {
    return this.http.get<Team>(`${environment.api}/teams/${id}`);
  }

  update(id: Team['_id'], team: Partial<Team>) {
    return this.http.put<Team>(`${environment.api}/teams/${id}`, team);
  }

  delete(id: Team['_id']) {
    return this.http.delete<Team>(`${environment.api}/teams/${id}`);
  }
}
