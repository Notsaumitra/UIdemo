import { AbstractControl } from "@angular/forms";


export function PasswordValidator(control:AbstractControl):{[key:string]:boolean} | null{
    const password= control.get('pass');
    const confirmpassword= control.get('cpass');
    return password && confirmpassword && password.value !== confirmpassword.value ? {'mismatch':true}:null
  }