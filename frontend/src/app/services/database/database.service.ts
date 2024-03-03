import { Injectable } from '@angular/core';
import { EventsData } from '../../interfaces/eventsData';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const apiSql = 'localhost:3000/api/running_events';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<EventsData> {
    let result = this.http.get<EventsData>(`${apiSql}`);
    console.log(result);
    return result;
  }
}
