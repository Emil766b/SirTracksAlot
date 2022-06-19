import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from, map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../Models/Post';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  currentUser$ = authState(this.auth);

  constructor(public auth: Auth, private http: HttpClient) { }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signup(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));

  }

  logout() {
    return from (this.auth.signOut());
  }

  getLocation() {
    return this.http.get<{[id: string]: Post}>(
      `https://gps-data-cc537-default-rtdb.europe-west1.firebasedatabase.app/LocationData.json`
    );
  }

  getPastData() {
    return this.http.get<{[id: string]: Post}>(
      `https://gps-data-cc537-default-rtdb.europe-west1.firebasedatabase.app/LocationData/PastData.json`
    ).pipe(map((posts) => {
      let postData: Post[] = [];
      for (let id in posts) {
        postData.push({ ... posts[id], id});
      }
      return postData;
    }))
  }

}
