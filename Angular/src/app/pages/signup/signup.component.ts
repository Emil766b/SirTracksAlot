import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service'
import { UsersService } from 'src/app/services/users.service';

// Password match validator
export function passwordsMatchValidator(): ValidatorFn {
  // return errors if any or null
  return (control: AbstractControl): ValidationErrors | null => {
    // get password and confirmpassword value from formControl
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    // Check if both fields have value and if both don't match
    if (password && confirmPassword && password !== confirmPassword) {
      // if both don't match return true else return null
      return { passwordsDontMatch: true };
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
  // SignupForm
  signupForm = new FormGroup(
    {
      // Validate name
      name: new FormControl('', Validators.required),
      // Vanidate email
      email: new FormControl('', [Validators.required, Validators.email]),
      // validate password
      password: new FormControl('', Validators.required),
      // validate confirmpassword
      confirmPassword: new FormControl('', Validators.required),
    },
    // validate password and comfirmpassword match
    { validators: passwordsMatchValidator() }
  );


  constructor(private firebaseService: FirebaseService, private router: Router, public userService: UsersService) { }

  ngOnInit(): void {
  }

  // Get name
  get name() {
    // Access name to check errors in SigupForm
    return this.signupForm.get('name');
  }

  // Get email
  get email() {
    // Access email to check errors in SigupForm
    return this.signupForm.get('email');
  }

  // get password
  get password() {
    // Access password to check errors in SigupForm
    return this.signupForm.get('password');
  }

  // Get confirmPassword
  get confirmPassword() {
    // Access confirmPassword to check errors in SigupForm
    return this.signupForm.get('confirmPassword');
  }

  // Submit
  submit() {
    // Check if signupForm is valid
    if (!this.signupForm.valid) {
      return;
    }
    // Get name, email and password from signupForm
    const { name, email, password } = this.signupForm.value;
    // signup user in firebaseService
    this.firebaseService.signup(email, password).pipe(
      // Signup user in userService
        switchMap(({ user: { uid } }) =>
          this.userService.addUser({ uid, email, displayName: name })
        ),
        // On subscribe navigate user to map
      ).subscribe(() => {
        this.router.navigate(['/map']);
      });
  }

}
