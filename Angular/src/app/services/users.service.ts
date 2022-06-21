import { Injectable } from '@angular/core';
import { docData, Firestore, doc, setDoc, updateDoc } from '@angular/fire/firestore';

import { } from 'firebase/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { firebaseUserI } from '../Models/FirebaseUser';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // Get details of current user
  get currentUserProfile$(): Observable<firebaseUserI | null> {
    // Return currentUser
    return this.firebaseService.currentUser$.pipe(
      switchMap(user => {
        if (!user?.uid) {
          return of(null);
        }
        // Get current user doc from uid
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<firebaseUserI>;
      })
    )
  }

  constructor(private firestore: Firestore, private firebaseService: FirebaseService) { }

  // AddUser
  // Get interface firebaseUserI
  addUser(user: firebaseUserI): Observable<any> {
    // Use doc to connect to firestore, create users collection and get uid
    const ref = doc(this.firestore, 'users', user.uid);
    // Use setDoc to write user to firestore
    return from(setDoc(ref, user));
  }
}
