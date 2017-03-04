import {
  Directive,
  Input,
  Output,
  OnInit,
  OnChanges,
  AfterViewInit,
  ElementRef,
  EventEmitter,
  SimpleChange,
  Renderer
} from '@angular/core';

import { DrakeStoreService } from './drake-store.service';

const drakesService = new DrakeStoreService();

@Directive({selector: '[ngxDroppable]'})
export class DroppableDirective implements OnInit, AfterViewInit {
  @Input() ngxDroppable: string;
  @Input() model: any;
  @Input() dragulaOptions: any;

  @Input() dropZone: string;

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
    private renderer: Renderer
  ) {
    this.container = el.nativeElement;
  }

  ngOnInit(): void {
    this.dragulaOptions = Object.assign({
      accepts(el, target, source, sibling) {
      if (el.contains(target)) {
        return false;
      }
      /* if (!this.dropZone && this.drake.allowedDropZones.length === 0) {
        return true;
      }
      return this.drake.allowedDropZones.contains(this.dropZone); */
      return true;
      }
    }, this.dragulaOptions);

    drakesService.register(this);
  }

  ngAfterViewInit() {
    const overAndOut = ({type}) => this.renderer.setElementClass(this.container, 'gu-over', type === 'over');

    this.over.subscribe(overAndOut);
    this.out.subscribe(overAndOut);
  }

  ngOnDestroy() {
    drakesService.remove(this);
  }
}
