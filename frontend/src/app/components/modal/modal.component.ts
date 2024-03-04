import { Component, OnInit } from '@angular/core';
import { EventsData } from '../../interfaces/events-data';
import { DatabaseService } from '../../services/database/database.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  isSubmited:boolean = false;

constructor(private fb : FormBuilder, private dbService: DatabaseService) {} 

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


onSubmit() {  
  this.isSubmited = true; 
  if(this.newEventForm.valid) {  

    const newEvent: EventsData = {
      event_date: this.newEventForm.value.event_date as unknown as Date,
      name: this.newEventForm.value.name as string,
      city: this.newEventForm.value.city as string,
      type: this.newEventForm.value.type as string,
      route_type: this.newEventForm.value.route_type as string,
      distance: this.newEventForm.value.distance as unknown as number,
    }
    console.log(newEvent);
    this.dbService.createEvent(newEvent)
    .subscribe(newEvent => {
      console.log(newEvent);        
    })      
  }  
}
}

