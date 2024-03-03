import { Injectable } from '@angular/core';
import { EventsData } from '../../interfaces/events-data';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiSql = 'http://localhost:3000/api/running_events';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<EventsData[]> {
    let result = this.http.get<EventsData[]>(`${apiSql}`, httpOptions);
    console.log(result);
    return result;
  }
}
