import { AbstractControl } from "@angular/forms";


export function PasswordValidator(control:AbstractControl):{[key:string]:boolean} | null{
    const pass= control.get('pass');
    const cpass= control.get('cpass');
    if(pass.pristine || cpass.pristine){
      return null;
    }
    return pass && cpass && pass.value !== cpass.value ? {'mismatch':true}:null
  }
