import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/team.model';
import { Field } from '../models/field.model';
import { environment } from '../../environments/environment';
import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private http: HttpClient) {}

  create(match: Partial<Match>) {
    return this.http.post<Match>(`${environment.api}/matches`, match);
  }

  getAll() {
    return this.http.get<Match[]>(`${environment.api}/matches`);
  }

  get(id: Match['_id']) {
    return this.http.get<Match>(`${environment.api}/matches/${id}`);
  }

  update(id: Match['_id'], field: Partial<Match>) {
    return this.http.put<Match>(`${environment.api}/matches/${id}`, field);
  }

  delete(id: Match['_id']) {
    return this.http.delete<Match>(`${environment.api}/matches/${id}`);
  }
}
