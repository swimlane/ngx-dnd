import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  ViewEncapsulation,
  ContentChild,
  TemplateRef,
  ViewChild,
  EventEmitter,
  Renderer
} from '@angular/core';

import { ContainerComponent } from '../';

@Component({
  selector: 'ngx-dnd-item',
  templateUrl: 'item.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() model: any;

  type: string;
  data: any;

  constructor(private container: ContainerComponent) {
  }

  ngOnInit() {
    this.type = getType(this.model);

    this.data = {
      model: this.model,
      type: this.type,
      bag: this.container.bag,
      template: this.container.template
    };
  }
}

function getType(item: any) {
  if (Array.isArray(item)) {
    return 'array';
  }
  return typeof item;
}
