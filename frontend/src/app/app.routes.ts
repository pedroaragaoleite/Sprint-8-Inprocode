import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ChartComponent } from './pages/chart/chart.component';
import { MapComponent } from './pages/map/map.component';
import { ModalComponent } from './components/modal/modal.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'chart', component: ChartComponent },
    { path: 'map', component: MapComponent },
    { path: 'modal', component: ModalComponent },
    { path: '**', redirectTo: '/home' }

];
