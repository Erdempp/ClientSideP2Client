import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Field } from '../models/field.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  constructor(private http: HttpClient) {}

  create(
    name: Field['name'],
    location: Field['location'],
    length: number,
    width: number,
    description: string
  ) {
    return this.http.post<Field>(`${environment.api}/fields`, {
      name,
      location,
      length,
      width,
      description,
    });
  }

  addFacility(id: Field['_id'], facility: Field['facilities'][0]) {
    return this.http.post<Field>(`${environment.api}/fields/${id}/facilities`, { facility });
  }

  removeFacility(id: Field['_id'], facility: Field['facilities'][0]) {
    // Use put because .delete does not accept a body
    return this.http.put<Field>(`${environment.api}/fields/${id}/facilities`, { facility });
  }

  getAll() {
    return this.http.get<Field[]>(`${environment.api}/fields`);
  }

  get(id: Field['_id']) {
    return this.http.get<Field>(`${environment.api}/fields/${id}`);
  }

  update(id: Field['_id'], field: Partial<Field>) {
    return this.http.put<Field>(`${environment.api}/fields/${id}`, field);
  }

  delete(id: Field['_id']) {
    return this.http.delete<Field>(`${environment.api}/fields/${id}`);
  }
}
