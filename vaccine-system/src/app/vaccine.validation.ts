import { AbstractControl, NgControlStatus, ValidationErrors } from "@angular/forms";

export class VaccineValidators {
    static cannotBeNegative(control: AbstractControl): ValidationErrors | null {
        if (control.value <= 0) {
            return { cannotBeNegative: true }
        }
        return null
    }

    static isDate(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).length != 10 ) {
            return { isDate: true }
        }
        return null
    }
}