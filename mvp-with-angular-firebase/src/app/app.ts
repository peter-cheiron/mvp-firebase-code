import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBar } from "./components/navigation-bar/navigation-bar";
import { FooterComponent } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBar, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mvp-with-angular-firebase');
}
