import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { DroppableDirective } from './ngx-droppable.directive';
import { DrakeStoreService } from '../services/drake-store.service';
/**
 * Adds properties and events to draggable elements
 *
 * @export
 */
export declare class DraggableDirective implements OnInit, OnDestroy {
    private el;
    private drakesService;
    private droppableDirective;
    ngxDraggable: string[];
    model: any;
    dropZones: any;
    _moves: boolean | ((...args: any[]) => any);
    handles: any[];
    readonly hasHandle: boolean;
    drag: EventEmitter<any>;
    dragDelay: number;
    dragDelayed: boolean;
    touchTimeout: any;
    readonly element: any;
    _dropZones: string[];
    _parentDropzones: string[];
    constructor(el: ElementRef, drakesService: DrakeStoreService, droppableDirective: DroppableDirective);
    onMove(e: Event): void;
    onDown(): void;
    onUp(): void;
    ngOnInit(): void;
    update(): void;
    ngOnDestroy(): void;
    updateElements(): void;
    canMove(source?: any, handle?: any, sibling?: any): boolean;
    moves(source: any, handle: any, sibling: any): boolean;
    ngDoCheck(): void;
}
