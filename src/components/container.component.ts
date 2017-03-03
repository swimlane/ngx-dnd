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
import { DragulaService, DragulaDirective } from 'ng2-dragula';

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

  @Input() options: any;
  @Input() debug = false;

  @Input()
  @ContentChild(TemplateRef) 
  template: TemplateRef<any>;

  @Input()
  @ViewChild(DragulaDirective) 
  dragula: any;

  @Output()
  drop: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  drag: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  over: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  out: EventEmitter<any> = new EventEmitter<any>();

  type: string;
  data: any;

  constructor(
    private dragulaService: DragulaService,
    private renderer: Renderer) {
  }

  ngOnInit() {
    this.options = Object.assign({
      accepts(el, target, source, sibling) {
        return !el.contains(target);
      }
    }, this.options);

    this.type = getType(this.model);

    const item = this.classes.item;

    this.classes = {
      container: this.classes.container,
      item: this.functor(this.classes.item)
    };

    this.data = {
      model: this.model,
      type: this.type,
      bag: this.bag,
      template: this.template
    };
  }

  ngAfterViewInit() {
    const bag = this.dragulaService.find(this.bag);
    const drake = bag.drake;

    drake.on('drag', (el: any, source: any) => {
      if (this.dragula && this.dragula.el.nativeElement === source) {
        const dragIndex = Array.prototype.indexOf.call(source.children, el);
        const sourceModel = drake.models[drake.containers.indexOf(source)];
        const sourceItem = this.model[dragIndex];

        drake.draggingItem = sourceItem;

        this.drag.emit({
          type: 'drag',
          el,
          source,
          value: drake.draggingItem
        });
      }
    });

    /* drake.on('drop', (el: any, target: any, source: any, sibling: any) => {
      if (this.dragula && this.dragula.el.nativeElement === target) {
        this.drop.emit({
          type: 'drop',
          el,
          source,
          target,
          sibling,
          value: drake.draggingItem
        });
      }
    }); */

    drake.on('over', (el: any, container: any, source: any) => {
      if (this.dragula && this.dragula.el.nativeElement === container) {
        this.renderer.setElementClass(container, 'gu-over', true);

        this.over.emit({
          type: 'over',
          el,
          container,
          source,
          value: drake.draggingItem
        });
      }
    });

    drake.on('out', (el: any, container: any, source: any) => {
      if (this.dragula && this.dragula.el.nativeElement === container) {
        this.renderer.setElementClass(container, 'gu-over', false);

        this.out.emit({
          type: 'out',
          el,
          container,
          source,
          value: drake.draggingItem
        });
      }
    });

    drake.on('remove', (el: any, container: any, source: any) => {
      if (this.dragula && this.dragula.el.nativeElement === source) {
        this.out.emit({
          type: 'remove',
          el,
          container,
          source,
          value: drake.draggingItem
        });
      }
    });
  }

  private functor(maybeFunction) {
    return typeof maybeFunction === 'function' ? maybeFunction : () => maybeFunction;
  }
}

function getType(item: any) {
  if (Array.isArray(item)) {
    return 'array';
  }
  return typeof item;
}
