import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-singup2',
  templateUrl: './singup2.component.html',
  styleUrls: ['./singup2.component.scss']
})


export class Singup2Component implements OnInit {

  profileForm = new FormGroup ({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
  });
  
  

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, public authService: FirebaseService, private router: Router) {

  }


  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=> {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  ngOnInit(): void {
  }

  
  saveProfile() {}

}
