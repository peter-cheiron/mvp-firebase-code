import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivityService } from '../../services/activity-service';
import { DbActivityService } from '../../services/db-activity-service';
import { Activity } from '../../models/activity';
import { NgClass } from '@angular/common';

@Component({
  selector: 'activity-list',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: "./activity-page.html" 
})
export class ActivityPage {

activityService = inject(DbActivityService)
  activites: Activity[] = [];
  
  search = "";
  categories: string[] = []
  selected = ""
  
  constructor() {
  }

  //angular method called when a component is initialised
  ngOnInit(){
    this.activityService.list().then(activities => {
      this.activites = activities;
      this.categories = [...new Set(
        activities.map(a => a.category)
      )];
    })
  }

  async filter(category:string){
    if(this.selected === category){
      this.selected = ""
      this.activityService.list().then(activities => {
        this.activites = activities;
      })
    }else{
      this.selected = category;
      const results = await this.activityService.filter("category", category);
      if(results !== null){
        this.activites = results;
      }
    }
  }
}
