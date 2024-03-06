import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsData } from '../../../interfaces/events-data';
import { DatabaseService } from '../../../services/database/database.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared/shared.service';



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
  // @Output() getEvents: EventEmitter<any> = new EventEmitter();


  constructor(private cdRef: ChangeDetectorRef, private fb: FormBuilder, private dbService: DatabaseService, private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    if (this.mode === 'update' && this.eventData) {
      const eventDate = new Date(this.eventData.event_date);
      const distanceNumber = Number(this.eventData.distance)
      const latitudeNumber = Number(this.eventData.latitude)
      const longitudeNumber = Number(this.eventData.longitude)

      this.newEventForm.patchValue({
        event_date: eventDate.toISOString().substring(0, 10),
        name: this.eventData.name,
        city: this.eventData.city,
        type: this.eventData.type,
        route_type: this.eventData.route_type,
        distance: distanceNumber,
        latitude: latitudeNumber,
        longitude: longitudeNumber
      });
    }
  }



  newEventForm = this.fb.group({
    event_date: ["", [Validators.required]],
    name: ["", [Validators.required, Validators.minLength(5)]],
    city: ["", [Validators.required, Validators.minLength(3)]],
    type: ["", [Validators.required, Validators.minLength(3)]],
    route_type: ["", [Validators.required, Validators.minLength(3)]],
    distance: [0, [Validators.required, Validators.minLength(1)]],
    latitude: [0, [Validators.required, Validators.minLength(1)]],
    longitude: [0, [Validators.required, Validators.minLength(1)]]
  })

  close() {
    this.newEventForm.reset();
    this.modalChanged.emit();
    this.cdRef.detectChanges();
    // console.log(this.modalChanged);
  }

  onSubmit() {
    this.isSubmited = true;
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

