import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsData } from '../../interfaces/events-data';
import { DatabaseService } from '../../services/database/database.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';



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

  isShowing: boolean = false;

  constructor(private cdRef: ChangeDetectorRef, private fb: FormBuilder, private dbService: DatabaseService, private router: Router, private sharedService: SharedService) { }

  ngOnInit() {

  }


  newEventForm = this.fb.group({
    event_date: ["", [Validators.required]],
    name: ["", [Validators.required, Validators.minLength(5)]],
    city: ["", [Validators.required, Validators.minLength(3)]],
    type: ["", [Validators.required, Validators.minLength(3)]],
    route_type: ["", [Validators.required, Validators.minLength(3)]],
    distance: ["", [Validators.required, Validators.minLength(2)]]
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
          this.router.navigate(['/home']);
        }
      })

      //   if (this.mode === 'create') {

      //     this.dbService.createEvent(data)
      //       .subscribe({
      //         next: () => {
      //           this.router.navigate(['/home']);
      //         }
      //       })

      //   } else {
      //     this.dbService.updateEvent(this.eventData?.id, data)
      //       .subscribe({
      //         next: () => {
      //           this.router.navigate(['/home'])
      //         }
      //       })
      //   }
    }
  }
}

