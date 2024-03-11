import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { EventsData } from '../../interfaces/events-data';
import { DatabaseService } from '../../services/database/database.service';
import { DatePipe } from '@angular/common';
import { CalendarData } from '../../interfaces/calendar-data';
import { CalendarService } from '../../services/calendar/calendar.service';
import { ModalComponent } from '../../components/calendar/modal/modal.component';
import { map, of, switchMap } from 'rxjs';
import { SharedService } from '../../services/shared/shared.service';



@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, ModalComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  showModal: boolean = false;
  calendarModalShow: boolean = false;
  isShowDeleteOrEdit: boolean = false;
  modalMode: "create" | "update" = "create";
  selectedEvent: EventsData | null = null;
  calendarEvents: CalendarData[] = [];
  selectedId: number | null = null;
  selEvent: any;
  title: string = '';

  constructor(private sharedService: SharedService, private dbServices: DatabaseService, private datePipe: DatePipe, private calendarServices: CalendarService) { }


  updateEv() {
    if (this.selEvent) {
      this.calendarModalShow = false;
      this.selectedEvent = this.selEvent;
      this.showModal = true;
      this.modalMode = 'update';
      // console.log(this.selEvent);

    }
  }

  deleteEv() {
    if (this.selEvent) {
      this.removeEvent(this.selEvent)
    }
  }

  close() {
    this.calendarModalShow = false;
  }


  toggleModal() {
    this.showModal = !this.showModal;
  }

  changeDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm') || '';
  }

  ngOnInit(): void {
    this.sharedService.eventRefresh$.subscribe(() => {
      this.getCalendarEvents();
    })

    this.getCalendarEvents();
  }

  getCalendarEvents(): void {
    this.dbServices.getEvents()
      .subscribe((events: EventsData[]) => {
        this.calendarEvents = events.map((event: any) => {
          // const formattedDateStart = this.changeDate(new Date(event.start));
          // const formattedDateEnd = this.changeDate(new Date(event.start));
          // console.log(formattedDateStart);

          return { title: event.name, start: this.changeDate(new Date(event.start)), end: this.changeDate(new Date(event.end)) }
        })
        this.calendarOptions = { ...this.calendarOptions, events: this.calendarEvents }
      })
  }

  addEvent() {
    this.showModal = true;
    this.modalMode = 'create';
    this.selectedEvent = null;
    console.log(this.showModal);

  }

  deleteOrEdit(title: string) {
    this.selEvent = this.getIdWithTitle(title).subscribe({
      next: (res) => {
        console.log(res);
        this.selEvent = res;
        this.title = res!.name
      }
    })
    this.calendarModalShow = true;
  }

  getIdWithTitle(title: string) {
    return this.dbServices.getEvents().pipe(
      map((events: EventsData[]) => events.find(event => event.name === title))
    )
  }


  removeEvent(event: any) {
    this.dbServices.deleteEvent(event)
      .subscribe({
        next: () => {
          this.getCalendarEvents();
          this.calendarModalShow = false;
        },
        error: (error) => {
          console.log("event not found: ", error);

        }
      })
  }

  // Manage to change the view to timeGrideDay after clicking in the day
  handleDateClick(arg: any) {
    let calendarApi = arg.view.calendar;
    calendarApi.changeView('timeGridDay', arg.date);
  }

  calendarOptions: CalendarOptions = {
    height: '100%',
    plugins: [dayGridPlugin,
      interactionPlugin,
      timeGridPlugin,
      listPlugin],
    headerToolbar: {
      left: 'title',
      center: 'addEventButton',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek, prev,next today',
    },
    customButtons: {
      addEventButton: {
        text: "Add Event",
        click: () => this.addEvent()
      }
    },
    dateClick: this.handleDateClick.bind(this), // ensure that inside handleDateClick, the keyword this refers to the component instance itself

    eventClick: (opcion) => {
      this.deleteOrEdit(opcion.event.title);
    },
    initialView: 'dayGridMonth',
    weekends: true,
    // editable: true,
    selectable: true
  };

}


// this.removeEvent(opcion.event.title)
// opcion.event.remove()