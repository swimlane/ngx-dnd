import {Injectable, EventEmitter} from '@angular/core';

import * as dragula from 'dragula';
import { DroppableDirective } from '../directives/ngx-droppable.directive';
import { DraggableDirective } from '../directives/ngx-draggable.directive';

@Injectable()
export class DrakeStoreService {
  private droppableMap = new WeakMap<any, DroppableDirective>();
  private draggableMap = new WeakMap<any, DraggableDirective>();
  private drakeMap: { [s: string]: Drake; } = {};

  register(droppable: DroppableDirective) {
    const name = droppable.ngxDroppable;

    this.droppableMap.set(droppable.container, droppable);

    let drake = this.drakeMap[name];
    if (drake) {
      drake.containers.push(droppable.container);
    } else {
      drake = this.drakeMap[name] = dragula([droppable.container], droppable.dragulaOptions);
      this.registerEvents(drake);
    }

    return drake;
  }

  remove(droppable: DroppableDirective) {
    this.droppableMap.delete(droppable.container);

    const name = droppable.ngxDroppable;
    const drake = this.drakeMap[name];
    if (drake) {
      const idx = drake.containers.indexOf(droppable.container);
      if (idx > -1) {
        drake.containers.splice(idx, 1);
      }
    }
  }

  registerDraggable(draggable: DraggableDirective) {
    this.draggableMap.set(draggable.element, draggable);
  }

  removeDraggable(draggable: DraggableDirective) {
    this.draggableMap.delete(draggable.element);
  }

  registerEvents(drake: Drake): void {
    let dragElm: any;
    let draggedItem: any;

    drake.on('drag', (el: any, source: any) => {
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
        sourceComponent.drag.emit({
          type: 'drag',
          el,
          source,
          value: draggedItem
        });
      }
    });

    drake.on('drop', (el: any, target: any, source: any) => {
      if (this.droppableMap.has(target)) {
        const targetComponent = <any>this.droppableMap.get(target);

        if (this.droppableMap.has(source)) {
          const sourceComponent = <any>this.droppableMap.get(source);

          const sourceModel = sourceComponent.model;
          const targetModel = targetComponent.model;

          const dropIndex = Array.prototype.indexOf.call(target.children, el);
          const dragIndex = (sourceModel && draggedItem) ? sourceModel.indexOf(draggedItem) : -1;

          if (dropIndex > -1 && dragIndex > -1 && sourceModel && targetModel) {
            if (target === source) {
              sourceModel.splice(dropIndex, 0, sourceModel.splice(dragIndex, 1)[0]);
            } else {
              const notCopy = dragElm === el;
              const dropElmModel = notCopy ?
                sourceModel[dragIndex] :
                JSON.parse(JSON.stringify(sourceModel[dragIndex]));

              if (notCopy) {
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

    drake.on('remove', (el: any, container: any, source: any) => {
      if (this.droppableMap.has(container)) {
        const sourceComponent = <any>this.droppableMap.get(source);
        const sourceModel = sourceComponent.model;

        const dragIndex = (draggedItem && sourceModel) ? sourceModel.indexOf(draggedItem) : -1;

        if (dragIndex > 0) {
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

    drake.on('over', (el: any, container: any, source: any) => {
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

    drake.on('out', (el: any, container: any, source: any) => {
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

export const drakesService = new DrakeStoreService();
