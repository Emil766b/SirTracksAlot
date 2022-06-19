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




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  LocationData : any;
  PastData: any;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, public authService: FirebaseService, private router: Router, private httpClinet: HttpClient, public database: Database) {
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

  map!: Mapboxgl.Map;

  ngOnInit(): void {
    (Mapboxgl as any).accessToken = environment.mapbox.accessToken;
      this.map = new Mapboxgl.Map({
      container: 'map-mapbox', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [10.1252442, 56.1135314], // starting position [lng, lat]
      zoom: 15 // starting zoom
    });

    this.marker(10.1252442, 56.1135314);

    this.authService.getLocation().subscribe(data => {
      this.LocationData=data;
      console.log(this.LocationData)
    })
  }

  marker(lng: number, lat: number) {
    const marker = new Mapboxgl.Marker({
      draggable: false
    })
    .setLngLat([lng, lat])
    .addTo(this.map);
  }


}
