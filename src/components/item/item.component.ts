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

  @Input()
  get dropZone() {
    return this._dropZone || this.container.dropZone;
  }
  set dropZone(val) {
    this._dropZone = val;
  }

  @Input()
  get dropZones() {
    return this._dropZones || this.container.dropZones;
  }
  set dropZones(val) {
    this._dropZones = val;
  }

  @Input()
  get droppableItemClass() {
    return this._droppableItemClass || this.container.droppableItemClass;
  }
  set droppableItemClass(val) {
    this._droppableItemClass = val;
  }

  @Input()
  get removeOnSpill() {
    return typeof this._removeOnSpill === 'boolean' ? this._removeOnSpill : this.container.removeOnSpill;
  }
  set removeOnSpill(val) {
    this._removeOnSpill = val;
  }

  @Input()
  get copy() {
    return typeof this._copy === 'boolean' ? this._copy : this.container.copy;
  }
  set copy(val) {
    this._copy = val;
  }

  _copy = false;
  _dropZone: any;
  _dropZones: any;
  _droppableItemClass: any;
  _removeOnSpill = false;
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

  get type() {
    if (Array.isArray(this.model)) {
      return 'array';
    }
    return typeof this.model;
  }

  constructor(
    public container: ContainerComponent,
    public draggableDirective: DraggableDirective
  ) {}

  ngOnInit() {
    this.data = {
      model: this.model,
      type: this.type,
      dropZone: this.dropZone,
      template: this.container.template
    };
  }
}
