import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { DatabaseService } from '../../services/database/database.service';
import { EventsData } from '../../interfaces/events-data';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  faMapLocation: any = faMapLocation;
  eventsResults: EventsData[] = [];

  tableRows: any = document.getElementsByTagName('tbody');
  // rows: any = this.tableRows.getElementsByTagName('td');

  constructor(private databaseService: DatabaseService, private http: HttpClient) {
    // console.log(this.rows.length);
  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  goToSection(event:Event):void {
    event.preventDefault();
    const section = (event.target as HTMLAnchorElement).getAttribute('href');
    if(section && document.querySelector(section)) {
      document.querySelector(section)?.scrollIntoView({behavior: 'smooth'})
    }
  }

  getAllEvents(): void {
    this.databaseService.getEvents()
      .subscribe((events: EventsData[]) => {
        this.eventsResults = events;
        console.log(this.eventsResults);

      })
  }

  updateEvent(even:any):void {

  }

  delEvent(event:any):void{
    this.databaseService.deleteEvent(event)
    .subscribe({
      next: () => {
        this.getAllEvents();
      },
      error: (error) => {
        console.error("Error deleting event: ", error)
      }
    }) 
   
  }
}
