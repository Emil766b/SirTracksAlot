import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
//import { GeoJson, FeatureCollection } from 'map';
import { MapService } from 'src/app/services/map.service';
import * as Mapboxgl from 'mapbox-gl';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { HttpClient} from '@angular/common/http';

import { Database, child, set, ref, update, onValue, get } from '@angular/fire/database';
import { UsersService } from 'src/app/services/users.service';




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  LocationData : any;
  PastData: any;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  user$ = this.userService.currentUserProfile$;

  constructor(private observer: BreakpointObserver, public firebaseService: FirebaseService, private router: Router, private httpClinet: HttpClient, public userService: UsersService) {
  }
  // Logout
  logout() {
    // Call logout an navigate to login on subscribe
    this.firebaseService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

  ngAfterViewInit() {
    // Observe if screen width is less than 800px
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=> {
      // If screen is 800px or less close sidenav
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        // If screen is over 800px show sidenav
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  map!: Mapboxgl.Map;

  ngOnInit(): void {
    (Mapboxgl as any).accessToken = environment.mapbox.accessToken;
      this.map = new Mapboxgl.Map({
      container: 'map-mapbox',
      // Mapbox style
      style: 'mapbox://styles/mapbox/streets-v11',
      // Center [lng, lat]
      center: [10.1252442, 56.1135314], 
      zoom: 15 
    });

    // Mapbox location
    this.marker(10.1252442, 56.1135314);

    // GetLocation from firebaseService
    this.firebaseService.getLocation().subscribe(data => {
      this.LocationData=data;
    })
  }

  // Mapbox marker
  marker(lng: number, lat: number) {
    const marker = new Mapboxgl.Marker({
      draggable: false
    })
    .setLngLat([lng, lat])
    .addTo(this.map);
  }


}
