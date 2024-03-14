import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from '../../../services/maps/places.service';
import { Map } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import { Subject, map, switchMap, takeUntil } from 'rxjs';
import { DatabaseService } from '../../../services/database/database.service';
import { FeatureCollection, Point } from 'geojson';



// mapboxgl.accessToken = environment.mapboxAccessToken;

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss'
})
export class MapViewComponent implements AfterViewInit {

  map!: mapboxgl.Map;
  markersMap: any[] = [];

  restaurantsData = [
    {
      name: 'Restaurant 1',
      latitude: 37.17607800,
      longitude: -3.6514100,
      category: 'restaurants'
    },
    // Add more restaurants...
  ];

  @ViewChild('mapDiv') mapDivElement!: ElementRef

  private destroy$ = new Subject<void>();


  constructor(private placesService: PlacesService, private dbService: DatabaseService) {
    console.log(this.placesService.userLocation);
    // this.getAllLocations(); 
  }

  // mapToken = this.placesService.getConfig();



  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.placesService.getConfig().pipe(
      switchMap((config: string) => {
        mapboxgl.accessToken = config;
        return this.dbService.getEvents();
      }),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.map = new Map({
        container: this.mapDivElement.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.placesService.userLocation, // starting position [lng, lat]
        zoom: 5, // starting zoom
      });


      data.forEach((location: any) => {
        

        // const layersIds = location.category === 'eventCategory1' ? 'category1' : 'category2';

        const el = document.createElement('div');
        el.innerHTML = location.name;

        const marker = new mapboxgl.Marker()
          .setLngLat([location.longitude, location.latitude])
          .addTo(this.map);

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setText(location.name);

        marker.setPopup(popup);
        
        
      });
      this.map.on('load', () => {
        this.showMarkers()
            console.log(this.markersMap);
            
            this.addLayerMap(this.map, this.markersMap, 'places');
            this.addLayerMap(this.map, this.restaurantsData, 'restaurants');
          // this.showMarkers();
         })     
      // this.mapOn(); 
    })  
    
  }

  // mapOn():any {
  //   this.map.on('load', () => {
  //     this.showMarkers()
  //         console.log(this.markersMap);
          
  //         // this.addLayerMap(this.map, this.markersMap, 'places');
  //       // this.showMarkers();
  //      })        
  // }


  addLayerMap(map: mapboxgl.Map, data: any[], layerId: string) {
    console.log(data);
    
    const geoJson: FeatureCollection<Point> = {
      type: 'FeatureCollection',
      features: data.map(item => ({
        type: 'Feature',
        properties: { title: item.name },
        geometry: {
          type: 'Point',
          coordinates: [item.longitude, item.latitude]
        }
      }))
  }
  map.addSource(layerId, {
    type: 'geojson',
    data: geoJson
  });

  map.addLayer({
    id: layerId,
    type: 'symbol',
    source: layerId,
    layout: {
      'icon-image': ['get', 'icon'], // Ensure you have a suitable icon
      'text-size': 12,
    }
  });
}

  showMarkers():any {   

    this.placesService.getMarkers()
    .subscribe(markers => {
      markers.forEach((marker:any) => {
        // console.log((marker));
        this.markersMap.push(marker);
        const name = document.createElement('div');
        name.classList.add('historicPlaces');
        name.innerHTML = marker.name;

        const markerMap = new mapboxgl.Marker({
          color: "#671cde"
        })
          .setLngLat([marker.longitude, marker.latitude])
          .addTo(this.map);
          const popup = new mapboxgl.Popup({ offset: 25 })
          .setText(marker.name);     
          markerMap.setPopup(popup);

      })
      
    })
  }

  toggleLayerVisibility(layerId: string, event: any): void {
    const isChecked = event.target.checked;
    const visibility = isChecked ? 'visible' : 'none';
    this.map.setLayoutProperty(layerId, 'visibility', visibility);
  }

}


