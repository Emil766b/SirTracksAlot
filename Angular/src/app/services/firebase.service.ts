import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from, map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FirebaseI } from '../Models/Firebase';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  currentUser$ = authState(this.auth);

  constructor(public auth: Auth, private http: HttpClient) { }

  // Login
  login(username: string, password: string) {
    // Return auth email and password as observable and signIn user
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }
  // Signup
  signup(email: string, password: string) {
    // Return email and password as obervable and create user
    return from(createUserWithEmailAndPassword(this.auth, email, password));

  }

  // Logout
  logout() {
    // return signout as observable
    return from (this.auth.signOut());
  }

  // GetLocation
  getLocation() {
    // Http Get LocationData from realtime database in json format
    return this.http.get(
      `https://gps-data-cc537-default-rtdb.europe-west1.firebasedatabase.app/LocationData.json`
    );
  }

  // GetPastData
  getPastData() {
    // Http get PastData and create ann array of FirebaseI for each id
    return this.http.get<{[id: string]: FirebaseI}>(
      `https://gps-data-cc537-default-rtdb.europe-west1.firebasedatabase.app/LocationData/PastData.json`
      // Get firebaseData
    ).pipe(map((firebaseData) => {
      // pastdataList is type of FirebaseI array
      let pastdataList: FirebaseI[] = [];
      // Loop over each id in firebaseData
      for (let id in firebaseData) {
        // Appends firebaseData to the end of pastdataList
        pastdataList.push({ ... firebaseData[id], id});
      }
      return pastdataList;
    }))
  }

}
