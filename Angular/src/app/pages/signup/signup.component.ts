import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service'

export function passwordMatch(): ValidatorFn {
return (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmpassword')?.value;

  if (password && confirmPassword && password ! == confirmPassword) {
    return {
      passwordsDontMatch: true
    }
  }

  return null;
};
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: passwordMatch()})

  constructor(private authService: FirebaseService, private  router: Router) { }

  ngOnInit(): void {
  }

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmpassword() {
    return this.signupForm.get('confirmpassword');
  }

  submit() {
    if (!this.signupForm.valid) return;

    const { name, email, password } = this.signupForm.value;
    this.authService.signup(name, email, password);
    this.router.navigate(['/']);
  }

}
