import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- used for ngModel and two-way binding in password and email inputs
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, User } from '@angular/fire/auth';
import { timer } from 'rxjs';
import { ProfileService } from '../../services/db-profile-service';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login-page.html'
})
export class LoginPage {

  profileService = inject(ProfileService)
  user = signal<User | null>(null);
  private auth = inject(Auth);
  email = "";
  password = ""

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      console.log("do we have a user", user)
      this.user.set(user);
    });
  }

  async signInWithGoogle() {
    var result = await signInWithPopup(this.auth, new GoogleAuthProvider());
    if(result.user){
      const uid = result.user.uid;
      this.profileService.exists(uid).then(exists => {
        if(exists){
          //great nothing to do
        }else{
          const profile:Profile = {
            displayName: result.user.displayName,
            email: '',
            about: '',
            avatar: result.user.photoURL
          }
          this.profileService.create(profile).then(id => {
            console.log(id)
          })
        }
      })

    }
  }
    async signout() {
    timer(1000).subscribe(() => {
      this.auth.signOut();
      //this.router.navigateByUrl("/");//optionally route away from normally logout page
    });
  }

  async signUpWithEmail() {
    await createUserWithEmailAndPassword(this.auth, this.email, this.password);
  }

  async signInWithEmailAndPassword() {
    try{
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
    }catch(err){
      console.log(err)
    }
  }
}