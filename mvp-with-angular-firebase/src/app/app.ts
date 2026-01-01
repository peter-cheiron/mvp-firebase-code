import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivityPage } from "../pages/activity-page/activity-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ActivityPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mvp-with-angular-firebase');
}
