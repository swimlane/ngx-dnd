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

@Directive({selector: '[ngxDroppable]'})
export class DroppableDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input() model: any;
  @Input() dropZone: string;

  @Input() dragulaOptions: any;
  @Input() ngxDroppable: string;

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
    this.drakesService.register(this);
  }

  ngAfterViewInit() {
    const overAndOut = ({type}) => this.renderer.setElementClass(this.container, 'gu-over', type === 'over');

    this.over.subscribe(overAndOut);
    this.out.subscribe(overAndOut);
  }

  ngOnDestroy() {
    this.drakesService.remove(this);
  }
}
