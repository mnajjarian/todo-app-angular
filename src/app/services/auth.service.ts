import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
  }
  signup(email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigate(["/"]);
      })
      .catch(err => {
        console.log(`Somthing went wrong: ${err.message}`);
      });
  }
  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(["/"]);
      })
      .catch(err => {
        console.log(`Somthing went wrong: ${err.message}`);
      });
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(res => {
        this.loggedIn.next(false);
        this.router.navigate(["/"]);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
