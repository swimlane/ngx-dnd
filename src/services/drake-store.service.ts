import {Injectable, EventEmitter, Renderer} from '@angular/core';

import * as dragula from 'dragula';
import { DroppableDirective } from '../directives/ngx-droppable.directive';
import { DraggableDirective } from '../directives/ngx-draggable.directive';

/**
 * Central service that handles all events
 * 
 * @export
 * @class DrakeStoreService
 */
@Injectable()
export class DrakeStoreService {
  private droppableMap = new WeakMap<any, DroppableDirective>();
  private draggableMap = new WeakMap<any, DraggableDirective>();
  private dragulaOptions: any = {};
  private drake: Drake;

  constructor() {
    this.dragulaOptions = this.createDrakeOptions();
    this.drake = dragula([], this.dragulaOptions);
    this.registerEvents();
  }

  register(droppable: DroppableDirective) {
    this.droppableMap.set(droppable.container, droppable);
    this.drake.containers.push(droppable.container);
  }

  remove(droppable: DroppableDirective) {
    this.droppableMap.delete(droppable.container);
    const idx = this.drake.containers.indexOf(droppable.container);
    if (idx > -1) {
      this.drake.containers.splice(idx, 1);
    }
  }

  registerDraggable(draggable: DraggableDirective) {
    this.draggableMap.set(draggable.element, draggable);
  }

  removeDraggable(draggable: DraggableDirective) {
    this.draggableMap.delete(draggable.element);
  }

  createDrakeOptions() {
    const accepts = (el, target, source, sibling) => {
      if (el.contains(target)) {
        return false;
      }
      const elementComponet = this.draggableMap.get(el);
      const targetComponet = this.droppableMap.get(target);
      if (elementComponet && targetComponet) {
        return elementComponet.dropZones.includes(targetComponet.dropZone);
      }
      return true;
    };

    const copy = (el, source) => {
      
      const sourceComponet = this.droppableMap.get(source);
      if (sourceComponet) {
        return sourceComponet.copy;
      }
      return false;
    };

    return {accepts, copy, revertOnSpill: true};
  }

  registerEvents(): void {
    let dragElm: any;
    let draggedItem: any;

    this.drake.on('drag', (el: any, source: any) => {
      draggedItem = undefined;
      dragElm = el;

      if (!el || !source) {
        return;
      }

      if (this.draggableMap.has(el)) {
        const elementComponent = <any>this.draggableMap.get(el);
        draggedItem = elementComponent.model;

        elementComponent.drag.emit({
          type: 'drag',
          el,
          source,
          value: draggedItem
        });
      }

      if (this.droppableMap.has(source)) {
        const sourceComponent = <any>this.droppableMap.get(source);
        this.dragulaOptions.removeOnSpill = sourceComponent.removeOnSpill;

        sourceComponent.drag.emit({
          type: 'drag',
          el,
          source,
          sourceComponent,
          value: draggedItem
        });
      }
    });

    this.drake.on('drop', (el: any, target: any, source: any) => {
      if (this.droppableMap.has(target)) {
        const targetComponent = <any>this.droppableMap.get(target);

        if (this.droppableMap.has(source)) {
          const sourceComponent = <any>this.droppableMap.get(source);

          const sourceModel = sourceComponent.model;
          const targetModel = targetComponent.model;

          const dropIndex = Array.prototype.indexOf.call(target.children, el);
          const dragIndex = (sourceModel && draggedItem) ? sourceModel.indexOf(draggedItem) : -1;

          if (dropIndex > -1 && targetModel) {
            if (dragIndex > -1 && sourceModel && target === source) {
              sourceModel.splice(dropIndex, 0, sourceModel.splice(dragIndex, 1)[0]);
            } else {
              const copy = !sourceModel || (dragElm !== el);
              const dropElmModel = copy ?
                JSON.parse(JSON.stringify(draggedItem)) :
                draggedItem;

              if (!copy) {
                sourceModel.splice(dragIndex, 1);
              }
              targetModel.splice(dropIndex, 0, dropElmModel);
              target.removeChild(el);
            }
          }
        }

        targetComponent.drop.emit({
          type: 'drop',
          el,
          source,
          value: draggedItem
        });
      }
    });

    this.drake.on('remove', (el: any, container: any, source: any) => {
      if (this.droppableMap.has(source)) {
        const sourceComponent = <any>this.droppableMap.get(source);
        const sourceModel = sourceComponent.model;

        const dragIndex = (draggedItem && sourceModel) ? sourceModel.indexOf(draggedItem) : -1;

        if (dragIndex > -1) {
          sourceModel.splice(dragIndex, 1);
        }

        sourceComponent.remove.emit({
          type: 'remove',
          el,
          container,
          source,
          value: draggedItem
        });
      }
    });

    this.drake.on('over', (el: any, container: any, source: any) => {
      if (this.droppableMap.has(container)) {
        const containerComponent = <any>this.droppableMap.get(container);
        containerComponent.over.emit({
          type: 'over',
          el,
          container,
          source,
          value: draggedItem
        });
      }
    });

    this.drake.on('out', (el: any, container: any, source: any) => {
      if (this.droppableMap.has(container)) {
        const containerComponent = <any>this.droppableMap.get(container);
        containerComponent.out.emit({
          type: 'out',
          el,
          container,
          source,
          value: draggedItem
        });
      }
    });
  };
}
