import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Activity } from '../../../models/activity';
import { DbActivityService } from '../../../services/db-activity-service';


@Component({
  standalone: true,
  selector: 'activity-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: "./activity-editor.html"
})
export class ActivityEditor {
  private fb = inject(FormBuilder);
  private activityService = inject(DbActivityService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  activity = signal<Activity | undefined>(undefined);

  form = this.fb.group({
    name:        ['', Validators.required],
    category:    ['Theatre', Validators.required],
    location:    ['Paris', Validators.required],
    address:     ['', Validators.required],
    website:     [''],
    description: [''],
  });

  constructor() {
    this.loadActivity();
  }

  private async loadActivity() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    const activity = await this.activityService.get(id);
    if (!activity) return;
    this.activity.set(activity);
    this.form.patchValue({
      name: activity.name,
      category: activity.category,
      location: activity.location?.name ?? '',
      address: activity.location?.address ?? '',
      website: activity.website ?? '',
      description: activity.description ?? ''
    });
  }

  async save() {
    if (this.form.invalid) return;
    const formValue = this.form.value;
    const activity: Activity = {
      name: formValue.name ?? '',
      category: formValue.category ?? '',
      location: {
        name: formValue.location ?? '',
        address: formValue.address ?? '',
        placeId: ''
      }, 
      website: formValue.website ?? '',
      description: formValue.description ?? ''
    };
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.activityService.update(id, activity);
    } else {
      await this.activityService.add(activity);
    }
    this.router.navigateByUrl('/');
  }
}
