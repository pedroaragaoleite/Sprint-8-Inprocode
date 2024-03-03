import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { DatabaseService } from '../../services/database/database.service';
import { EventsData } from '../../interfaces/eventsData';
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

  getAllEvents(): void {
    this.databaseService.getEvents()
      .subscribe((response) => {
        console.log(response);

        this.eventsResults.push(response);
        console.log(this.eventsResults);

      })
  }

}
