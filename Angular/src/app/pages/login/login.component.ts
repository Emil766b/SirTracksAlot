import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { FirebaseService } from 'src/app/services/firebase.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  image: string = "../../../assets/map.png";

  // Loginform
  loginForm = new FormGroup({
    // Validate email
    email: new FormControl('', [Validators.required, Validators.email]),
    // validate password
    password: new FormControl('', Validators.required),
  });

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
  }

  // Get email
  get email() {
    // Access email to check errors in loginForm
    return this.loginForm.get('email');
  }

  // Get password
  get password() {
    // Access password to check errors in loginForm
    return this.loginForm.get('password');
  }

  // Submit loginForm
  submit() {
    // If loginForm is invalid return nothing
    if (!this.loginForm.valid) {
      return;
    }
    // Get email and passowrd from loginForm 
    const {email, password } = this.loginForm.value;
    // Call login and on subscribe login user an navigate to map page
    this.firebaseService.login(email, password).subscribe(() => {
      this.router.navigate(['/map'])
    })
  }

}
