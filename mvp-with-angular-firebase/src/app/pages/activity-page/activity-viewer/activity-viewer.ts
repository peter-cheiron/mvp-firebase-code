import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbActivityService } from '../../../services/db-activity-service';
import { Activity } from '../../../models/activity';

@Component({
  selector: 'app-activity-viewer',
  imports: [],
  templateUrl: './activity-viewer.html',
  standalone: true
})
export class ActivityViewer {
  private route = inject(ActivatedRoute);
  private activityService = inject(DbActivityService);

  activity = signal<Activity | undefined>(undefined);

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get("id")
    if(id){
      this.activityService.get(id).then(a => {
        this.activity.set(a)
      })
    }
  }

  host(url: string) { try { return new URL(url).host.replace(/^www\./,''); } catch { return url; } }
  maps(p: any) { return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.address || p.name)}`; }

}