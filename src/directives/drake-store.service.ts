import * as dragula from 'dragula';
import { DroppableDirective } from './ngx-droppable.directive';

export class DrakeStoreService {
  private droppableMap = new WeakMap<any, DroppableDirective>();
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
    const name = droppable.ngxDroppable;

    this.droppableMap.delete(droppable.container);
    const drake = this.drakeMap[name];
    if (drake) {
      const idx = drake.containers.indexOf(droppable.container);
      if (idx > -1) {
        drake.containers.splice(idx, 1);
      }
    }
  }

  registerEvents(drake: Drake): void {
    let dragElm: any;
    let dragIndex: number;
    let draggedItem: any;

    drake.on('drag', (el: any, source: any) => {
      draggedItem = undefined;
      dragElm = el;

      if (!source) {
        return;
      }
      dragIndex = domIndexOf(el, source);

      if (this.droppableMap.has(source)) {
        const component = <any>this.droppableMap.get(source);
        const sourceModel = component.model;

        draggedItem = sourceModel ? sourceModel[dragIndex] : undefined;

        component.drag.emit({
          type: 'remove',
          el,
          source,
          value: draggedItem
        });
      }
    });

    drake.on('drop', (el: any, target: any, source: any) => {
      if (this.droppableMap.has(target) && this.droppableMap.has(source)) {
        const targetComponent = <any>this.droppableMap.get(target);

        if (this.droppableMap.has(source)) {
          const sourceComponent = <any>this.droppableMap.get(source);

          const sourceModel = sourceComponent.model;
          const targetModel = targetComponent.model;

          const dropIndex = domIndexOf(el, target);

          if (sourceModel && targetModel) {
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
              target.removeChild(el); // element must be removed for ngFor to apply correctly
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

        let removedItem;
        if (sourceModel) {
          removedItem = sourceModel.splice(dragIndex, 1);
        }

        sourceComponent.remove.emit({
          type: 'remove',
          el,
          container,
          source,
          value: removedItem
        });
      }
    });

    drake.on('over', (el: any, container: any, source: any) => {
      if (this.droppableMap.has(container)) {
        const component = <any>this.droppableMap.get(container);
        // this.renderer.setElementClass(container, 'gu-over', true);
        component.over.emit({
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
        const component = <any>this.droppableMap.get(container);
        // this.renderer.setElementClass(container, 'gu-over', true);
        component.out.emit({
          type: 'out',
          el,
          container,
          source,
          value: draggedItem
        });
      }
    });

    function domIndexOf(child: any, parent: any): any {
      return Array.prototype.indexOf.call(parent.children, child);
    }
  };
}
