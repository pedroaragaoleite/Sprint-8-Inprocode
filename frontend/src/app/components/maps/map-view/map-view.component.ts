import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../../services/maps/places.service';


@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss'
})
export class MapViewComponent implements OnInit {
  constructor(private placesService: PlacesService) { }

  ngOnInit(): void {
    console.log(this.placesService.userLocation);
  }
}
