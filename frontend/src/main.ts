import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// or "const mapboxgl = require('mapbox-gl');"


// mapboxgl.accessToken = as string;


if (!navigator.geolocation) {
  throw new Error('Browser dont support Geolocation');
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
