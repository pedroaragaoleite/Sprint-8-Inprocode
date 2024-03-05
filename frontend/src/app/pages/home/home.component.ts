import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { DatabaseService } from '../../services/database/database.service';
import { EventsData } from '../../interfaces/events-data';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../components/home/modal/modal.component';
import { SharedService } from '../../services/shared/shared.service';
import { FooterComponent } from '../../shared/footer/footer.component';





@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, DatePipe, RouterLink, ModalComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  faMapLocation: any = faMapLocation;
  eventsResults: EventsData[] = [];

  showModal: boolean = false;
  modalMode: "create" | "update" = "create";
  selectedEvent: EventsData | null = null;

  tableRows: any = document.getElementsByTagName('tbody');
  // rows: any = this.tableRows.getElementsByTagName('td');

  toggleModal() {
    this.showModal = !this.showModal;
  }

  constructor(private sharedService: SharedService, private databaseService: DatabaseService, private http: HttpClient, private datePipe: DatePipe) {
    // console.log(this.rows.length);
  }

  ngOnInit(): void {
    this.sharedService.eventRefresh$.subscribe(() => {
      this.getAllEvents();
    })
    this.getAllEvents();
  }

  goToSection(event: Event): void {
    event.preventDefault();
    const section = (event.target as HTMLAnchorElement).getAttribute('href');
    if (section && document.querySelector(section)) {
      document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  /**
   * Transforms a Date object into a formatted string.
   * 
   * This method takes a JavaScript Date object as an input and uses
   * Angular's DatePipe to transform it into a string formatted as
   * 'yyyy/MM/dd'. If the transformation fails for any reason, it
   * returns an empty string as a fallback.
   * 
   * @param date The Date object to be transformed.
   * @return A string representing the formatted date.
   */

  changeDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy/MM/dd') || '';
  }

  getAllEvents(): void {
    this.databaseService.getEvents()
      .subscribe((events: EventsData[]) => {

        this.eventsResults = events.map((event: any) => {
          const formattedDate = this.changeDate(new Date(event.event_date));
          // console.log(event);

          return { ...event, event_date: formattedDate };
        });
        // console.log(this.eventsResults);

      })
  }

  createEventModal() {
    this.modalMode = 'create';
    this.selectedEvent = null;
    this.showModal = true;
  }

  updateEventModal(event: any): void {
    this.modalMode = 'update';
    this.selectedEvent = event;
    this.showModal = true;

  }

  delEvent(event: any): void {
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

  downloadEvents() {
    const rows = [
      ['Date', 'Name', 'City', 'Route', 'Route Type', 'Distance'],
      this.eventsResults.map(event => [
        event.event_date,
        event.name,
        event.city,
        event.type,
        event.route_type,
        event.distance
      ].join(','))
    ].join('\n');

    console.log(rows);


    const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'events.csv'; // Name of the file to download
    link.click();
  }
}
