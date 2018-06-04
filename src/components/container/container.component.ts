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
} from '@angular/core';

import { DroppableDirective } from '../../directives';

let i = 0;
function getNextId() {
  return i++;
}

/**
 * Component that allows nested ngxDroppable and ngxDraggables
 * 
 * @export
 * @class ContainerComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'ngx-dnd-container',
  templateUrl: '../../../../components/container/container.component.html',
  styleUrls: ['../../../../components/container/container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContainerComponent implements OnInit, AfterViewInit {
  @Input() model: any;
  @Input() copy = false;
  @Input() removeOnSpill = false;
  @Input() droppableItemClass: string | ((o: any) => any);

  @Input() dropZone = `@@DefaultDropZone-${getNextId()}@@`;

  @Input()
  get dropZones() {
    return this._dropZones || this._defaultZones;
  }
  set dropZones(val) {
    this._dropZones = val;
  }

  @Input()
  moves: (model: any, source: any, handle: any, sibling: any) => boolean;

  // @Input() classes: any = {};
  // @Input() dragulaOptions: any;

  @Input()
  @ContentChild(TemplateRef) 
  template: TemplateRef<any>;

  @Input()
  @ViewChild(DroppableDirective) 
  droppable: any;

  @Output()
  drop: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  drag: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  over: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  out: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  remove: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter<any>();

  _dropZones: string[];
  _defaultZones: string[];

  ngOnInit() {
    this._defaultZones = [this.dropZone];
  }

  ngAfterViewInit() {
    this.droppable.drag.subscribe((v: any) => this.drag.emit(v));
    this.droppable.drop.subscribe((v: any) => this.drop.emit(v));
    this.droppable.over.subscribe((v: any) => this.over.emit(v));
    this.droppable.out.subscribe((v: any) => this.out.emit(v));
    this.droppable.remove.subscribe((v: any) => this.remove.emit(v));
    this.droppable.cancel.subscribe((v: any) => this.cancel.emit(v));
  }
}
