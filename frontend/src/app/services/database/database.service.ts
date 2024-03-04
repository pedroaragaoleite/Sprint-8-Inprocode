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
    // console.log(result);
    return result;
  }

  getEvent(event: any): Observable<any> {
    const id = event.id;
    return this.http.get<any>(`${apiSql}/${id}`, httpOptions);
  }
  deleteEvent(event: any): Observable<any> {
    const id = event.id;
    return this.http.delete<any>(`${apiSql}/${id}`, httpOptions);
  }

  createEvent(event: any): Observable<any> {
    return this.http.post<any>(`${apiSql}`, event, httpOptions)
  }

  updateEvent(id: any, event: any): Observable<any> {
    console.log(event);
    // const id = event.id;
    console.log(id);

    return this.http.put<any>(`${apiSql}/${id}`, event, httpOptions);
  }
}
