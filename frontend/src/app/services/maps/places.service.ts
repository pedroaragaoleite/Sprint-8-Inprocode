import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Markers } from '../../interfaces/markers';
import { Restaurants } from '../../interfaces/restaurants';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private apiUrl = 'http://localhost:3000/api/data';
  private apiSql = 'http://localhost:3000/api/map_coords';
  private apiRest = 'http://localhost:3000/api/restaurants';

  getConfig(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  public userLocation?: [number, number];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(private http: HttpClient) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (error) => {
          console.error('It was not possible to get the Geolocation')
          reject();
        }
      )
    })
  }

  getMarkers(): Observable<Markers[]>{
   
    return this.http.get<Markers[]>(`${this.apiSql}`);
  }
  getRestaurants(): Observable<Restaurants[]>{
   
    return this.http.get<Restaurants[]>(`${this.apiRest}`);
  }

  // getAllLocations(): Observable<any> {
  //   return this.http.get<any>(`${this.apiSql}`);
  // }
}
