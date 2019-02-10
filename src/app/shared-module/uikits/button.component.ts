import { Component, Input } from '@angular/core';

@Component({
  selector: 'p-button',
  template: `
    <button [ngStyle]="setStyle()" [disabled]="disabled">
      <i *ngIf="loading" class="fa fa-spinner fa-spin"></i> {{ value }}
    </button>
  `,
})
export class ButtonComponent {
  @Input() width: string;
  @Input() color: string;
  @Input() value: string;
  @Input() type: string;
  @Input() disabled: boolean;
  @Input() loading: boolean = false;
  @Input() value_color: string;
  setStyle(): Object {
    return {
      'background-color': this.color ? this.color : 'orange',
      width: this.width ? this.width : '5%',
      'border-radius': this.type == 'round' ? '50px' : 'none',
      color: this.value_color ? this.value_color : 'white',
      padding: '12px 24px',
      border: 'none',
      cursor: this.disabled ? 'not-allowed' : 'pointer',
      'font-family': 'Thasadith, sans - serif',
      'font-size': '18px',
      outline: 'none',
    };
  }
}
