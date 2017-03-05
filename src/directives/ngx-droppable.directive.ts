import {
  Directive,
  Input,
  Output,
  OnInit,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  EventEmitter,
  SimpleChange,
  Renderer
} from '@angular/core';

import { DrakeStoreService } from '../services/drake-store.service';

let i = 10000;
function getNextId() {
  return i++;
}

/**
 * Makes the conatiner droppable and children draggable.
 * 
 * @export
 * @class DroppableDirective
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @implements {AfterViewInit}
 */
@Directive({selector: '[ngxDroppable]'})
export class DroppableDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input() model: any;
  @Input() copy = false;
  @Input() removeOnSpill = false;
  @Input() dropZone;
  @Input() ngxDroppable;

  // @Input() dragulaOptions: any;
  // @Input() ngxDroppable: string;

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

  container: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer,
    private drakesService: DrakeStoreService
  ) {
    this.container = el.nativeElement;
  }

  ngOnInit(): void {
    this.dropZone = this.dropZone || this.ngxDroppable || `@@DefaultDropZone-${getNextId()}@@`;
    this.drakesService.register(this);
  }

  ngAfterViewInit() {
    this.over.subscribe((ev) => {
      this.renderer.setElementClass(this.container, 'gu-over', true);
    });
    this.out.subscribe((ev) => {
      this.renderer.setElementClass(this.container, 'gu-over', false);
    });
  }

  ngOnDestroy() {
    this.drakesService.remove(this);
  }
}
