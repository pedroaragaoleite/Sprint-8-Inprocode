import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = process.env['NG_APP_MAP_ACCESS_TOKEN'] as string;


if (!navigator.geolocation) {
  throw new Error('Browser dont support Geolocation');
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
