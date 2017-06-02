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
  Renderer,
  HostBinding
} from '@angular/core';

import { ContainerComponent } from '../';
import { DraggableDirective } from '../../directives/';

/**
 * Component that allows nested ngxDroppable and ngxDraggables
 * Should only be use inside a ngx-dnd-container
 * Outside a ngx-dnd-container use ngxDroppable
 * 
 * @export
 * @class ItemComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ngx-dnd-item',
  templateUrl: 'item.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() model: any;
  @Input() copy = false;
  @Input() removeOnSpill = false;
  @Input() droppableItemClass: string | ((o: any) => any);

  @Input() dropZone: any;
  @Input() dropZones: any;

  type: string;
  data: any;

  @HostBinding('class.has-handle')
  get hasHandle() {
    return this.draggableDirective.hasHandle;
  }

  @HostBinding('class')
  get classString() {
    const itemClass = (typeof this.droppableItemClass === 'function') ?
      this.droppableItemClass(this.model) :
      this.droppableItemClass;
    return  `ngx-dnd-item ${itemClass || ''}`;
  }

  constructor(
    public container: ContainerComponent,
    public draggableDirective: DraggableDirective
  ) {}

  ngOnInit() {
    this.type = getType(this.model);

    this.dropZone = this.dropZone || this.container.dropZone;
    this.dropZones = this.dropZones || this.container.dropZones;
    this.droppableItemClass = this.droppableItemClass || this.container.droppableItemClass;
    this.removeOnSpill = typeof this.removeOnSpill === 'boolean' ? this.removeOnSpill : this.container.removeOnSpill;
    this.copy = typeof this.copy === 'boolean' ? this.copy : this.container.copy;

    this.data = {
      model: this.model,
      type: this.type,
      dropZone: this.dropZone,
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
