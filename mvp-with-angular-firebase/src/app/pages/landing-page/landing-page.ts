import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  standalone: true
})
export class LandingPage {

howItWorksSteps = [
  { step: '01', tag: 'Create', title: 'Add your property', description: '...' },
  { step: '02', tag: 'Curate', title: 'Add local activities', description: '...' },
  { step: '03', tag: 'Share', title: 'Print a QR or send a link', description: '...' },
];

hostBenefits = [
  { title: 'More genuine stays', description: '...' },
  // …
];

activityTags = ['Morning coffee', 'Neighbourhood walk', 'Hidden park', 'Rainy-day backup', 'Kid-friendly'];

exampleGuides = [
  { title: 'Canal-side weekends', location: 'Paris 10e', description: '...', tags: ['Slow travel', 'Couples', 'Walks'] },
  // …
];


}
