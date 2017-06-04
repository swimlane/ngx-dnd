import {
  Directive, ElementRef, HostListener, Input, Output,
  EventEmitter, OnDestroy, OnInit, QueryList,
  ContentChildren, ViewChildren, TemplateRef
} from '@angular/core';

import { DragHandleDirective } from './ngx-drag-handle.directive';
import { DroppableDirective } from './ngx-droppable.directive';
import { DrakeStoreService } from '../services/drake-store.service';

/**
 * Adds properties and events to draggable elements
 * 
 * @export
 * @class DraggableDirective
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Directive({ selector: '[ngxDraggable]' })
export class DraggableDirective implements OnInit, OnDestroy {

  @Input() ngxDraggable: string[];
  @Input() model: any;

  @Input()
  get dropZones() {
    return this._dropZones || this.ngxDraggable || this._parentDropzones;
  }
  set dropZones(val) {
    this._dropZones = val;
  }

  /*
  ContentChildren doesn't get children created with NgTemplateOutlet
  See https://github.com/angular/angular/issues/14842
  Implemented via updateElements method
  
  @ContentChildren(DragHandleDirective, {descendants: true})
  handlesList: QueryList<DragHandleDirective>; */

  handles = [];

  get hasHandle() {
    return !!this.handles.length;
  }

  @Output()
  drag: EventEmitter<any> = new EventEmitter<any>();

  dragDelay: number = 200; // milliseconds
  draggable: boolean = false;
  touchTimeout: any;

  get element() {
    return this.el.nativeElement;
  }

  _dropZones: string[];
  _parentDropzones: string[];

  constructor(
    private el: ElementRef,
    private drakesService: DrakeStoreService,
    private droppableDirective: DroppableDirective,
  ) { }

  // From: https://github.com/bevacqua/dragula/issues/289#issuecomment-277143172
  @HostListener('touchmove', ['$event'])
  onMove(e: Event) {
    if (!this.draggable) {
      e.stopPropagation();
      clearTimeout(this.touchTimeout);
    }
  }

  @HostListener('touchstart', ['$event'])
  onDown(e: Event) {
    this.touchTimeout = setTimeout(() => {
      this.draggable = true;
    }, this.dragDelay);
  }

  @HostListener('touchend', ['$event'])
  onUp(e: Event) {
    clearTimeout(<number>this.touchTimeout);
    this.draggable = false;
  }

  ngOnInit() {
    this._parentDropzones = [this.droppableDirective.dropZone];
    this.drakesService.registerDraggable(this);
    this.updateElements();
  }

  ngOnDestroy() {
    this.drakesService.removeDraggable(this);
  }

  updateElements() {
    const nativeElement = this.el.nativeElement;
    const handles = nativeElement.querySelectorAll('[ngxdraghandle]');
    this.handles = Array.from(handles).filter(h => findFirstDraggableParent(h) === nativeElement);
    
    function findFirstDraggableParent(c) {
      while(c.parentNode) {
        c = c.parentNode;
        if (c.hasAttribute && c.hasAttribute('ngxdraggable')) {
          return c;
        }
      }
    }
  }

  moves(source, handle, sibling) {
    return this.hasHandle ?
      this.handles.some(h => handelFor(handle, h)) :
      true;

    function handelFor(c, p) {
      if (c === p) return true;
      while((c = c.parentNode) && c !== p);  // tslint:disable-line
      return !!c;
    }
  }

  ngDoCheck() {
    this.updateElements();
  }
}
