import { FormControl } from '@angular/forms';

export class confirmPasswordChecker {

  static isValid(control: FormControl) {

    if (control.value == control.root.value['password']) {
        return null;
    } else {
        return { mismatched: true };
    }


}
}
