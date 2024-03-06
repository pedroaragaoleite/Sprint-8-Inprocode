import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from '../../../services/maps/places.service';
import { Map } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { DatabaseService } from '../../../services/database/database.service';


// mapboxgl.accessToken = environment.mapboxAccessToken;

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss'
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef

  private destroy$ = new Subject<void>();


  constructor(private placesService: PlacesService, private dbService: DatabaseService) {
    console.log(this.placesService.userLocation);
    // this.getAllLocations(); 
  }

// mapToken = this.placesService.getConfig();



  ngAfterViewInit(): void {
    this.placesService.getConfig().pipe(
      switchMap((config:any) => {
        mapboxgl.accessToken = config;
        return this.dbService.getEvents();
      }),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      const map = new Map({
        container: this.mapDivElement.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.placesService.userLocation, // starting position [lng, lat]
        zoom: 10, // starting zoom
      });
      data.forEach((location: any) => {

        const el = document.createElement('div');
        el.innerHTML = location.name;

        

        const marker = new mapboxgl.Marker()
          .setLngLat([location.longitude, location.latitude])
          .addTo(map);

          const popup = new mapboxgl.Popup({offset : 25})
          .setText(location.name);

          marker.setPopup(popup);
      });
    })
  }
}
