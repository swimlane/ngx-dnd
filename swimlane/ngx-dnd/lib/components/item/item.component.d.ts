import { OnInit } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { DraggableDirective } from '../../directives/ngx-draggable.directive';
/**
 * Component that allows nested ngxDroppable and ngxDraggables
 * Should only be use inside a ngx-dnd-container
 * Outside a ngx-dnd-container use ngxDroppable
 *
 * @export
 */
export declare class ItemComponent implements OnInit {
    container: ContainerComponent;
    draggableDirective: DraggableDirective;
    model: any;
    dropZone: any;
    dropZones: any;
    droppableItemClass: any;
    removeOnSpill: boolean;
    copy: boolean;
    _copy: boolean;
    _dropZone: any;
    _dropZones: any;
    _droppableItemClass: any;
    _removeOnSpill: boolean;
    data: any;
    readonly hasHandle: boolean;
    readonly moveDisabled: boolean;
    readonly classString: string;
    readonly type: string;
    constructor(container: ContainerComponent, draggableDirective: DraggableDirective);
    ngOnInit(): void;
}
