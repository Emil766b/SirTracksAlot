import { Injectable } from '@angular/core';
import { docData, Firestore, doc, setDoc, updateDoc } from '@angular/fire/firestore';

import { } from 'firebase/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { profileUser } from '../Models/profileUser';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  get currentUserProfile$(): Observable<profileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<profileUser>;
      })
    )
  }

  constructor(private firestore: Firestore, private authService: FirebaseService) { }

  addUser(user: profileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  UpdateUser(user: profileUser) : Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(updateDoc(ref, { ...user }));
  }
}
