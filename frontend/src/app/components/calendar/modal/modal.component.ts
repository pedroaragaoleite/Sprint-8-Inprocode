import { ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControlName, Validators } from '@angular/forms';
import { SharedService } from '../../../services/shared/shared.service';
import { EventsData } from '../../../interfaces/events-data';
import { DatePipe } from '@angular/common';
import { DatabaseService } from '../../../services/database/database.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  isSubmited: boolean = false;
  @Input() mode: 'create' | 'update' = 'create';
  @Input() eventData: EventsData | null = null;
  @Output() modalChanged: EventEmitter<void> = new EventEmitter();




  constructor(private cdRef: ChangeDetectorRef, private fb: FormBuilder, sharedServices: SharedService, private datePipe: DatePipe, private dbServices: DatabaseService, private router: Router) {
    console.log(this.mode);
  }

  ngOnInit(): void {

    if (this.mode === "update" && this.eventData) {
      const eventDate = new Date(this.eventData.event_date);
      const distanceNumber = Number(this.eventData.distance);
      const latitudeNumber = Number(this.eventData.latitude);
      const longitudeNumber = Number(this.eventData.longitude);
      const startDate = this.changeToLocalString(this.eventData.start as Date);
      const endDate = this.changeToLocalString(this.eventData.end as Date);

      // startDate = new Date(startDate)


      console.log(startDate);


      this.newCalendarEventForm.patchValue({
        start: startDate,
        end: endDate,
        title: this.eventData.name,
        city: this.eventData.city,
        type: this.eventData.type,
        route_type: this.eventData.route_type,
        distance: distanceNumber,
        latitude: latitudeNumber,
        longitude: longitudeNumber
      });
    }


  }

  changeToLocalString(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm') || '';
  }

  changeDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  newCalendarEventForm = this.fb.group({
    start: ["", [Validators.required]],
    end: ["", [Validators.required]],
    title: ["", [Validators.required, Validators.minLength(5)]],
    city: ["", [Validators.required, Validators.minLength(3)]],
    type: ["", [Validators.required, Validators.minLength(3)]],
    route_type: ["", [Validators.required, Validators.minLength(3)]],
    distance: [0, [Validators.required, Validators.minLength(1)]],
    latitude: [0, [Validators.required, Validators.minLength(1)]],
    longitude: [0, [Validators.required, Validators.minLength(1)]]
  })

  onSubmit() {
    this.isSubmited = true;
    if (this.newCalendarEventForm.valid) {
      const date = this.newCalendarEventForm.get('start')!.value as string
      const formattedDate = this.changeDate(new Date(date));

      let formData = {
        event_date: this.newCalendarEventForm.get('start')?.value,
        name: this.newCalendarEventForm.get('title')?.value as string,
        city: this.newCalendarEventForm.get('city')?.value as string,
        type: this.newCalendarEventForm.get('type')?.value as string,
        route_type: this.newCalendarEventForm.get('route_type')?.value as string,
        distance: this.newCalendarEventForm.get('distance')?.value as number,
        latitude: this.newCalendarEventForm.get('latitude')?.value as number,
        longitude: this.newCalendarEventForm.get('longitude')?.value as number,
        start: this.newCalendarEventForm.get('start')?.value,
        end: this.newCalendarEventForm.get('end')?.value
      }

      this.dbServices.createEvent(formData)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['/home']);
          }
        })
      console.log(formData);
    }
  }

  close() {
    this.newCalendarEventForm.reset();
    this.modalChanged.emit();
    this.cdRef.detectChanges();

  }

}
