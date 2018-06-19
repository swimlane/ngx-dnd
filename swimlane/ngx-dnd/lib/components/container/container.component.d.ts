import { OnInit, AfterViewInit, TemplateRef, EventEmitter } from '@angular/core';
/**
 * Component that allows nested ngxDroppable and ngxDraggables
 *
 * @export
 */
export declare class ContainerComponent implements OnInit, AfterViewInit {
    model: any;
    copy: boolean;
    removeOnSpill: boolean;
    droppableItemClass: string | ((o: any) => any);
    dropZone: string;
    dropZones: string[];
    moves: (model: any, source: any, handle: any, sibling: any) => boolean;
    template: TemplateRef<any>;
    droppable: any;
    drop: EventEmitter<any>;
    drag: EventEmitter<any>;
    over: EventEmitter<any>;
    out: EventEmitter<any>;
    remove: EventEmitter<any>;
    cancel: EventEmitter<any>;
    _dropZones: string[];
    _defaultZones: string[];
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
