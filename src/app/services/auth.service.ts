import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState:any = null;
  constructor(private _auth: AngularFireAuth) { 
    this._auth.authState.subscribe(auth=>{
      this.authState = auth;
    });
  }
  login(email, password){
    return this._auth.auth.signInWithEmailAndPassword(email, password);
  }
  checkAuth(){
    return this._auth.authState.pipe(auth=>auth);
  }
  logout(){
    return this._auth.auth.signOut();
  }
  
  autenticated(){
    return this.authState !== null;
  }
  registration(email, password){
    return this._auth.auth.createUserWithEmailAndPassword(email, password);
  }
}
