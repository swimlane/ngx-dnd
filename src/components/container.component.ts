import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'ngx-dnd-container',
  templateUrl: 'container.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  static nextId = 0;

  @Input() model: any[];
  @Input() bag: string = 'default';
  @Input() class: string = '';

  @Input() options: any;
  type: string;

  constructor(private dragulaService: DragulaService) {
  }

  ngOnInit() {
    this.options = Object.assign({
      accepts(el, target, source, sibling) {
        return !el.contains(target);
      }
    }, this.options);

    this.type = getType(this.model);
  }
}

function getType(item: any) {
  if (Array.isArray(item)) {
    return 'array';
  }
  return typeof item;
}
