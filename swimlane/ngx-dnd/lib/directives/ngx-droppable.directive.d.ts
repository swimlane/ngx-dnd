import { OnInit, OnDestroy, AfterViewInit, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { DrakeStoreService } from '../services/drake-store.service';
/**
 * Makes the container droppable and children draggable.
 *
 * @export
 */
export declare class DroppableDirective implements OnInit, OnDestroy, AfterViewInit {
    private el;
    private renderer;
    private drakesService;
    model: any;
    copy: boolean;
    removeOnSpill: boolean;
    ngxDroppable: string;
    drop: EventEmitter<any>;
    drag: EventEmitter<any>;
    over: EventEmitter<any>;
    out: EventEmitter<any>;
    remove: EventEmitter<any>;
    cancel: EventEmitter<any>;
    readonly container: any;
    dropZone: string;
    defaultZone: string;
    _dropZone: string;
    constructor(el: ElementRef, renderer: Renderer2, drakesService: DrakeStoreService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
