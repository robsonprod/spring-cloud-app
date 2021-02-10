import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { Events } from '../service/events';

@Component({
  selector: 'app-spinner-loading',
  templateUrl: './spinner-loading.component.html',
  styleUrls: ['./spinner-loading.component.css']
})
export class SpinnerLoadingComponent implements OnInit {

  @Input() message: string;
  @Input() show: boolean;

  constructor(public templateRef: ElementRef, public events: Events) {
  }

  ngOnInit(): void {
    this.message = this.message || 'Aguarde...';
    this._show = this._show || true;

    this.events.on('onSpinnerDisabled').subscribe(() => {
      this._show = false;
    });
  }

  public set _show(value: boolean) {
    this.show = value;
  }

  public get _show(): boolean {
    return this.show;
  }
}
