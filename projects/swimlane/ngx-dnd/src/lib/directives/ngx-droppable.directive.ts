import {
  Directive,
  Input,
  Output,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  EventEmitter,
  Renderer2
} from '@angular/core';

import { DrakeStoreService } from '../services/drake-store.service';

let i = 10000;
function getNextId() {
  return i++;
}

/**
 * Makes the container droppable and children draggable.
 *
 * @export
 */
@Directive({
  selector: '[ngxDroppable]',
  standalone: false
})
export class DroppableDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input() model: any;
  @Input() copy = false;
  @Input() removeOnSpill = false;
  @Input() ngxDroppable: string;
  @Input() direction: 'vertical' | 'horizontal' | 'mixed' = 'vertical';

  @Output() drop: EventEmitter<any> = new EventEmitter<any>();

  @Output() drag: EventEmitter<any> = new EventEmitter<any>();

  @Output() over: EventEmitter<any> = new EventEmitter<any>();

  @Output() out: EventEmitter<any> = new EventEmitter<any>();

  @Output() remove: EventEmitter<any> = new EventEmitter<any>();

  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  get container(): any {
    return this.el.nativeElement;
  }

  @Input()
  get dropZone(): string {
    return this._dropZone || this.ngxDroppable || this.defaultZone;
  }
  set dropZone(val: string) {
    this._dropZone = val;
  }

  defaultZone: string;
  _dropZone: string;

  constructor(private el: ElementRef, private renderer: Renderer2, private drakesService: DrakeStoreService) {}

  ngOnInit(): void {
    this.defaultZone = `@@DefaultDropZone-${getNextId()}@@`;
    this.drakesService.register(this);
  }

  ngAfterViewInit(): void {
    this.over.subscribe(() => {
      this.renderer.addClass(this.container, 'gu-over');
    });
    this.out.subscribe(() => {
      this.renderer.removeClass(this.container, 'gu-over');
    });
  }

  ngOnDestroy(): void {
    this.drakesService.remove(this);
  }
}
