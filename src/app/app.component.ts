import { Component } from '@angular/core';
import {
  trigger,
  state,
  animate,
  transition,
  style,
} from '@angular/animations';
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
})
export class AppComponent {
  constructor() {}
}
