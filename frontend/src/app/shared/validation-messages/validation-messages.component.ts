import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation-messages',
  standalone: true,
  imports: [],
  templateUrl: './validation-messages.component.html',
  styleUrl: './validation-messages.component.scss'
})
export class ValidationMessagesComponent {
  @Input() control!: AbstractControl | null;
  @Input() customMessages: { [key: string] : string} = {};


  messages:any = {
    required: "This filed is required.",
    minLength: "This field does not meet the minimum length requirement.",
    email: "Please enter valid email address"
  }

  getErrors(){
    for(const propertyName in this.control?.errors) {
      if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        console.log(this.messages[propertyName]);
        
        return this.customMessages[propertyName] || this.messages[propertyName]
      }
    }
    return null;
  }
}
