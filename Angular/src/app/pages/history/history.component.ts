import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service'
import { FirebaseI } from 'src/app/Models/Firebase';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  //displayed columns in table
  displayedColumns: string[] = ['Longitude', 'Latitude', 'Altitude', 'Satellites', 'Speed'];

  PastData: any;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  // Current user observable
  user$ = this.userService.currentUserProfile$;

  constructor(private observer: BreakpointObserver, public firebaseService: FirebaseService, private router: Router, public userService: UsersService) {

  }

  // Logout
  logout() {
    // Call logout an navigate to login on subscribe
    this.firebaseService.logout().subscribe(() => {
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
    // Subsribe to getPastdata
    this.firebaseService.getPastData().subscribe(data => {
      this.PastData=data;
    })
  }

}
