import {
  Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnDestroy
} from '@angular/core';

/**
 * From: https://github.com/bevacqua/dragula/issues/289#issuecomment-277143172
 * 
 * @export
 * @class NgxDndItemDirective
 */
@Directive({ selector: '[ngxDraggable]' })
export class DraggableDirective {

  dragDelay: number = 200; // milliseconds
  draggable: boolean = false;
  touchTimeout: any;

  constructor(private el: ElementRef) {
  }

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
}
