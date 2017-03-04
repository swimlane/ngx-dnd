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
  Renderer
} from '@angular/core';

import { DroppableDirective } from '../../directives';

@Component({
  selector: 'ngx-dnd-container',
  templateUrl: 'container.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit, AfterViewInit {
  @Input() model: any;
  @Input() bag = 'default';
  @Input() class = '';
  @Input() classes: any = {};
  @Input() dragulaOptions: any;

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

  constructor(private renderer: Renderer) {}

  ngOnInit() {
    this.classes = {
      container: this.classes.container,
      item: functor(this.classes.item)
    };
  }

  ngAfterViewInit() {
    this.droppable.drag.subscribe(v => this.drag.emit(v));
    this.droppable.drop.subscribe(v => this.drop.emit(v));
    this.droppable.over.subscribe(v => this.over.emit(v));
    this.droppable.out.subscribe(v => this.out.emit(v));
  }
}

function functor(maybeFunction) {
  return typeof maybeFunction === 'function' ? maybeFunction : () => maybeFunction;
}
