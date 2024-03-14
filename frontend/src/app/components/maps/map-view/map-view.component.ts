import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from '../../../services/maps/places.service';
import { Map } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import { Subject, map, switchMap, takeUntil } from 'rxjs';
import { DatabaseService } from '../../../services/database/database.service';
import { FeatureCollection, Point } from 'geojson';
import { Markers } from '../../../interfaces/markers';
import { Restaurants } from '../../../interfaces/restaurants';



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
  markersMap: Markers[] = [];  
  restaurantsMap: Restaurants[] = [];
  layers: string[] = ['Historic places', 'restaurants'];
  popup:any = null;

  @ViewChild('mapDiv') mapDivElement!: ElementRef

  private destroy$ = new Subject<void>();


  constructor(private placesService: PlacesService, private dbService: DatabaseService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.showMarkers();
    this.showRestaurants();
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
            console.log(this.restaurantsMap);          
            this.addLayerMap(this.map, this.restaurantsMap, 'restaurants', 'restaurant');
            this.addLayerMap(this.map, this.markersMap, 'Historic places', 'historic');
         })         
    })      
  }
  addLayerMap(map: mapboxgl.Map, data: any[], layerId: string, iconImage: string) {
    map.on('mouseenter', layerId, (e:any) => {
      // Create and show the popup the same way as in the click event
      const feature = e.features[0];
      this.popup = new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<h3>${feature.properties.title}</h3>`)
        .addTo(map);
    });

    map.on('mouseleave', layerId, () => {
      if (this.popup) {
        this.popup.remove(); // Remove the popup when the mouse leaves the feature
        this.popup = null; // Reset the popup variable
      }
    });
    
    const geoJson: GeoJSON.FeatureCollection<GeoJSON.Point> = {
      type: 'FeatureCollection',
      features: data.map(item => ({
        
        type: 'Feature',
        properties: { title: item.name,  icon: iconImage },
        geometry: {
          type: 'Point',
          coordinates: [item.longitude, item.latitude]
        }
      }))
    }
  // Add the GeoJSON source to the map
  if (!map.getSource(layerId)) {
    map.addSource(layerId, {
      type: 'geojson',
      data: geoJson
    });
  } else {
    // Update source data if it already exists
    const source = map.getSource(layerId) as mapboxgl.GeoJSONSource;
    source.setData(geoJson);
  }

  // Add a layer for the markers if it doesn't already exist
  if (!map.getLayer(layerId)) {
    map.addLayer({
      id: layerId,
      type: 'symbol',
      source: layerId,
      layout: {
        'icon-image': iconImage, // Use the icon property from each feature
        'icon-size': 1.5,
        // 'text-field': '{title}', // Optional: Display a title
        'text-size': 14,
      }
    });
  }
}

showRestaurants() : any {
  this.placesService.getRestaurants()
  .subscribe((restaurants: Restaurants[]) => {    
    this.restaurantsMap = restaurants.map(((restaurant:any) => {
      return {...restaurant}
    }))    
  } )
}

  showMarkers():any {   
    this.placesService.getMarkers()
    .subscribe((markers: Markers[]) => {
      this.markersMap = markers.map((marker:any) => {        
        return {...marker}
      }) 
    })
  }

  toggleLayerVisibility(layerId: string, event: any): void {
    const isChecked = event.target.checked;    
    const visibility = isChecked ? 'visible' : 'none';    
    if (this.map.getLayer(layerId)) { // Check if the layer exists
      this.map.setLayoutProperty(layerId, 'visibility', visibility);
    }
  }
}


