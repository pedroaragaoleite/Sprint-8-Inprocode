import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsData } from '../../../interfaces/events-data';
import { DatabaseService } from '../../../services/database/database.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared/shared.service';
import { DatePipe } from '@angular/common';
import { distanceValidator, latitudeValidator, longitudeValidator } from '../../../Validators/custom-validators';





@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  isSubmitted: boolean = false;
  @Input() mode: 'create' | 'update' = 'create';
  @Input() eventData: EventsData | null = null;
  @Output() modalChanged: EventEmitter<void> = new EventEmitter();
  // @Output() getEvents: EventEmitter<any> = new EventEmitter();


  constructor(private cdRef: ChangeDetectorRef, private fb: FormBuilder, private dbService: DatabaseService, private router: Router, private sharedService: SharedService, private datePipe: DatePipe) {

  }

  ngOnInit() {
    console.log(this.mode);

    if (this.mode === 'update' && this.eventData) {
      // const eventDate = new Date(this.eventData.event_date);
      const distanceNumber = Number(this.eventData.distance)
      const latitudeNumber = Number(this.eventData.latitude)
      const longitudeNumber = Number(this.eventData.longitude)
      const startDate = this.changeToLocalString(this.eventData.start as Date);
      const endDate = this.changeToLocalString(this.eventData.end as Date);

      // console.log(eventDate);
      console.log(this.eventData.event_date);
      // console.log(eventDate.toISOString().substring(0, 10));




      this.newEventForm.patchValue({
        // event_date: eventDate.toISOString().substring(0, 10),
        name: this.eventData.name,
        city: this.eventData.city,
        type: this.eventData.type,
        route_type: this.eventData.route_type,
        distance: distanceNumber,
        latitude: latitudeNumber,
        longitude: longitudeNumber,
        start: startDate,
        end: endDate
      });
    }
  }

  changeToLocalString(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm') || '';
  }


  newEventForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    city: ["", [Validators.required, Validators.minLength(3)]],
    type: ["", [Validators.required, Validators.minLength(3)]],
    route_type: ["", [Validators.required, Validators.minLength(3)]],
    distance: [0, [Validators.required, Validators.min(1), distanceValidator()]],
    latitude: [0, [Validators.required, Validators.minLength(1), latitudeValidator()]],
    longitude: [0, [Validators.required, Validators.minLength(1), longitudeValidator()]],
    start: ['', [Validators.required]],
    end: ['', [Validators.required]]
  })

  close() {
    this.newEventForm.reset();
    this.modalChanged.emit();
    this.cdRef.detectChanges();
    // console.log(this.modalChanged);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.newEventForm.valid) {
      let data = { ...this.newEventForm.value }

      const request$ = this.mode === 'create' ?
        this.dbService.createEvent(data) : this.dbService.updateEvent(this.eventData?.id, data);

      request$.subscribe({
        next: () => {
          this.sharedService.notifyEventChange();
          this.close();
          this.router.navigate(['/home']);
        }
      });
    }
  }
}

