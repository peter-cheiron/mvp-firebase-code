// src/app/pages/actvitiy-page.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'activity-list', //this is the html selector
  standalone: true, //adding this and removing css
  imports: [RouterLink], //note the import
  templateUrl: "./activity-page.html" 
})
export class ActivityPage {

  activites = [{ "category": "Theatre", 
    "id": "1",
    "name": "Comédie-Française", 
    "website": "https://www.comedie-francaise.fr", 
    "location": {
        "address": "2 Rue de Richelieu, 75001 Paris", 
        "name": "Comédie-Française",
        "placeid": ""
    },
    "description": "France’s national theatre with classical French plays; iconic and historical venue." }
  ]

  constructor() {}
}