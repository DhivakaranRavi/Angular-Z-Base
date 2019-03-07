import { Component } from '@angular/core';
import {
  trigger,
  state,
  animate,
  transition,
  style,
} from '@angular/animations';
import { environment } from '../environment';
@Component({
  selector: 'main',
  templateUrl: './app.component.html',
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s', style({ opacity: 1 })),
      ]),
    ]),
    trigger('fly', [
      state(':in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.7s  ease-in'),
      ]),
    ]),
  ],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private headHTML: any;
  constructor() {
    environment.production
      ? ((this.headHTML = document.getElementsByTagName('head')[0].innerHTML),
        (this.headHTML += '<link rel="manifest" href="manifest.json" />'),
        (document.getElementsByTagName('head')[0].innerHTML = this.headHTML))
      : null;
  }
}
