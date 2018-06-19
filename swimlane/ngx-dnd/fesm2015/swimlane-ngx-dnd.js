import { Injectable, Directive, Input, Output, ElementRef, EventEmitter, Renderer2, HostListener, Component, ViewEncapsulation, ContentChild, TemplateRef, ViewChild, HostBinding, NgModule } from '@angular/core';
import * as dragulaNamespace from '@swimlane/dragula';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// see https://github.com/dherges/ng-packagr/issues/217
const /** @type {?} */ dragula = dragulaNamespace;
/**
 * Central service that handles all events
 *
 * @export
 */
class DrakeStoreService {
    constructor() {
        this.droppableMap = new WeakMap();
        this.draggableMap = new WeakMap();
        this.dragulaOptions = this.createDrakeOptions();
        this.drake = dragula([], this.dragulaOptions);
        this.registerEvents();
    }
    /**
     * @param {?} droppable
     * @return {?}
     */
    register(droppable) {
        this.droppableMap.set(droppable.container, droppable);
        this.drake.containers.push(droppable.container);
    }
    /**
     * @param {?} droppable
     * @return {?}
     */
    remove(droppable) {
        this.droppableMap.delete(droppable.container);
        const /** @type {?} */ idx = this.drake.containers.indexOf(droppable.container);
        if (idx > -1) {
            this.drake.containers.splice(idx, 1);
        }
    }
    /**
     * @param {?} draggable
     * @return {?}
     */
    registerDraggable(draggable) {
        this.draggableMap.set(draggable.element, draggable);
    }
    /**
     * @param {?} draggable
     * @return {?}
     */
    removeDraggable(draggable) {
        this.draggableMap.delete(draggable.element);
    }
    /**
     * @return {?}
     */
    createDrakeOptions() {
        const /** @type {?} */ accepts = (el, target /*, source: any, sibling: any */) => {
            if (el.contains(target)) {
                return false;
            }
            const /** @type {?} */ elementComponent = this.draggableMap.get(el);
            const /** @type {?} */ targetComponent = this.droppableMap.get(target);
            if (elementComponent && targetComponent) {
                return elementComponent.dropZones.includes(targetComponent.dropZone);
            }
            return true;
        };
        const /** @type {?} */ copy = (_, source) => {
            const /** @type {?} */ sourceComponent = this.droppableMap.get(source);
            if (sourceComponent) {
                return sourceComponent.copy;
            }
            return false;
        };
        const /** @type {?} */ moves = (el, source, handle, sibling) => {
            const /** @type {?} */ elementComponent = this.draggableMap.get(el);
            if (elementComponent) {
                return elementComponent.moves(source, handle, sibling);
            }
            return true;
        };
        return { accepts, copy, moves, revertOnSpill: true, direction: 'vertical' };
    }
    /**
     * @return {?}
     */
    registerEvents() {
        let /** @type {?} */ dragElm;
        let /** @type {?} */ draggedItem;
        this.drake.on('drag', (el, source) => {
            draggedItem = undefined;
            dragElm = el;
            if (!el || !source) {
                return;
            }
            if (this.draggableMap.has(el)) {
                const /** @type {?} */ elementComponent = this.draggableMap.get(el);
                draggedItem = elementComponent.model;
                elementComponent.drag.emit({
                    type: 'drag',
                    el,
                    source,
                    value: draggedItem
                });
            }
            if (this.droppableMap.has(source)) {
                const /** @type {?} */ sourceComponent = this.droppableMap.get(source);
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
        this.drake.on('drop', (el, target, source) => {
            const /** @type {?} */ targetComponent = this.droppableMap.get(target);
            if (!targetComponent) {
                // not a target, abort
                return;
            }
            let /** @type {?} */ dropElmModel = draggedItem;
            const /** @type {?} */ dropIndex = Array.prototype.indexOf.call(target.children, el);
            if (dropIndex < 0) {
                // dropIndex is bad... cancel
                this.drake.cancel(true);
                return;
            }
            const /** @type {?} */ sourceComponent = this.droppableMap.get(source);
            if (sourceComponent) {
                const /** @type {?} */ sourceModel = sourceComponent.model;
                const /** @type {?} */ targetModel = targetComponent.model;
                const /** @type {?} */ hasDragModel = !!(sourceModel && draggedItem);
                const /** @type {?} */ dragIndex = hasDragModel ? sourceModel.indexOf(draggedItem) : -1;
                if (hasDragModel && dragIndex < 0) {
                    // dragIndex is bad... cancel
                    this.drake.cancel(true);
                    return;
                }
                if (targetModel) {
                    const /** @type {?} */ reorder = dragIndex > -1 && sourceModel && target === source;
                    const /** @type {?} */ copy = !sourceModel || dragElm !== el;
                    if (reorder) {
                        sourceModel.splice(dropIndex, 0, sourceModel.splice(dragIndex, 1)[0]);
                    }
                    else {
                        if (el.parentNode === target) {
                            target.removeChild(el);
                        }
                        if (copy) {
                            dropElmModel = JSON.parse(JSON.stringify(dropElmModel));
                        }
                        else {
                            if (el.parentNode !== source) {
                                // add element back, let angular remove it
                                this.drake.cancel(true);
                            }
                            sourceModel.splice(dragIndex, 1);
                        }
                        targetModel.splice(dropIndex, 0, dropElmModel);
                    }
                }
            }
            targetComponent.drop.emit({
                type: 'drop',
                el,
                source,
                value: dropElmModel,
                dropIndex
            });
        });
        this.drake.on('remove', (el, container, source) => {
            if (this.droppableMap.has(source)) {
                const /** @type {?} */ sourceComponent = this.droppableMap.get(source);
                const /** @type {?} */ sourceModel = sourceComponent.model;
                const /** @type {?} */ dragIndex = draggedItem && sourceModel ? sourceModel.indexOf(draggedItem) : -1;
                if (dragIndex > -1) {
                    if (el.parentNode !== source) {
                        // add element back, let angular remove it
                        source.appendChild(el);
                    }
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
        this.drake.on('cancel', (el, container, source) => {
            if (this.droppableMap.has(container)) {
                const /** @type {?} */ containerComponent = this.droppableMap.get(container);
                containerComponent.cancel.emit({
                    type: 'cancel',
                    el,
                    container,
                    source,
                    value: draggedItem
                });
            }
        });
        this.drake.on('over', (el, container, source) => {
            if (this.droppableMap.has(container)) {
                const /** @type {?} */ containerComponent = this.droppableMap.get(container);
                containerComponent.over.emit({
                    type: 'over',
                    el,
                    container,
                    source,
                    value: draggedItem
                });
            }
        });
        this.drake.on('out', (el, container, source) => {
            if (this.droppableMap.has(container)) {
                const /** @type {?} */ containerComponent = this.droppableMap.get(container);
                containerComponent.out.emit({
                    type: 'out',
                    el,
                    container,
                    source,
                    value: draggedItem
                });
            }
        });
    }
}
DrakeStoreService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DrakeStoreService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let /** @type {?} */ i = 10000;
/**
 * @return {?}
 */
function getNextId() {
    return i++;
}
/**
 * Makes the container droppable and children draggable.
 *
 * @export
 */
class DroppableDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} drakesService
     */
    constructor(el, renderer, drakesService) {
        this.el = el;
        this.renderer = renderer;
        this.drakesService = drakesService;
        this.copy = false;
        this.removeOnSpill = false;
        this.drop = new EventEmitter();
        this.drag = new EventEmitter();
        this.over = new EventEmitter();
        this.out = new EventEmitter();
        this.remove = new EventEmitter();
        this.cancel = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get container() {
        return this.el.nativeElement;
    }
    /**
     * @return {?}
     */
    get dropZone() {
        return this._dropZone || this.ngxDroppable || this.defaultZone;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set dropZone(val) {
        this._dropZone = val;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.defaultZone = `@@DefaultDropZone-${getNextId()}@@`;
        this.drakesService.register(this);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.over.subscribe(() => {
            this.renderer.addClass(this.container, 'gu-over');
        });
        this.out.subscribe(() => {
            this.renderer.removeClass(this.container, 'gu-over');
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.drakesService.remove(this);
    }
}
DroppableDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngxDroppable]' },] },
];
/** @nocollapse */
DroppableDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: DrakeStoreService, },
];
DroppableDirective.propDecorators = {
    "model": [{ type: Input },],
    "copy": [{ type: Input },],
    "removeOnSpill": [{ type: Input },],
    "ngxDroppable": [{ type: Input },],
    "drop": [{ type: Output },],
    "drag": [{ type: Output },],
    "over": [{ type: Output },],
    "out": [{ type: Output },],
    "remove": [{ type: Output },],
    "cancel": [{ type: Output },],
    "dropZone": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Adds properties and events to draggable elements
 *
 * @export
 */
class DraggableDirective {
    /**
     * @param {?} el
     * @param {?} drakesService
     * @param {?} droppableDirective
     */
    constructor(el, drakesService, droppableDirective) {
        this.el = el;
        this.drakesService = drakesService;
        this.droppableDirective = droppableDirective;
        this._moves = true;
        /*
          ContentChildren doesn't get children created with NgTemplateOutlet
          See https://github.com/angular/angular/issues/14842
          Implemented via updateElements method
        
          @ContentChildren(DragHandleDirective, {descendants: true})
          handlesList: QueryList<DragHandleDirective>; */
        this.handles = [];
        this.drag = new EventEmitter();
        this.dragDelay = 200;
        this.dragDelayed = true;
    }
    /**
     * @return {?}
     */
    get dropZones() {
        return this._dropZones || this.ngxDraggable || this._parentDropzones;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set dropZones(val) {
        this._dropZones = val;
    }
    /**
     * @return {?}
     */
    get hasHandle() {
        return !!this.handles.length;
    }
    /**
     * @return {?}
     */
    get element() {
        return this.el.nativeElement;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onMove(e) {
        if (!this._moves || this.dragDelayed) {
            e.stopPropagation();
            clearTimeout(this.touchTimeout);
        }
    }
    /**
     * @return {?}
     */
    onDown() {
        if (this._moves) {
            this.touchTimeout = setTimeout(() => {
                this.dragDelayed = false;
            }, this.dragDelay);
        }
    }
    /**
     * @return {?}
     */
    onUp() {
        if (this._moves) {
            clearTimeout(/** @type {?} */ (this.touchTimeout));
            this.dragDelayed = true;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.update();
    }
    /**
     * @return {?}
     */
    update() {
        this._parentDropzones = [this.droppableDirective.dropZone];
        this.drakesService.registerDraggable(this);
        this.updateElements();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.drakesService.removeDraggable(this);
    }
    /**
     * @return {?}
     */
    updateElements() {
        const /** @type {?} */ nativeElement = this.el.nativeElement;
        const /** @type {?} */ handles = nativeElement.querySelectorAll('[ngxdraghandle]');
        this.handles = Array.from(handles).filter((h) => findFirstDraggableParent(h) === nativeElement);
        /**
         * @param {?} c
         * @return {?}
         */
        function findFirstDraggableParent(c) {
            while (c.parentNode) {
                c = c.parentNode;
                if (c.hasAttribute && c.hasAttribute('ngxdraggable')) {
                    return c;
                }
            }
        }
    }
    /**
     * @param {?=} source
     * @param {?=} handle
     * @param {?=} sibling
     * @return {?}
     */
    canMove(source, handle, sibling) {
        if (typeof this._moves === 'boolean')
            return this._moves;
        if (typeof this._moves === 'function')
            return this._moves(this.model, source, handle, sibling);
        return true;
    }
    /**
     * @param {?} source
     * @param {?} handle
     * @param {?} sibling
     * @return {?}
     */
    moves(source, handle, sibling) {
        if (!this.canMove(source, handle, sibling))
            return false;
        return this.hasHandle ? this.handles.some(h => handelFor(handle, h)) : true;
        /**
         * @param {?} c
         * @param {?} p
         * @return {?}
         */
        function handelFor(c, p) {
            if (c === p)
                return true;
            while ((c = c.parentNode) && c !== p)
                ; // tslint:disable-line
            return !!c;
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        this.updateElements();
    }
}
DraggableDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngxDraggable]' },] },
];
/** @nocollapse */
DraggableDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: DrakeStoreService, },
    { type: DroppableDirective, },
];
DraggableDirective.propDecorators = {
    "ngxDraggable": [{ type: Input },],
    "model": [{ type: Input },],
    "dropZones": [{ type: Input },],
    "_moves": [{ type: Input, args: ['moves',] },],
    "drag": [{ type: Output },],
    "onMove": [{ type: HostListener, args: ['touchmove', ['$event'],] },],
    "onDown": [{ type: HostListener, args: ['touchstart',] },],
    "onUp": [{ type: HostListener, args: ['touchend',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Adds properties and events to drag handle elements
 *
 * @export
 */
class DragHandleDirective {
}
DragHandleDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngxDragHandle]' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let /** @type {?} */ i$1 = 0;
/**
 * @return {?}
 */
function getNextId$1() {
    return i$1++;
}
/**
 * Component that allows nested ngxDroppable and ngxDraggables
 *
 * @export
 */
class ContainerComponent {
    constructor() {
        this.copy = false;
        this.removeOnSpill = false;
        this.dropZone = `@@DefaultDropZone-${getNextId$1()}@@`;
        this.drop = new EventEmitter();
        this.drag = new EventEmitter();
        this.over = new EventEmitter();
        this.out = new EventEmitter();
        this.remove = new EventEmitter();
        this.cancel = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get dropZones() {
        return this._dropZones || this._defaultZones;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set dropZones(val) {
        this._dropZones = val;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._defaultZones = [this.dropZone];
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.droppable.drag.subscribe((v) => this.drag.emit(v));
        this.droppable.drop.subscribe((v) => this.drop.emit(v));
        this.droppable.over.subscribe((v) => this.over.emit(v));
        this.droppable.out.subscribe((v) => this.out.emit(v));
        this.droppable.remove.subscribe((v) => this.remove.emit(v));
        this.droppable.cancel.subscribe((v) => this.cancel.emit(v));
    }
}
ContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-dnd-container',
                template: `<div
  ngxDroppable
  [dropZone]="dropZone"
  [model]="model"
  [copy]="copy"
  [ngClass]="{ 'gu-empty': !model?.length }"
  [removeOnSpill]="removeOnSpill"
  class='ngx-dnd-container'>
  <ng-container *ngIf="model">
    <ng-container *ngFor="let item of model">
      <ngx-dnd-item
        ngxDraggable
        [model]="item"
        [dropZone]="dropZone"
        [dropZones]="dropZones"
        [copy]="copy"
        [moves]="moves"
        [removeOnSpill]="removeOnSpill"
        [droppableItemClass]="droppableItemClass">
      </ngx-dnd-item>
    </ng-container>
  </ng-container>
  <ng-content *ngIf="!model"></ng-content>
</div>
`,
                styles: [`.ngx-dnd-container{background-color:rgba(255,255,255,.2);border:2px solid red;margin:10px;padding:10px}.ngx-dnd-container.gu-empty{border:2px dotted red}.ngx-dnd-container:nth-child(odd){background-color:rgba(0,0,0,.2)}.ngx-dnd-container .ex-moved{background-color:#e74c3c}.ngx-dnd-container .ex-over{background-color:rgba(255,255,255,.3)}.ngx-dnd-container .handle{padding:0 5px;margin-right:5px;background-color:rgba(0,0,0,.4);cursor:move}.no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}`],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
ContainerComponent.propDecorators = {
    "model": [{ type: Input },],
    "copy": [{ type: Input },],
    "removeOnSpill": [{ type: Input },],
    "droppableItemClass": [{ type: Input },],
    "dropZone": [{ type: Input },],
    "dropZones": [{ type: Input },],
    "moves": [{ type: Input },],
    "template": [{ type: Input }, { type: ContentChild, args: [TemplateRef,] },],
    "droppable": [{ type: Input }, { type: ViewChild, args: [DroppableDirective,] },],
    "drop": [{ type: Output },],
    "drag": [{ type: Output },],
    "over": [{ type: Output },],
    "out": [{ type: Output },],
    "remove": [{ type: Output },],
    "cancel": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Component that allows nested ngxDroppable and ngxDraggables
 * Should only be use inside a ngx-dnd-container
 * Outside a ngx-dnd-container use ngxDroppable
 *
 * @export
 */
class ItemComponent {
    /**
     * @param {?} container
     * @param {?} draggableDirective
     */
    constructor(container, draggableDirective) {
        this.container = container;
        this.draggableDirective = draggableDirective;
        this._copy = false;
        this._removeOnSpill = false;
    }
    /**
     * @return {?}
     */
    get dropZone() {
        return this._dropZone || this.container.dropZone;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set dropZone(val) {
        this._dropZone = val;
    }
    /**
     * @return {?}
     */
    get dropZones() {
        return this._dropZones || this.container.dropZones;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set dropZones(val) {
        this._dropZones = val;
    }
    /**
     * @return {?}
     */
    get droppableItemClass() {
        return this._droppableItemClass || this.container.droppableItemClass;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set droppableItemClass(val) {
        this._droppableItemClass = val;
    }
    /**
     * @return {?}
     */
    get removeOnSpill() {
        return typeof this._removeOnSpill === 'boolean' ? this._removeOnSpill : this.container.removeOnSpill;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set removeOnSpill(val) {
        this._removeOnSpill = val;
    }
    /**
     * @return {?}
     */
    get copy() {
        return typeof this._copy === 'boolean' ? this._copy : this.container.copy;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set copy(val) {
        this._copy = val;
    }
    /**
     * @return {?}
     */
    get hasHandle() {
        return this.draggableDirective.hasHandle;
    }
    /**
     * @return {?}
     */
    get moveDisabled() {
        return !this.draggableDirective.canMove();
    }
    /**
     * @return {?}
     */
    get classString() {
        const /** @type {?} */ itemClass = typeof this.droppableItemClass === 'function' ? this.droppableItemClass(this.model) : this.droppableItemClass;
        const /** @type {?} */ classes = ['ngx-dnd-item', itemClass || ''];
        if (this.moveDisabled) {
            classes.push('move-disabled');
        }
        if (this.hasHandle) {
            classes.push('has-handle');
        }
        return classes.join(' ');
    }
    /**
     * @return {?}
     */
    get type() {
        if (Array.isArray(this.model)) {
            return 'array';
        }
        return typeof this.model;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.data = {
            model: this.model,
            type: this.type,
            dropZone: this.dropZone,
            template: this.container.template
        };
    }
}
ItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-dnd-item',
                template: `<ng-container [ngSwitch]="type">

  <ng-container *ngSwitchCase="'array'">
    <ngx-dnd-container
      [model]="model"
      [template]="container.template"
      [dropZone]="dropZone"
      [dropZones]="dropZones"
      [removeOnSpill]="removeOnSpill"
      [droppableItemClass]="droppableItemClass"
      [copy]="copy">
    </ngx-dnd-container>
  </ng-container>

  <ng-container *ngSwitchCase="'object'">
    <ng-template
      *ngIf="container.template"
      [ngTemplateOutlet]="container.template"
      [ngTemplateOutletContext]="data">
    </ng-template>
    <ng-container *ngIf="!container.template">
      <div
        class="ngx-dnd-content">
        {{model.label}}
      </div>
      <ngx-dnd-container
        *ngIf="model.children"
        [model]="model.children"
        [template]="container.template"
        [dropZone]="dropZone"
        [dropZones]="dropZones"
        [removeOnSpill]="removeOnSpill"
        [droppableItemClass]="droppableItemClass"
        [copy]="copy">
      </ngx-dnd-container>
    </ng-container>
  </ng-container>

  <ng-container *ngSwitchCase="'undefined'">
  </ng-container>

  <ng-container *ngSwitchDefault>
    <ng-template
      *ngIf="container.template"
      [ngTemplateOutlet]="container.template"
      [ngTemplateOutletContext]="data">
    </ng-template>
    <div
      *ngIf="!container.template"
      class="ngx-dnd-content">
      {{model}}
    </div>
  </ng-container>

</ng-container>







`,
                styles: [`.ngx-dnd-item{margin:10px;padding:10px;background-color:rgba(0,0,0,.2);transition:opacity .4s ease-in-out;border:1px solid #add8e6;display:block}.ngx-dnd-item.has-handle [ngxDragHandle],.ngx-dnd-item.has-handle [ngxdraghandle],.ngx-dnd-item:not(.has-handle):not(.move-disabled){cursor:move;cursor:grab;cursor:-webkit-grab}.ngx-dnd-item .ngx-dnd-content{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ngx-dnd-item:hover{border:1px solid #00f}.gu-mirror{position:fixed!important;margin:0!important;z-index:9999!important;opacity:.8}.gu-hide{display:none!important}.gu-unselectable{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.gu-transit{opacity:.2}`],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
ItemComponent.ctorParameters = () => [
    { type: ContainerComponent, },
    { type: DraggableDirective, },
];
ItemComponent.propDecorators = {
    "model": [{ type: Input },],
    "dropZone": [{ type: Input },],
    "dropZones": [{ type: Input },],
    "droppableItemClass": [{ type: Input },],
    "removeOnSpill": [{ type: Input },],
    "copy": [{ type: Input },],
    "classString": [{ type: HostBinding, args: ['class',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ components = [ContainerComponent, ItemComponent];
const /** @type {?} */ directives = [DraggableDirective, DroppableDirective, DragHandleDirective];
class NgxDnDModule {
}
NgxDnDModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [...components, ...directives],
                exports: [...components, ...directives],
                providers: [DrakeStoreService]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { DraggableDirective, DroppableDirective, DragHandleDirective, ItemComponent, ContainerComponent, DrakeStoreService, NgxDnDModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpbWxhbmUtbmd4LWRuZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHN3aW1sYW5lL25neC1kbmQvbGliL3NlcnZpY2VzL2RyYWtlLXN0b3JlLnNlcnZpY2UudHMiLCJuZzovL0Bzd2ltbGFuZS9uZ3gtZG5kL2xpYi9kaXJlY3RpdmVzL25neC1kcm9wcGFibGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ac3dpbWxhbmUvbmd4LWRuZC9saWIvZGlyZWN0aXZlcy9uZ3gtZHJhZ2dhYmxlLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHN3aW1sYW5lL25neC1kbmQvbGliL2RpcmVjdGl2ZXMvbmd4LWRyYWctaGFuZGxlLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHN3aW1sYW5lL25neC1kbmQvbGliL2NvbXBvbmVudHMvY29udGFpbmVyL2NvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL0Bzd2ltbGFuZS9uZ3gtZG5kL2xpYi9jb21wb25lbnRzL2l0ZW0vaXRlbS5jb21wb25lbnQudHMiLCJuZzovL0Bzd2ltbGFuZS9uZ3gtZG5kL2xpYi9uZ3gtZG5kLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIGRyYWd1bGFOYW1lc3BhY2UgZnJvbSAnQHN3aW1sYW5lL2RyYWd1bGEnO1xuaW1wb3J0IHsgRHJvcHBhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9uZ3gtZHJvcHBhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuLi9kaXJlY3RpdmVzL25neC1kcmFnZ2FibGUuZGlyZWN0aXZlJztcblxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9kaGVyZ2VzL25nLXBhY2thZ3IvaXNzdWVzLzIxN1xuY29uc3QgZHJhZ3VsYSA9IGRyYWd1bGFOYW1lc3BhY2U7XG5cbi8qKlxuICogQ2VudHJhbCBzZXJ2aWNlIHRoYXQgaGFuZGxlcyBhbGwgZXZlbnRzXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRHJha2VTdG9yZVNlcnZpY2Uge1xuICBwcml2YXRlIGRyb3BwYWJsZU1hcCA9IG5ldyBXZWFrTWFwPGFueSwgRHJvcHBhYmxlRGlyZWN0aXZlPigpO1xuICBwcml2YXRlIGRyYWdnYWJsZU1hcCA9IG5ldyBXZWFrTWFwPGFueSwgRHJhZ2dhYmxlRGlyZWN0aXZlPigpO1xuICBwcml2YXRlIGRyYWd1bGFPcHRpb25zOiBkcmFndWxhTmFtZXNwYWNlLkRyYWd1bGFPcHRpb25zO1xuICBwcml2YXRlIGRyYWtlOiBkcmFndWxhTmFtZXNwYWNlLkRyYWtlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZHJhZ3VsYU9wdGlvbnMgPSB0aGlzLmNyZWF0ZURyYWtlT3B0aW9ucygpO1xuICAgIHRoaXMuZHJha2UgPSBkcmFndWxhKFtdLCB0aGlzLmRyYWd1bGFPcHRpb25zKTtcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKCk7XG4gIH1cblxuICByZWdpc3Rlcihkcm9wcGFibGU6IERyb3BwYWJsZURpcmVjdGl2ZSkge1xuICAgIHRoaXMuZHJvcHBhYmxlTWFwLnNldChkcm9wcGFibGUuY29udGFpbmVyLCBkcm9wcGFibGUpO1xuICAgIHRoaXMuZHJha2UuY29udGFpbmVycy5wdXNoKGRyb3BwYWJsZS5jb250YWluZXIpO1xuICB9XG5cbiAgcmVtb3ZlKGRyb3BwYWJsZTogRHJvcHBhYmxlRGlyZWN0aXZlKSB7XG4gICAgdGhpcy5kcm9wcGFibGVNYXAuZGVsZXRlKGRyb3BwYWJsZS5jb250YWluZXIpO1xuICAgIGNvbnN0IGlkeCA9IHRoaXMuZHJha2UuY29udGFpbmVycy5pbmRleE9mKGRyb3BwYWJsZS5jb250YWluZXIpO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgdGhpcy5kcmFrZS5jb250YWluZXJzLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyRHJhZ2dhYmxlKGRyYWdnYWJsZTogRHJhZ2dhYmxlRGlyZWN0aXZlKSB7XG4gICAgdGhpcy5kcmFnZ2FibGVNYXAuc2V0KGRyYWdnYWJsZS5lbGVtZW50LCBkcmFnZ2FibGUpO1xuICB9XG5cbiAgcmVtb3ZlRHJhZ2dhYmxlKGRyYWdnYWJsZTogRHJhZ2dhYmxlRGlyZWN0aXZlKSB7XG4gICAgdGhpcy5kcmFnZ2FibGVNYXAuZGVsZXRlKGRyYWdnYWJsZS5lbGVtZW50KTtcbiAgfVxuXG4gIGNyZWF0ZURyYWtlT3B0aW9ucygpOiBkcmFndWxhTmFtZXNwYWNlLkRyYWd1bGFPcHRpb25zIHtcbiAgICBjb25zdCBhY2NlcHRzID0gKGVsOiBhbnksIHRhcmdldDogYW55IC8qLCBzb3VyY2U6IGFueSwgc2libGluZzogYW55ICovKSA9PiB7XG4gICAgICBpZiAoZWwuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBjb25zdCBlbGVtZW50Q29tcG9uZW50ID0gdGhpcy5kcmFnZ2FibGVNYXAuZ2V0KGVsKTtcbiAgICAgIGNvbnN0IHRhcmdldENvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldCh0YXJnZXQpO1xuICAgICAgaWYgKGVsZW1lbnRDb21wb25lbnQgJiYgdGFyZ2V0Q29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Q29tcG9uZW50LmRyb3Bab25lcy5pbmNsdWRlcyh0YXJnZXRDb21wb25lbnQuZHJvcFpvbmUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIGNvbnN0IGNvcHkgPSAoXzogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgY29uc3Qgc291cmNlQ29tcG9uZW50ID0gdGhpcy5kcm9wcGFibGVNYXAuZ2V0KHNvdXJjZSk7XG4gICAgICBpZiAoc291cmNlQ29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybiBzb3VyY2VDb21wb25lbnQuY29weTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3QgbW92ZXMgPSAoZWw/OiBhbnksIHNvdXJjZT86IGFueSwgaGFuZGxlPzogYW55LCBzaWJsaW5nPzogYW55KSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50Q29tcG9uZW50ID0gdGhpcy5kcmFnZ2FibGVNYXAuZ2V0KGVsKTtcbiAgICAgIGlmIChlbGVtZW50Q29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Q29tcG9uZW50Lm1vdmVzKHNvdXJjZSwgaGFuZGxlLCBzaWJsaW5nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICByZXR1cm4geyBhY2NlcHRzLCBjb3B5LCBtb3ZlcywgcmV2ZXJ0T25TcGlsbDogdHJ1ZSwgZGlyZWN0aW9uOiAndmVydGljYWwnIH07XG4gIH1cblxuICByZWdpc3RlckV2ZW50cygpOiB2b2lkIHtcbiAgICBsZXQgZHJhZ0VsbTogYW55O1xuICAgIGxldCBkcmFnZ2VkSXRlbTogYW55O1xuXG4gICAgdGhpcy5kcmFrZS5vbignZHJhZycsIChlbDogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgZHJhZ2dlZEl0ZW0gPSB1bmRlZmluZWQ7XG4gICAgICBkcmFnRWxtID0gZWw7XG5cbiAgICAgIGlmICghZWwgfHwgIXNvdXJjZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmRyYWdnYWJsZU1hcC5oYXMoZWwpKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRDb21wb25lbnQgPSB0aGlzLmRyYWdnYWJsZU1hcC5nZXQoZWwpO1xuICAgICAgICBkcmFnZ2VkSXRlbSA9IGVsZW1lbnRDb21wb25lbnQubW9kZWw7XG5cbiAgICAgICAgZWxlbWVudENvbXBvbmVudC5kcmFnLmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdkcmFnJyxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgdmFsdWU6IGRyYWdnZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kcm9wcGFibGVNYXAuaGFzKHNvdXJjZSkpIHtcbiAgICAgICAgY29uc3Qgc291cmNlQ29tcG9uZW50ID0gdGhpcy5kcm9wcGFibGVNYXAuZ2V0KHNvdXJjZSk7XG4gICAgICAgIHRoaXMuZHJhZ3VsYU9wdGlvbnMucmVtb3ZlT25TcGlsbCA9IHNvdXJjZUNvbXBvbmVudC5yZW1vdmVPblNwaWxsO1xuXG4gICAgICAgIHNvdXJjZUNvbXBvbmVudC5kcmFnLmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdkcmFnJyxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgc291cmNlQ29tcG9uZW50LFxuICAgICAgICAgIHZhbHVlOiBkcmFnZ2VkSXRlbVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZHJha2Uub24oJ2Ryb3AnLCAoZWw6IGFueSwgdGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXRDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQodGFyZ2V0KTtcblxuICAgICAgaWYgKCF0YXJnZXRDb21wb25lbnQpIHtcbiAgICAgICAgLy8gbm90IGEgdGFyZ2V0LCBhYm9ydFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBkcm9wRWxtTW9kZWwgPSBkcmFnZ2VkSXRlbTtcbiAgICAgIGNvbnN0IGRyb3BJbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwodGFyZ2V0LmNoaWxkcmVuLCBlbCk7XG5cbiAgICAgIGlmIChkcm9wSW5kZXggPCAwKSB7XG4gICAgICAgIC8vIGRyb3BJbmRleCBpcyBiYWQuLi4gY2FuY2VsXG4gICAgICAgIHRoaXMuZHJha2UuY2FuY2VsKHRydWUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNvdXJjZUNvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldChzb3VyY2UpO1xuXG4gICAgICBpZiAoc291cmNlQ29tcG9uZW50KSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZU1vZGVsID0gc291cmNlQ29tcG9uZW50Lm1vZGVsO1xuICAgICAgICBjb25zdCB0YXJnZXRNb2RlbCA9IHRhcmdldENvbXBvbmVudC5tb2RlbDtcblxuICAgICAgICBjb25zdCBoYXNEcmFnTW9kZWwgPSAhIShzb3VyY2VNb2RlbCAmJiBkcmFnZ2VkSXRlbSk7XG4gICAgICAgIGNvbnN0IGRyYWdJbmRleCA9IGhhc0RyYWdNb2RlbCA/IHNvdXJjZU1vZGVsLmluZGV4T2YoZHJhZ2dlZEl0ZW0pIDogLTE7XG4gICAgICAgIGlmIChoYXNEcmFnTW9kZWwgJiYgZHJhZ0luZGV4IDwgMCkge1xuICAgICAgICAgIC8vIGRyYWdJbmRleCBpcyBiYWQuLi4gY2FuY2VsXG4gICAgICAgICAgdGhpcy5kcmFrZS5jYW5jZWwodHJ1ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldE1vZGVsKSB7XG4gICAgICAgICAgY29uc3QgcmVvcmRlciA9IGRyYWdJbmRleCA+IC0xICYmIHNvdXJjZU1vZGVsICYmIHRhcmdldCA9PT0gc291cmNlO1xuICAgICAgICAgIGNvbnN0IGNvcHkgPSAhc291cmNlTW9kZWwgfHwgZHJhZ0VsbSAhPT0gZWw7XG4gICAgICAgICAgaWYgKHJlb3JkZXIpIHtcbiAgICAgICAgICAgIHNvdXJjZU1vZGVsLnNwbGljZShkcm9wSW5kZXgsIDAsIHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpWzBdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGVsLnBhcmVudE5vZGUgPT09IHRhcmdldCkge1xuICAgICAgICAgICAgICB0YXJnZXQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29weSkge1xuICAgICAgICAgICAgICBkcm9wRWxtTW9kZWwgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRyb3BFbG1Nb2RlbCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGVsLnBhcmVudE5vZGUgIT09IHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIC8vIGFkZCBlbGVtZW50IGJhY2ssIGxldCBhbmd1bGFyIHJlbW92ZSBpdFxuICAgICAgICAgICAgICAgIHRoaXMuZHJha2UuY2FuY2VsKHRydWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0TW9kZWwuc3BsaWNlKGRyb3BJbmRleCwgMCwgZHJvcEVsbU1vZGVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGFyZ2V0Q29tcG9uZW50LmRyb3AuZW1pdCh7XG4gICAgICAgIHR5cGU6ICdkcm9wJyxcbiAgICAgICAgZWwsXG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgdmFsdWU6IGRyb3BFbG1Nb2RlbCxcbiAgICAgICAgZHJvcEluZGV4XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZHJha2Uub24oJ3JlbW92ZScsIChlbDogYW55LCBjb250YWluZXI6IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU1hcC5oYXMoc291cmNlKSkge1xuICAgICAgICBjb25zdCBzb3VyY2VDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQoc291cmNlKTtcbiAgICAgICAgY29uc3Qgc291cmNlTW9kZWwgPSBzb3VyY2VDb21wb25lbnQubW9kZWw7XG5cbiAgICAgICAgY29uc3QgZHJhZ0luZGV4ID0gZHJhZ2dlZEl0ZW0gJiYgc291cmNlTW9kZWwgPyBzb3VyY2VNb2RlbC5pbmRleE9mKGRyYWdnZWRJdGVtKSA6IC0xO1xuXG4gICAgICAgIGlmIChkcmFnSW5kZXggPiAtMSkge1xuICAgICAgICAgIGlmIChlbC5wYXJlbnROb2RlICE9PSBzb3VyY2UpIHtcbiAgICAgICAgICAgIC8vIGFkZCBlbGVtZW50IGJhY2ssIGxldCBhbmd1bGFyIHJlbW92ZSBpdFxuICAgICAgICAgICAgc291cmNlLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc291cmNlTW9kZWwuc3BsaWNlKGRyYWdJbmRleCwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBzb3VyY2VDb21wb25lbnQucmVtb3ZlLmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdyZW1vdmUnLFxuICAgICAgICAgIGVsLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgdmFsdWU6IGRyYWdnZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kcmFrZS5vbignY2FuY2VsJywgKGVsOiBhbnksIGNvbnRhaW5lcjogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTWFwLmhhcyhjb250YWluZXIpKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckNvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldChjb250YWluZXIpO1xuICAgICAgICBjb250YWluZXJDb21wb25lbnQuY2FuY2VsLmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdjYW5jZWwnLFxuICAgICAgICAgIGVsLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgdmFsdWU6IGRyYWdnZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kcmFrZS5vbignb3ZlcicsIChlbDogYW55LCBjb250YWluZXI6IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU1hcC5oYXMoY29udGFpbmVyKSkge1xuICAgICAgICBjb25zdCBjb250YWluZXJDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQoY29udGFpbmVyKTtcbiAgICAgICAgY29udGFpbmVyQ29tcG9uZW50Lm92ZXIuZW1pdCh7XG4gICAgICAgICAgdHlwZTogJ292ZXInLFxuICAgICAgICAgIGVsLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgdmFsdWU6IGRyYWdnZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kcmFrZS5vbignb3V0JywgKGVsOiBhbnksIGNvbnRhaW5lcjogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTWFwLmhhcyhjb250YWluZXIpKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckNvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldChjb250YWluZXIpO1xuICAgICAgICBjb250YWluZXJDb21wb25lbnQub3V0LmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdvdXQnLFxuICAgICAgICAgIGVsLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgdmFsdWU6IGRyYWdnZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBBZnRlclZpZXdJbml0LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRHJha2VTdG9yZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9kcmFrZS1zdG9yZS5zZXJ2aWNlJztcblxubGV0IGkgPSAxMDAwMDtcbmZ1bmN0aW9uIGdldE5leHRJZCgpIHtcbiAgcmV0dXJuIGkrKztcbn1cblxuLyoqXG4gKiBNYWtlcyB0aGUgY29udGFpbmVyIGRyb3BwYWJsZSBhbmQgY2hpbGRyZW4gZHJhZ2dhYmxlLlxuICpcbiAqIEBleHBvcnRcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25neERyb3BwYWJsZV0nIH0pXG5leHBvcnQgY2xhc3MgRHJvcHBhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBtb2RlbDogYW55O1xuICBASW5wdXQoKSBjb3B5ID0gZmFsc2U7XG4gIEBJbnB1dCgpIHJlbW92ZU9uU3BpbGwgPSBmYWxzZTtcbiAgQElucHV0KCkgbmd4RHJvcHBhYmxlOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGRyb3A6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIGRyYWc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG92ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG91dDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBjYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgZ2V0IGNvbnRhaW5lcigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgZHJvcFpvbmUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcFpvbmUgfHwgdGhpcy5uZ3hEcm9wcGFibGUgfHwgdGhpcy5kZWZhdWx0Wm9uZTtcbiAgfVxuICBzZXQgZHJvcFpvbmUodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9kcm9wWm9uZSA9IHZhbDtcbiAgfVxuXG4gIGRlZmF1bHRab25lOiBzdHJpbmc7XG4gIF9kcm9wWm9uZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBkcmFrZXNTZXJ2aWNlOiBEcmFrZVN0b3JlU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRlZmF1bHRab25lID0gYEBARGVmYXVsdERyb3Bab25lLSR7Z2V0TmV4dElkKCl9QEBgO1xuICAgIHRoaXMuZHJha2VzU2VydmljZS5yZWdpc3Rlcih0aGlzKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXIuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXIsICdndS1vdmVyJyk7XG4gICAgfSk7XG4gICAgdGhpcy5vdXQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250YWluZXIsICdndS1vdmVyJyk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRyYWtlc1NlcnZpY2UucmVtb3ZlKHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEcm9wcGFibGVEaXJlY3RpdmUgfSBmcm9tICcuL25neC1kcm9wcGFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERyYWtlU3RvcmVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZHJha2Utc3RvcmUuc2VydmljZSc7XG5cbi8qKlxuICogQWRkcyBwcm9wZXJ0aWVzIGFuZCBldmVudHMgdG8gZHJhZ2dhYmxlIGVsZW1lbnRzXG4gKlxuICogQGV4cG9ydFxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmd4RHJhZ2dhYmxlXScgfSlcbmV4cG9ydCBjbGFzcyBEcmFnZ2FibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIG5neERyYWdnYWJsZTogc3RyaW5nW107XG4gIEBJbnB1dCgpIG1vZGVsOiBhbnk7XG5cbiAgQElucHV0KClcbiAgZ2V0IGRyb3Bab25lcygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9kcm9wWm9uZXMgfHwgdGhpcy5uZ3hEcmFnZ2FibGUgfHwgdGhpcy5fcGFyZW50RHJvcHpvbmVzO1xuICB9XG4gIHNldCBkcm9wWm9uZXModmFsOiBhbnkpIHtcbiAgICB0aGlzLl9kcm9wWm9uZXMgPSB2YWw7XG4gIH1cblxuICBASW5wdXQoJ21vdmVzJykgX21vdmVzOiBib29sZWFuIHwgKCguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9IHRydWU7XG5cbiAgLypcbiAgQ29udGVudENoaWxkcmVuIGRvZXNuJ3QgZ2V0IGNoaWxkcmVuIGNyZWF0ZWQgd2l0aCBOZ1RlbXBsYXRlT3V0bGV0XG4gIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNDg0MlxuICBJbXBsZW1lbnRlZCB2aWEgdXBkYXRlRWxlbWVudHMgbWV0aG9kXG5cbiAgQENvbnRlbnRDaGlsZHJlbihEcmFnSGFuZGxlRGlyZWN0aXZlLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuICBoYW5kbGVzTGlzdDogUXVlcnlMaXN0PERyYWdIYW5kbGVEaXJlY3RpdmU+OyAqL1xuXG4gIGhhbmRsZXM6IGFueVtdID0gW107XG5cbiAgZ2V0IGhhc0hhbmRsZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmhhbmRsZXMubGVuZ3RoO1xuICB9XG5cbiAgQE91dHB1dCgpIGRyYWc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgZHJhZ0RlbGF5OiBudW1iZXIgPSAyMDA7IC8vIG1pbGxpc2Vjb25kc1xuICBkcmFnRGVsYXllZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgdG91Y2hUaW1lb3V0OiBhbnk7XG5cbiAgZ2V0IGVsZW1lbnQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgX2Ryb3Bab25lczogc3RyaW5nW107XG4gIF9wYXJlbnREcm9wem9uZXM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBkcmFrZXNTZXJ2aWNlOiBEcmFrZVN0b3JlU2VydmljZSxcbiAgICBwcml2YXRlIGRyb3BwYWJsZURpcmVjdGl2ZTogRHJvcHBhYmxlRGlyZWN0aXZlXG4gICkge31cblxuICAvLyBGcm9tOiBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYS9pc3N1ZXMvMjg5I2lzc3VlY29tbWVudC0yNzcxNDMxNzJcbiAgQEhvc3RMaXN0ZW5lcigndG91Y2htb3ZlJywgWyckZXZlbnQnXSlcbiAgb25Nb3ZlKGU6IEV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9tb3ZlcyB8fCB0aGlzLmRyYWdEZWxheWVkKSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudG91Y2hUaW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd0b3VjaHN0YXJ0JylcbiAgb25Eb3duKCkge1xuICAgIGlmICh0aGlzLl9tb3Zlcykge1xuICAgICAgdGhpcy50b3VjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5kcmFnRGVsYXllZCA9IGZhbHNlO1xuICAgICAgfSwgdGhpcy5kcmFnRGVsYXkpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNoZW5kJylcbiAgb25VcCgpIHtcbiAgICBpZiAodGhpcy5fbW92ZXMpIHtcbiAgICAgIGNsZWFyVGltZW91dCg8bnVtYmVyPnRoaXMudG91Y2hUaW1lb3V0KTtcbiAgICAgIHRoaXMuZHJhZ0RlbGF5ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fcGFyZW50RHJvcHpvbmVzID0gW3RoaXMuZHJvcHBhYmxlRGlyZWN0aXZlLmRyb3Bab25lXTtcbiAgICB0aGlzLmRyYWtlc1NlcnZpY2UucmVnaXN0ZXJEcmFnZ2FibGUodGhpcyk7XG4gICAgdGhpcy51cGRhdGVFbGVtZW50cygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kcmFrZXNTZXJ2aWNlLnJlbW92ZURyYWdnYWJsZSh0aGlzKTtcbiAgfVxuXG4gIHVwZGF0ZUVsZW1lbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgaGFuZGxlczogTm9kZUxpc3QgPSBuYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuZ3hkcmFnaGFuZGxlXScpO1xuICAgIHRoaXMuaGFuZGxlcyA9IEFycmF5LmZyb20oaGFuZGxlcykuZmlsdGVyKChoOiBhbnkpID0+IGZpbmRGaXJzdERyYWdnYWJsZVBhcmVudChoKSA9PT0gbmF0aXZlRWxlbWVudCk7XG5cbiAgICBmdW5jdGlvbiBmaW5kRmlyc3REcmFnZ2FibGVQYXJlbnQoYzogYW55KSB7XG4gICAgICB3aGlsZSAoYy5wYXJlbnROb2RlKSB7XG4gICAgICAgIGMgPSBjLnBhcmVudE5vZGU7XG4gICAgICAgIGlmIChjLmhhc0F0dHJpYnV0ZSAmJiBjLmhhc0F0dHJpYnV0ZSgnbmd4ZHJhZ2dhYmxlJykpIHtcbiAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNhbk1vdmUoc291cmNlPzogYW55LCBoYW5kbGU/OiBhbnksIHNpYmxpbmc/OiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuX21vdmVzID09PSAnYm9vbGVhbicpIHJldHVybiB0aGlzLl9tb3ZlcztcbiAgICBpZiAodHlwZW9mIHRoaXMuX21vdmVzID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdGhpcy5fbW92ZXModGhpcy5tb2RlbCwgc291cmNlLCBoYW5kbGUsIHNpYmxpbmcpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbW92ZXMoc291cmNlOiBhbnksIGhhbmRsZTogYW55LCBzaWJsaW5nOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuY2FuTW92ZShzb3VyY2UsIGhhbmRsZSwgc2libGluZykpIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB0aGlzLmhhc0hhbmRsZSA/IHRoaXMuaGFuZGxlcy5zb21lKGggPT4gaGFuZGVsRm9yKGhhbmRsZSwgaCkpIDogdHJ1ZTtcblxuICAgIGZ1bmN0aW9uIGhhbmRlbEZvcihjOiBhbnksIHA6IGFueSkge1xuICAgICAgaWYgKGMgPT09IHApIHJldHVybiB0cnVlO1xuICAgICAgd2hpbGUgKChjID0gYy5wYXJlbnROb2RlKSAmJiBjICE9PSBwKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgcmV0dXJuICEhYztcbiAgICB9XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVFbGVtZW50cygpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBZGRzIHByb3BlcnRpZXMgYW5kIGV2ZW50cyB0byBkcmFnIGhhbmRsZSBlbGVtZW50c1xuICpcbiAqIEBleHBvcnRcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25neERyYWdIYW5kbGVdJyB9KVxuZXhwb3J0IGNsYXNzIERyYWdIYW5kbGVEaXJlY3RpdmUge31cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ29udGVudENoaWxkLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERyb3BwYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvbmd4LWRyb3BwYWJsZS5kaXJlY3RpdmUnO1xuXG5sZXQgaSA9IDA7XG5mdW5jdGlvbiBnZXROZXh0SWQoKSB7XG4gIHJldHVybiBpKys7XG59XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgYWxsb3dzIG5lc3RlZCBuZ3hEcm9wcGFibGUgYW5kIG5neERyYWdnYWJsZXNcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1kbmQtY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2XG4gIG5neERyb3BwYWJsZVxuICBbZHJvcFpvbmVdPVwiZHJvcFpvbmVcIlxuICBbbW9kZWxdPVwibW9kZWxcIlxuICBbY29weV09XCJjb3B5XCJcbiAgW25nQ2xhc3NdPVwieyAnZ3UtZW1wdHknOiAhbW9kZWw/Lmxlbmd0aCB9XCJcbiAgW3JlbW92ZU9uU3BpbGxdPVwicmVtb3ZlT25TcGlsbFwiXG4gIGNsYXNzPSduZ3gtZG5kLWNvbnRhaW5lcic+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RlbFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbW9kZWxcIj5cbiAgICAgIDxuZ3gtZG5kLWl0ZW1cbiAgICAgICAgbmd4RHJhZ2dhYmxlXG4gICAgICAgIFttb2RlbF09XCJpdGVtXCJcbiAgICAgICAgW2Ryb3Bab25lXT1cImRyb3Bab25lXCJcbiAgICAgICAgW2Ryb3Bab25lc109XCJkcm9wWm9uZXNcIlxuICAgICAgICBbY29weV09XCJjb3B5XCJcbiAgICAgICAgW21vdmVzXT1cIm1vdmVzXCJcbiAgICAgICAgW3JlbW92ZU9uU3BpbGxdPVwicmVtb3ZlT25TcGlsbFwiXG4gICAgICAgIFtkcm9wcGFibGVJdGVtQ2xhc3NdPVwiZHJvcHBhYmxlSXRlbUNsYXNzXCI+XG4gICAgICA8L25neC1kbmQtaXRlbT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxuZy1jb250ZW50ICpuZ0lmPVwiIW1vZGVsXCI+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLm5neC1kbmQtY29udGFpbmVye2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuMik7Ym9yZGVyOjJweCBzb2xpZCByZWQ7bWFyZ2luOjEwcHg7cGFkZGluZzoxMHB4fS5uZ3gtZG5kLWNvbnRhaW5lci5ndS1lbXB0eXtib3JkZXI6MnB4IGRvdHRlZCByZWR9Lm5neC1kbmQtY29udGFpbmVyOm50aC1jaGlsZChvZGQpe2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMil9Lm5neC1kbmQtY29udGFpbmVyIC5leC1tb3ZlZHtiYWNrZ3JvdW5kLWNvbG9yOiNlNzRjM2N9Lm5neC1kbmQtY29udGFpbmVyIC5leC1vdmVye2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuMyl9Lm5neC1kbmQtY29udGFpbmVyIC5oYW5kbGV7cGFkZGluZzowIDVweDttYXJnaW4tcmlnaHQ6NXB4O2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNCk7Y3Vyc29yOm1vdmV9Lm5vLXNlbGVjdHstd2Via2l0LXRvdWNoLWNhbGxvdXQ6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgbW9kZWw6IGFueTtcbiAgQElucHV0KCkgY29weSA9IGZhbHNlO1xuICBASW5wdXQoKSByZW1vdmVPblNwaWxsID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRyb3BwYWJsZUl0ZW1DbGFzczogc3RyaW5nIHwgKChvOiBhbnkpID0+IGFueSk7XG5cbiAgQElucHV0KCkgZHJvcFpvbmUgPSBgQEBEZWZhdWx0RHJvcFpvbmUtJHtnZXROZXh0SWQoKX1AQGA7XG5cbiAgQElucHV0KClcbiAgZ2V0IGRyb3Bab25lcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcFpvbmVzIHx8IHRoaXMuX2RlZmF1bHRab25lcztcbiAgfVxuICBzZXQgZHJvcFpvbmVzKHZhbCkge1xuICAgIHRoaXMuX2Ryb3Bab25lcyA9IHZhbDtcbiAgfVxuXG4gIEBJbnB1dCgpIG1vdmVzOiAobW9kZWw6IGFueSwgc291cmNlOiBhbnksIGhhbmRsZTogYW55LCBzaWJsaW5nOiBhbnkpID0+IGJvb2xlYW47XG5cbiAgLy8gQElucHV0KCkgY2xhc3NlczogYW55ID0ge307XG4gIC8vIEBJbnB1dCgpIGRyYWd1bGFPcHRpb25zOiBhbnk7XG5cbiAgQElucHV0KClcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZilcbiAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KClcbiAgQFZpZXdDaGlsZChEcm9wcGFibGVEaXJlY3RpdmUpXG4gIGRyb3BwYWJsZTogYW55O1xuXG4gIEBPdXRwdXQoKSBkcm9wOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBkcmFnOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvdmVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvdXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgY2FuY2VsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIF9kcm9wWm9uZXM6IHN0cmluZ1tdO1xuICBfZGVmYXVsdFpvbmVzOiBzdHJpbmdbXTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9kZWZhdWx0Wm9uZXMgPSBbdGhpcy5kcm9wWm9uZV07XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kcm9wcGFibGUuZHJhZy5zdWJzY3JpYmUoKHY6IGFueSkgPT4gdGhpcy5kcmFnLmVtaXQodikpO1xuICAgIHRoaXMuZHJvcHBhYmxlLmRyb3Auc3Vic2NyaWJlKCh2OiBhbnkpID0+IHRoaXMuZHJvcC5lbWl0KHYpKTtcbiAgICB0aGlzLmRyb3BwYWJsZS5vdmVyLnN1YnNjcmliZSgodjogYW55KSA9PiB0aGlzLm92ZXIuZW1pdCh2KSk7XG4gICAgdGhpcy5kcm9wcGFibGUub3V0LnN1YnNjcmliZSgodjogYW55KSA9PiB0aGlzLm91dC5lbWl0KHYpKTtcbiAgICB0aGlzLmRyb3BwYWJsZS5yZW1vdmUuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHRoaXMucmVtb3ZlLmVtaXQodikpO1xuICAgIHRoaXMuZHJvcHBhYmxlLmNhbmNlbC5zdWJzY3JpYmUoKHY6IGFueSkgPT4gdGhpcy5jYW5jZWwuZW1pdCh2KSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24sIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4uL2NvbnRhaW5lci9jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERyYWdnYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvbmd4LWRyYWdnYWJsZS5kaXJlY3RpdmUnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGFsbG93cyBuZXN0ZWQgbmd4RHJvcHBhYmxlIGFuZCBuZ3hEcmFnZ2FibGVzXG4gKiBTaG91bGQgb25seSBiZSB1c2UgaW5zaWRlIGEgbmd4LWRuZC1jb250YWluZXJcbiAqIE91dHNpZGUgYSBuZ3gtZG5kLWNvbnRhaW5lciB1c2Ugbmd4RHJvcHBhYmxlXG4gKlxuICogQGV4cG9ydFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZG5kLWl0ZW0nLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInR5cGVcIj5cblxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInYXJyYXknXCI+XG4gICAgPG5neC1kbmQtY29udGFpbmVyXG4gICAgICBbbW9kZWxdPVwibW9kZWxcIlxuICAgICAgW3RlbXBsYXRlXT1cImNvbnRhaW5lci50ZW1wbGF0ZVwiXG4gICAgICBbZHJvcFpvbmVdPVwiZHJvcFpvbmVcIlxuICAgICAgW2Ryb3Bab25lc109XCJkcm9wWm9uZXNcIlxuICAgICAgW3JlbW92ZU9uU3BpbGxdPVwicmVtb3ZlT25TcGlsbFwiXG4gICAgICBbZHJvcHBhYmxlSXRlbUNsYXNzXT1cImRyb3BwYWJsZUl0ZW1DbGFzc1wiXG4gICAgICBbY29weV09XCJjb3B5XCI+XG4gICAgPC9uZ3gtZG5kLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ29iamVjdCdcIj5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICpuZ0lmPVwiY29udGFpbmVyLnRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRhaW5lci50ZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiZGF0YVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjb250YWluZXIudGVtcGxhdGVcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJuZ3gtZG5kLWNvbnRlbnRcIj5cbiAgICAgICAge3ttb2RlbC5sYWJlbH19XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZ3gtZG5kLWNvbnRhaW5lclxuICAgICAgICAqbmdJZj1cIm1vZGVsLmNoaWxkcmVuXCJcbiAgICAgICAgW21vZGVsXT1cIm1vZGVsLmNoaWxkcmVuXCJcbiAgICAgICAgW3RlbXBsYXRlXT1cImNvbnRhaW5lci50ZW1wbGF0ZVwiXG4gICAgICAgIFtkcm9wWm9uZV09XCJkcm9wWm9uZVwiXG4gICAgICAgIFtkcm9wWm9uZXNdPVwiZHJvcFpvbmVzXCJcbiAgICAgICAgW3JlbW92ZU9uU3BpbGxdPVwicmVtb3ZlT25TcGlsbFwiXG4gICAgICAgIFtkcm9wcGFibGVJdGVtQ2xhc3NdPVwiZHJvcHBhYmxlSXRlbUNsYXNzXCJcbiAgICAgICAgW2NvcHldPVwiY29weVwiPlxuICAgICAgPC9uZ3gtZG5kLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ3VuZGVmaW5lZCdcIj5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hEZWZhdWx0PlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgKm5nSWY9XCJjb250YWluZXIudGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGFpbmVyLnRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJkYXRhXCI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8ZGl2XG4gICAgICAqbmdJZj1cIiFjb250YWluZXIudGVtcGxhdGVcIlxuICAgICAgY2xhc3M9XCJuZ3gtZG5kLWNvbnRlbnRcIj5cbiAgICAgIHt7bW9kZWx9fVxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cblxuPC9uZy1jb250YWluZXI+XG5cblxuXG5cblxuXG5cbmAsXG4gIHN0eWxlczogW2Aubmd4LWRuZC1pdGVte21hcmdpbjoxMHB4O3BhZGRpbmc6MTBweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjIpO3RyYW5zaXRpb246b3BhY2l0eSAuNHMgZWFzZS1pbi1vdXQ7Ym9yZGVyOjFweCBzb2xpZCAjYWRkOGU2O2Rpc3BsYXk6YmxvY2t9Lm5neC1kbmQtaXRlbS5oYXMtaGFuZGxlIFtuZ3hEcmFnSGFuZGxlXSwubmd4LWRuZC1pdGVtLmhhcy1oYW5kbGUgW25neGRyYWdoYW5kbGVdLC5uZ3gtZG5kLWl0ZW06bm90KC5oYXMtaGFuZGxlKTpub3QoLm1vdmUtZGlzYWJsZWQpe2N1cnNvcjptb3ZlO2N1cnNvcjpncmFiO2N1cnNvcjotd2Via2l0LWdyYWJ9Lm5neC1kbmQtaXRlbSAubmd4LWRuZC1jb250ZW50ey13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0ubmd4LWRuZC1pdGVtOmhvdmVye2JvcmRlcjoxcHggc29saWQgIzAwZn0uZ3UtbWlycm9ye3Bvc2l0aW9uOmZpeGVkIWltcG9ydGFudDttYXJnaW46MCFpbXBvcnRhbnQ7ei1pbmRleDo5OTk5IWltcG9ydGFudDtvcGFjaXR5Oi44fS5ndS1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Lmd1LXVuc2VsZWN0YWJsZXstd2Via2l0LXVzZXItc2VsZWN0Om5vbmUhaW1wb3J0YW50Oy1tb3otdXNlci1zZWxlY3Q6bm9uZSFpbXBvcnRhbnQ7LW1zLXVzZXItc2VsZWN0Om5vbmUhaW1wb3J0YW50O3VzZXItc2VsZWN0Om5vbmUhaW1wb3J0YW50fS5ndS10cmFuc2l0e29wYWNpdHk6LjJ9YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG1vZGVsOiBhbnk7XG5cbiAgQElucHV0KClcbiAgZ2V0IGRyb3Bab25lKCkge1xuICAgIHJldHVybiB0aGlzLl9kcm9wWm9uZSB8fCB0aGlzLmNvbnRhaW5lci5kcm9wWm9uZTtcbiAgfVxuICBzZXQgZHJvcFpvbmUodmFsKSB7XG4gICAgdGhpcy5fZHJvcFpvbmUgPSB2YWw7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgZHJvcFpvbmVzKCkge1xuICAgIHJldHVybiB0aGlzLl9kcm9wWm9uZXMgfHwgdGhpcy5jb250YWluZXIuZHJvcFpvbmVzO1xuICB9XG4gIHNldCBkcm9wWm9uZXModmFsKSB7XG4gICAgdGhpcy5fZHJvcFpvbmVzID0gdmFsO1xuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IGRyb3BwYWJsZUl0ZW1DbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcHBhYmxlSXRlbUNsYXNzIHx8IHRoaXMuY29udGFpbmVyLmRyb3BwYWJsZUl0ZW1DbGFzcztcbiAgfVxuICBzZXQgZHJvcHBhYmxlSXRlbUNsYXNzKHZhbCkge1xuICAgIHRoaXMuX2Ryb3BwYWJsZUl0ZW1DbGFzcyA9IHZhbDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCByZW1vdmVPblNwaWxsKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy5fcmVtb3ZlT25TcGlsbCA9PT0gJ2Jvb2xlYW4nID8gdGhpcy5fcmVtb3ZlT25TcGlsbCA6IHRoaXMuY29udGFpbmVyLnJlbW92ZU9uU3BpbGw7XG4gIH1cbiAgc2V0IHJlbW92ZU9uU3BpbGwodmFsKSB7XG4gICAgdGhpcy5fcmVtb3ZlT25TcGlsbCA9IHZhbDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBjb3B5KCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy5fY29weSA9PT0gJ2Jvb2xlYW4nID8gdGhpcy5fY29weSA6IHRoaXMuY29udGFpbmVyLmNvcHk7XG4gIH1cbiAgc2V0IGNvcHkodmFsKSB7XG4gICAgdGhpcy5fY29weSA9IHZhbDtcbiAgfVxuXG4gIF9jb3B5ID0gZmFsc2U7XG4gIF9kcm9wWm9uZTogYW55O1xuICBfZHJvcFpvbmVzOiBhbnk7XG4gIF9kcm9wcGFibGVJdGVtQ2xhc3M6IGFueTtcbiAgX3JlbW92ZU9uU3BpbGwgPSBmYWxzZTtcbiAgZGF0YTogYW55O1xuXG4gIGdldCBoYXNIYW5kbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlRGlyZWN0aXZlLmhhc0hhbmRsZTtcbiAgfVxuXG4gIGdldCBtb3ZlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmRyYWdnYWJsZURpcmVjdGl2ZS5jYW5Nb3ZlKCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGNsYXNzU3RyaW5nKCkge1xuICAgIGNvbnN0IGl0ZW1DbGFzcyA9XG4gICAgICB0eXBlb2YgdGhpcy5kcm9wcGFibGVJdGVtQ2xhc3MgPT09ICdmdW5jdGlvbicgPyB0aGlzLmRyb3BwYWJsZUl0ZW1DbGFzcyh0aGlzLm1vZGVsKSA6IHRoaXMuZHJvcHBhYmxlSXRlbUNsYXNzO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IFsnbmd4LWRuZC1pdGVtJywgaXRlbUNsYXNzIHx8ICcnXTtcbiAgICBpZiAodGhpcy5tb3ZlRGlzYWJsZWQpIHtcbiAgICAgIGNsYXNzZXMucHVzaCgnbW92ZS1kaXNhYmxlZCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5oYXNIYW5kbGUpIHtcbiAgICAgIGNsYXNzZXMucHVzaCgnaGFzLWhhbmRsZScpO1xuICAgIH1cbiAgICByZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLm1vZGVsKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgdGhpcy5tb2RlbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250YWluZXI6IENvbnRhaW5lckNvbXBvbmVudCwgcHVibGljIGRyYWdnYWJsZURpcmVjdGl2ZTogRHJhZ2dhYmxlRGlyZWN0aXZlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YSA9IHtcbiAgICAgIG1vZGVsOiB0aGlzLm1vZGVsLFxuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgZHJvcFpvbmU6IHRoaXMuZHJvcFpvbmUsXG4gICAgICB0ZW1wbGF0ZTogdGhpcy5jb250YWluZXIudGVtcGxhdGVcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgRHJhZ2dhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25neC1kcmFnZ2FibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERyb3BwYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtZHJvcHBhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFnSGFuZGxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25neC1kcmFnLWhhbmRsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbnRhaW5lci9jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaXRlbS9pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEcmFrZVN0b3JlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZHJha2Utc3RvcmUuc2VydmljZSc7XG5cbmNvbnN0IGNvbXBvbmVudHMgPSBbQ29udGFpbmVyQ29tcG9uZW50LCBJdGVtQ29tcG9uZW50XTtcbmNvbnN0IGRpcmVjdGl2ZXMgPSBbRHJhZ2dhYmxlRGlyZWN0aXZlLCBEcm9wcGFibGVEaXJlY3RpdmUsIERyYWdIYW5kbGVEaXJlY3RpdmVdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4uY29tcG9uZW50cywgLi4uZGlyZWN0aXZlc10sXG4gIGV4cG9ydHM6IFsuLi5jb21wb25lbnRzLCAuLi5kaXJlY3RpdmVzXSxcbiAgcHJvdmlkZXJzOiBbRHJha2VTdG9yZVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5neERuRE1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbImkiLCJnZXROZXh0SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFPQSx1QkFBTSxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7Ozs7OztBQVFqQztJQU1FOzRCQUx1QixJQUFJLE9BQU8sRUFBMkI7NEJBQ3RDLElBQUksT0FBTyxFQUEyQjtRQUszRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3ZCOzs7OztJQUVELFFBQVEsQ0FBQyxTQUE2QjtRQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMs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