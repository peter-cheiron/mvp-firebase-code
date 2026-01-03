import { Injectable } from "@angular/core";
import { Activity } from "../models/activity";
import { DbService } from "./db-service";


@Injectable({ providedIn: "root" })
export class DbActivityService extends DbService<Activity>{
  
  constructor(){
    super();
    this.COLLECTION = "activity";
  }

}
