import * as dragulaNamespace from '@swimlane/dragula';
import { DroppableDirective } from '../directives/ngx-droppable.directive';
import { DraggableDirective } from '../directives/ngx-draggable.directive';
/**
 * Central service that handles all events
 *
 * @export
 */
export declare class DrakeStoreService {
    private droppableMap;
    private draggableMap;
    private dragulaOptions;
    private drake;
    constructor();
    register(droppable: DroppableDirective): void;
    remove(droppable: DroppableDirective): void;
    registerDraggable(draggable: DraggableDirective): void;
    removeDraggable(draggable: DraggableDirective): void;
    createDrakeOptions(): dragulaNamespace.DragulaOptions;
    registerEvents(): void;
}
