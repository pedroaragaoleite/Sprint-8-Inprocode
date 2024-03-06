import { Component } from '@angular/core';
import { PlacesService } from '../../services/maps/places.service';
import { LoadingComponent } from '../../components/maps/loading/loading.component';
import { MapViewComponent } from '../../components/maps/map-view/map-view.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LoadingComponent, MapViewComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }

  constructor(private placesService: PlacesService) { 
  

  }


}
