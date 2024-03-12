import { AbstractControl, ValidatorFn } from "@angular/forms";

export function distanceValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const numbers = /^(300(\.0{1,3})?|[12]?\d{1,2}(\.\d{1,3})?|[1-9](\.\d{1,3})?)$/
        // console.log((typeof control.value));

        const valid = numbers.test(control.value);
        // console.log(valid);


        return valid ? null : { 'invalidDistance': { value: control.value } }
    }
}

export function latitudeValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const regexLatitude = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
        const valid = regexLatitude.test(control.value);

        return valid ? null : { 'invalidLatitude': { value: control.value } }
    }
}
export function longitudeValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const regexLongitude = /^[-+]?((1[0-7]\d|[1-9]?\d)(\.\d+)?|180(\.0+)?)$/;
        const valid = regexLongitude.test(control.value);

        return valid ? null : { 'invalidLongitude': { value: control.value } }
    }
}