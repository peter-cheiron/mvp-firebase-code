import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/db-profile-service';
import { Component, inject, signal } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './navigation-bar.html'
})
export class NavigationBar {

  user = signal<User | null>(null);
  private auth = inject(Auth);

  profileService = inject(ProfileService)
  
  profile = signal<Profile>(null)

  open = signal(false)

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.user.set(user);
      this.profileService.get(this.user().uid).then(profile => {
        this.profile.set(profile)
      })
    });
  }
}