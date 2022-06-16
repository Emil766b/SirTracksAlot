import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../Models/Post';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public auth: Auth, private http: HttpClient) { }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signup(name: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
    //.pipe
    //switchMap(({ user })) => updateProfile(user, { displayName: name });
  }

  logout() {
    return from (this.auth.signOut());
  }

  getLocation() {
    return this.http.get<{[id: string]: Post}>(
      `https://gps-data-cc537-default-rtdb.europe-west1.firebasedatabase.app/LocationData.json`
    );
  }

}
