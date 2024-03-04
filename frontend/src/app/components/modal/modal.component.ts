import { Component, OnInit } from '@angular/core';
import { EventsData } from '../../interfaces/events-data';
import { DatabaseService } from '../../services/database/database.service';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  newEventForm!: FormGroup;
  isSubmited:boolean = false;

constructor(private fb : FormBuilder, private dbService: DatabaseService) {} 

ngOnInit() {
  this.initializeForm();
}

private initializeForm():void {
  this.newEventForm = this.fb.group({
    event_date: ["", [Validators.required]],
    name: ["", [Validators.required, Validators.minLength(5)]],
    city: ["", [Validators.required, Validators.minLength(3)]],
    type: ["", [Validators.required, Validators.minLength(3)]],
    route_type: ["", [Validators.required, Validators.minLength(3)]],
    distance: ["", [Validators.required, Validators.minLength(2)]]
  })

}

onSubmit():void {
  console.log("clicked");
  this.isSubmited = true;
  if(this.newEventForm.valid) {
    
  }
  
}
}

