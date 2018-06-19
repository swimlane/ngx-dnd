(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@swimlane/dragula'), require('tslib'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@swimlane/ngx-dnd', ['exports', '@angular/core', '@swimlane/dragula', 'tslib', '@angular/common'], factory) :
    (factory((global.swimlane = global.swimlane || {}, global.swimlane['ngx-dnd'] = {}),global.ng.core,null,global.tslib,global.ng.common));
}(this, (function (exports,core,dragulaNamespace,tslib_1,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    // see https://github.com/dherges/ng-packagr/issues/217
    var /** @type {?} */ dragula = dragulaNamespace;
    /**
     * Central service that handles all events
     *
     * @export
     */
    var DrakeStoreService = (function () {
        function DrakeStoreService() {
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
        DrakeStoreService.prototype.register = /**
         * @param {?} droppable
         * @return {?}
         */
            function (droppable) {
                this.droppableMap.set(droppable.container, droppable);
                this.drake.containers.push(droppable.container);
            };
        /**
         * @param {?} droppable
         * @return {?}
         */
        DrakeStoreService.prototype.remove = /**
         * @param {?} droppable
         * @return {?}
         */
            function (droppable) {
                this.droppableMap.delete(droppable.container);
                var /** @type {?} */ idx = this.drake.containers.indexOf(droppable.container);
                if (idx > -1) {
                    this.drake.containers.splice(idx, 1);
                }
            };
        /**
         * @param {?} draggable
         * @return {?}
         */
        DrakeStoreService.prototype.registerDraggable = /**
         * @param {?} draggable
         * @return {?}
         */
            function (draggable) {
                this.draggableMap.set(draggable.element, draggable);
            };
        /**
         * @param {?} draggable
         * @return {?}
         */
        DrakeStoreService.prototype.removeDraggable = /**
         * @param {?} draggable
         * @return {?}
         */
            function (draggable) {
                this.draggableMap.delete(draggable.element);
            };
        /**
         * @return {?}
         */
        DrakeStoreService.prototype.createDrakeOptions = /**
         * @return {?}
         */
            function () {
                var _this = this;
                var /** @type {?} */ accepts = function (el, target /*, source: any, sibling: any */) {
                    if (el.contains(target)) {
                        return false;
                    }
                    var /** @type {?} */ elementComponent = _this.draggableMap.get(el);
                    var /** @type {?} */ targetComponent = _this.droppableMap.get(target);
                    if (elementComponent && targetComponent) {
                        return elementComponent.dropZones.includes(targetComponent.dropZone);
                    }
                    return true;
                };
                var /** @type {?} */ copy = function (_, source) {
                    var /** @type {?} */ sourceComponent = _this.droppableMap.get(source);
                    if (sourceComponent) {
                        return sourceComponent.copy;
                    }
                    return false;
                };
                var /** @type {?} */ moves = function (el, source, handle, sibling) {
                    var /** @type {?} */ elementComponent = _this.draggableMap.get(el);
                    if (elementComponent) {
                        return elementComponent.moves(source, handle, sibling);
                    }
                    return true;
                };
                return { accepts: accepts, copy: copy, moves: moves, revertOnSpill: true, direction: 'vertical' };
            };
        /**
         * @return {?}
         */
        DrakeStoreService.prototype.registerEvents = /**
         * @return {?}
         */
            function () {
                var _this = this;
                var /** @type {?} */ dragElm;
                var /** @type {?} */ draggedItem;
                this.drake.on('drag', function (el, source) {
                    draggedItem = undefined;
                    dragElm = el;
                    if (!el || !source) {
                        return;
                    }
                    if (_this.draggableMap.has(el)) {
                        var /** @type {?} */ elementComponent = _this.draggableMap.get(el);
                        draggedItem = elementComponent.model;
                        elementComponent.drag.emit({
                            type: 'drag',
                            el: el,
                            source: source,
                            value: draggedItem
                        });
                    }
                    if (_this.droppableMap.has(source)) {
                        var /** @type {?} */ sourceComponent = _this.droppableMap.get(source);
                        _this.dragulaOptions.removeOnSpill = sourceComponent.removeOnSpill;
                        sourceComponent.drag.emit({
                            type: 'drag',
                            el: el,
                            source: source,
                            sourceComponent: sourceComponent,
                            value: draggedItem
                        });
                    }
                });
                this.drake.on('drop', function (el, target, source) {
                    var /** @type {?} */ targetComponent = _this.droppableMap.get(target);
                    if (!targetComponent) {
                        // not a target, abort
                        return;
                    }
                    var /** @type {?} */ dropElmModel = draggedItem;
                    var /** @type {?} */ dropIndex = Array.prototype.indexOf.call(target.children, el);
                    if (dropIndex < 0) {
                        // dropIndex is bad... cancel
                        // dropIndex is bad... cancel
                        _this.drake.cancel(true);
                        return;
                    }
                    var /** @type {?} */ sourceComponent = _this.droppableMap.get(source);
                    if (sourceComponent) {
                        var /** @type {?} */ sourceModel = sourceComponent.model;
                        var /** @type {?} */ targetModel = targetComponent.model;
                        var /** @type {?} */ hasDragModel = !!(sourceModel && draggedItem);
                        var /** @type {?} */ dragIndex = hasDragModel ? sourceModel.indexOf(draggedItem) : -1;
                        if (hasDragModel && dragIndex < 0) {
                            // dragIndex is bad... cancel
                            // dragIndex is bad... cancel
                            _this.drake.cancel(true);
                            return;
                        }
                        if (targetModel) {
                            var /** @type {?} */ reorder = dragIndex > -1 && sourceModel && target === source;
                            var /** @type {?} */ copy = !sourceModel || dragElm !== el;
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
                                        // add element back, let angular remove it
                                        _this.drake.cancel(true);
                                    }
                                    sourceModel.splice(dragIndex, 1);
                                }
                                targetModel.splice(dropIndex, 0, dropElmModel);
                            }
                        }
                    }
                    targetComponent.drop.emit({
                        type: 'drop',
                        el: el,
                        source: source,
                        value: dropElmModel,
                        dropIndex: dropIndex
                    });
                });
                this.drake.on('remove', function (el, container, source) {
                    if (_this.droppableMap.has(source)) {
                        var /** @type {?} */ sourceComponent = _this.droppableMap.get(source);
                        var /** @type {?} */ sourceModel = sourceComponent.model;
                        var /** @type {?} */ dragIndex = draggedItem && sourceModel ? sourceModel.indexOf(draggedItem) : -1;
                        if (dragIndex > -1) {
                            if (el.parentNode !== source) {
                                // add element back, let angular remove it
                                source.appendChild(el);
                            }
                            sourceModel.splice(dragIndex, 1);
                        }
                        sourceComponent.remove.emit({
                            type: 'remove',
                            el: el,
                            container: container,
                            source: source,
                            value: draggedItem
                        });
                    }
                });
                this.drake.on('cancel', function (el, container, source) {
                    if (_this.droppableMap.has(container)) {
                        var /** @type {?} */ containerComponent = _this.droppableMap.get(container);
                        containerComponent.cancel.emit({
                            type: 'cancel',
                            el: el,
                            container: container,
                            source: source,
                            value: draggedItem
                        });
                    }
                });
                this.drake.on('over', function (el, container, source) {
                    if (_this.droppableMap.has(container)) {
                        var /** @type {?} */ containerComponent = _this.droppableMap.get(container);
                        containerComponent.over.emit({
                            type: 'over',
                            el: el,
                            container: container,
                            source: source,
                            value: draggedItem
                        });
                    }
                });
                this.drake.on('out', function (el, container, source) {
                    if (_this.droppableMap.has(container)) {
                        var /** @type {?} */ containerComponent = _this.droppableMap.get(container);
                        containerComponent.out.emit({
                            type: 'out',
                            el: el,
                            container: container,
                            source: source,
                            value: draggedItem
                        });
                    }
                });
            };
        DrakeStoreService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        DrakeStoreService.ctorParameters = function () { return []; };
        return DrakeStoreService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ i = 10000;
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
    var DroppableDirective = (function () {
        function DroppableDirective(el, renderer, drakesService) {
            this.el = el;
            this.renderer = renderer;
            this.drakesService = drakesService;
            this.copy = false;
            this.removeOnSpill = false;
            this.drop = new core.EventEmitter();
            this.drag = new core.EventEmitter();
            this.over = new core.EventEmitter();
            this.out = new core.EventEmitter();
            this.remove = new core.EventEmitter();
            this.cancel = new core.EventEmitter();
        }
        Object.defineProperty(DroppableDirective.prototype, "container", {
            get: /**
             * @return {?}
             */ function () {
                return this.el.nativeElement;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DroppableDirective.prototype, "dropZone", {
            get: /**
             * @return {?}
             */ function () {
                return this._dropZone || this.ngxDroppable || this.defaultZone;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._dropZone = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        DroppableDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.defaultZone = "@@DefaultDropZone-" + getNextId() + "@@";
                this.drakesService.register(this);
            };
        /**
         * @return {?}
         */
        DroppableDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.over.subscribe(function () {
                    _this.renderer.addClass(_this.container, 'gu-over');
                });
                this.out.subscribe(function () {
                    _this.renderer.removeClass(_this.container, 'gu-over');
                });
            };
        /**
         * @return {?}
         */
        DroppableDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.drakesService.remove(this);
            };
        DroppableDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[ngxDroppable]' },] },
        ];
        /** @nocollapse */
        DroppableDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef, },
                { type: core.Renderer2, },
                { type: DrakeStoreService, },
            ];
        };
        DroppableDirective.propDecorators = {
            "model": [{ type: core.Input },],
            "copy": [{ type: core.Input },],
            "removeOnSpill": [{ type: core.Input },],
            "ngxDroppable": [{ type: core.Input },],
            "drop": [{ type: core.Output },],
            "drag": [{ type: core.Output },],
            "over": [{ type: core.Output },],
            "out": [{ type: core.Output },],
            "remove": [{ type: core.Output },],
            "cancel": [{ type: core.Output },],
            "dropZone": [{ type: core.Input },],
        };
        return DroppableDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Adds properties and events to draggable elements
     *
     * @export
     */
    var DraggableDirective = (function () {
        function DraggableDirective(el, drakesService, droppableDirective) {
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
            this.drag = new core.EventEmitter();
            this.dragDelay = 200;
            this.dragDelayed = true;
        }
        Object.defineProperty(DraggableDirective.prototype, "dropZones", {
            get: /**
             * @return {?}
             */ function () {
                return this._dropZones || this.ngxDraggable || this._parentDropzones;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._dropZones = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DraggableDirective.prototype, "hasHandle", {
            get: /**
             * @return {?}
             */ function () {
                return !!this.handles.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DraggableDirective.prototype, "element", {
            get: /**
             * @return {?}
             */ function () {
                return this.el.nativeElement;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} e
         * @return {?}
         */
        DraggableDirective.prototype.onMove = /**
         * @param {?} e
         * @return {?}
         */
            function (e) {
                if (!this._moves || this.dragDelayed) {
                    e.stopPropagation();
                    clearTimeout(this.touchTimeout);
                }
            };
        /**
         * @return {?}
         */
        DraggableDirective.prototype.onDown = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this._moves) {
                    this.touchTimeout = setTimeout(function () {
                        _this.dragDelayed = false;
                    }, this.dragDelay);
                }
            };
        /**
         * @return {?}
         */
        DraggableDirective.prototype.onUp = /**
         * @return {?}
         */
            function () {
                if (this._moves) {
                    clearTimeout(/** @type {?} */ (this.touchTimeout));
                    this.dragDelayed = true;
                }
            };
        /**
         * @return {?}
         */
        DraggableDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.update();
            };
        /**
         * @return {?}
         */
        DraggableDirective.prototype.update = /**
         * @return {?}
         */
            function () {
                this._parentDropzones = [this.droppableDirective.dropZone];
                this.drakesService.registerDraggable(this);
                this.updateElements();
            };
        /**
         * @return {?}
         */
        DraggableDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.drakesService.removeDraggable(this);
            };
        /**
         * @return {?}
         */
        DraggableDirective.prototype.updateElements = /**
         * @return {?}
         */
            function () {
                var /** @type {?} */ nativeElement = this.el.nativeElement;
                var /** @type {?} */ handles = nativeElement.querySelectorAll('[ngxdraghandle]');
                this.handles = Array.from(handles).filter(function (h) { return findFirstDraggableParent(h) === nativeElement; });
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
            };
        /**
         * @param {?=} source
         * @param {?=} handle
         * @param {?=} sibling
         * @return {?}
         */
        DraggableDirective.prototype.canMove = /**
         * @param {?=} source
         * @param {?=} handle
         * @param {?=} sibling
         * @return {?}
         */
            function (source, handle, sibling) {
                if (typeof this._moves === 'boolean')
                    return this._moves;
                if (typeof this._moves === 'function')
                    return this._moves(this.model, source, handle, sibling);
                return true;
            };
        /**
         * @param {?} source
         * @param {?} handle
         * @param {?} sibling
         * @return {?}
         */
        DraggableDirective.prototype.moves = /**
         * @param {?} source
         * @param {?} handle
         * @param {?} sibling
         * @return {?}
         */
            function (source, handle, sibling) {
                if (!this.canMove(source, handle, sibling))
                    return false;
                return this.hasHandle ? this.handles.some(function (h) { return handelFor(handle, h); }) : true;
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
            };
        /**
         * @return {?}
         */
        DraggableDirective.prototype.ngDoCheck = /**
         * @return {?}
         */
            function () {
                this.updateElements();
            };
        DraggableDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[ngxDraggable]' },] },
        ];
        /** @nocollapse */
        DraggableDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef, },
                { type: DrakeStoreService, },
                { type: DroppableDirective, },
            ];
        };
        DraggableDirective.propDecorators = {
            "ngxDraggable": [{ type: core.Input },],
            "model": [{ type: core.Input },],
            "dropZones": [{ type: core.Input },],
            "_moves": [{ type: core.Input, args: ['moves',] },],
            "drag": [{ type: core.Output },],
            "onMove": [{ type: core.HostListener, args: ['touchmove', ['$event'],] },],
            "onDown": [{ type: core.HostListener, args: ['touchstart',] },],
            "onUp": [{ type: core.HostListener, args: ['touchend',] },],
        };
        return DraggableDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Adds properties and events to drag handle elements
     *
     * @export
     */
    var DragHandleDirective = (function () {
        function DragHandleDirective() {
        }
        DragHandleDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[ngxDragHandle]' },] },
        ];
        return DragHandleDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ i$1 = 0;
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
    var ContainerComponent = (function () {
        function ContainerComponent() {
            this.copy = false;
            this.removeOnSpill = false;
            this.dropZone = "@@DefaultDropZone-" + getNextId$1() + "@@";
            this.drop = new core.EventEmitter();
            this.drag = new core.EventEmitter();
            this.over = new core.EventEmitter();
            this.out = new core.EventEmitter();
            this.remove = new core.EventEmitter();
            this.cancel = new core.EventEmitter();
        }
        Object.defineProperty(ContainerComponent.prototype, "dropZones", {
            get: /**
             * @return {?}
             */ function () {
                return this._dropZones || this._defaultZones;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._dropZones = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        ContainerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this._defaultZones = [this.dropZone];
            };
        /**
         * @return {?}
         */
        ContainerComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.droppable.drag.subscribe(function (v) { return _this.drag.emit(v); });
                this.droppable.drop.subscribe(function (v) { return _this.drop.emit(v); });
                this.droppable.over.subscribe(function (v) { return _this.over.emit(v); });
                this.droppable.out.subscribe(function (v) { return _this.out.emit(v); });
                this.droppable.remove.subscribe(function (v) { return _this.remove.emit(v); });
                this.droppable.cancel.subscribe(function (v) { return _this.cancel.emit(v); });
            };
        ContainerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-dnd-container',
                        template: "<div\n  ngxDroppable\n  [dropZone]=\"dropZone\"\n  [model]=\"model\"\n  [copy]=\"copy\"\n  [ngClass]=\"{ 'gu-empty': !model?.length }\"\n  [removeOnSpill]=\"removeOnSpill\"\n  class='ngx-dnd-container'>\n  <ng-container *ngIf=\"model\">\n    <ng-container *ngFor=\"let item of model\">\n      <ngx-dnd-item\n        ngxDraggable\n        [model]=\"item\"\n        [dropZone]=\"dropZone\"\n        [dropZones]=\"dropZones\"\n        [copy]=\"copy\"\n        [moves]=\"moves\"\n        [removeOnSpill]=\"removeOnSpill\"\n        [droppableItemClass]=\"droppableItemClass\">\n      </ngx-dnd-item>\n    </ng-container>\n  </ng-container>\n  <ng-content *ngIf=\"!model\"></ng-content>\n</div>\n",
                        styles: [".ngx-dnd-container{background-color:rgba(255,255,255,.2);border:2px solid red;margin:10px;padding:10px}.ngx-dnd-container.gu-empty{border:2px dotted red}.ngx-dnd-container:nth-child(odd){background-color:rgba(0,0,0,.2)}.ngx-dnd-container .ex-moved{background-color:#e74c3c}.ngx-dnd-container .ex-over{background-color:rgba(255,255,255,.3)}.ngx-dnd-container .handle{padding:0 5px;margin-right:5px;background-color:rgba(0,0,0,.4);cursor:move}.no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"],
                        encapsulation: core.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        ContainerComponent.propDecorators = {
            "model": [{ type: core.Input },],
            "copy": [{ type: core.Input },],
            "removeOnSpill": [{ type: core.Input },],
            "droppableItemClass": [{ type: core.Input },],
            "dropZone": [{ type: core.Input },],
            "dropZones": [{ type: core.Input },],
            "moves": [{ type: core.Input },],
            "template": [{ type: core.Input }, { type: core.ContentChild, args: [core.TemplateRef,] },],
            "droppable": [{ type: core.Input }, { type: core.ViewChild, args: [DroppableDirective,] },],
            "drop": [{ type: core.Output },],
            "drag": [{ type: core.Output },],
            "over": [{ type: core.Output },],
            "out": [{ type: core.Output },],
            "remove": [{ type: core.Output },],
            "cancel": [{ type: core.Output },],
        };
        return ContainerComponent;
    }());

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
    var ItemComponent = (function () {
        function ItemComponent(container, draggableDirective) {
            this.container = container;
            this.draggableDirective = draggableDirective;
            this._copy = false;
            this._removeOnSpill = false;
        }
        Object.defineProperty(ItemComponent.prototype, "dropZone", {
            get: /**
             * @return {?}
             */ function () {
                return this._dropZone || this.container.dropZone;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._dropZone = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemComponent.prototype, "dropZones", {
            get: /**
             * @return {?}
             */ function () {
                return this._dropZones || this.container.dropZones;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._dropZones = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemComponent.prototype, "droppableItemClass", {
            get: /**
             * @return {?}
             */ function () {
                return this._droppableItemClass || this.container.droppableItemClass;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._droppableItemClass = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemComponent.prototype, "removeOnSpill", {
            get: /**
             * @return {?}
             */ function () {
                return typeof this._removeOnSpill === 'boolean' ? this._removeOnSpill : this.container.removeOnSpill;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._removeOnSpill = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemComponent.prototype, "copy", {
            get: /**
             * @return {?}
             */ function () {
                return typeof this._copy === 'boolean' ? this._copy : this.container.copy;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._copy = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemComponent.prototype, "hasHandle", {
            get: /**
             * @return {?}
             */ function () {
                return this.draggableDirective.hasHandle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemComponent.prototype, "moveDisabled", {
            get: /**
             * @return {?}
             */ function () {
                return !this.draggableDirective.canMove();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemComponent.prototype, "classString", {
            get: /**
             * @return {?}
             */ function () {
                var /** @type {?} */ itemClass = typeof this.droppableItemClass === 'function' ? this.droppableItemClass(this.model) : this.droppableItemClass;
                var /** @type {?} */ classes = ['ngx-dnd-item', itemClass || ''];
                if (this.moveDisabled) {
                    classes.push('move-disabled');
                }
                if (this.hasHandle) {
                    classes.push('has-handle');
                }
                return classes.join(' ');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemComponent.prototype, "type", {
            get: /**
             * @return {?}
             */ function () {
                if (Array.isArray(this.model)) {
                    return 'array';
                }
                return typeof this.model;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        ItemComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.data = {
                    model: this.model,
                    type: this.type,
                    dropZone: this.dropZone,
                    template: this.container.template
                };
            };
        ItemComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-dnd-item',
                        template: "<ng-container [ngSwitch]=\"type\">\n\n  <ng-container *ngSwitchCase=\"'array'\">\n    <ngx-dnd-container\n      [model]=\"model\"\n      [template]=\"container.template\"\n      [dropZone]=\"dropZone\"\n      [dropZones]=\"dropZones\"\n      [removeOnSpill]=\"removeOnSpill\"\n      [droppableItemClass]=\"droppableItemClass\"\n      [copy]=\"copy\">\n    </ngx-dnd-container>\n  </ng-container>\n\n  <ng-container *ngSwitchCase=\"'object'\">\n    <ng-template\n      *ngIf=\"container.template\"\n      [ngTemplateOutlet]=\"container.template\"\n      [ngTemplateOutletContext]=\"data\">\n    </ng-template>\n    <ng-container *ngIf=\"!container.template\">\n      <div\n        class=\"ngx-dnd-content\">\n        {{model.label}}\n      </div>\n      <ngx-dnd-container\n        *ngIf=\"model.children\"\n        [model]=\"model.children\"\n        [template]=\"container.template\"\n        [dropZone]=\"dropZone\"\n        [dropZones]=\"dropZones\"\n        [removeOnSpill]=\"removeOnSpill\"\n        [droppableItemClass]=\"droppableItemClass\"\n        [copy]=\"copy\">\n      </ngx-dnd-container>\n    </ng-container>\n  </ng-container>\n\n  <ng-container *ngSwitchCase=\"'undefined'\">\n  </ng-container>\n\n  <ng-container *ngSwitchDefault>\n    <ng-template\n      *ngIf=\"container.template\"\n      [ngTemplateOutlet]=\"container.template\"\n      [ngTemplateOutletContext]=\"data\">\n    </ng-template>\n    <div\n      *ngIf=\"!container.template\"\n      class=\"ngx-dnd-content\">\n      {{model}}\n    </div>\n  </ng-container>\n\n</ng-container>\n\n\n\n\n\n\n\n",
                        styles: [".ngx-dnd-item{margin:10px;padding:10px;background-color:rgba(0,0,0,.2);transition:opacity .4s ease-in-out;border:1px solid #add8e6;display:block}.ngx-dnd-item.has-handle [ngxDragHandle],.ngx-dnd-item.has-handle [ngxdraghandle],.ngx-dnd-item:not(.has-handle):not(.move-disabled){cursor:move;cursor:grab;cursor:-webkit-grab}.ngx-dnd-item .ngx-dnd-content{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ngx-dnd-item:hover{border:1px solid #00f}.gu-mirror{position:fixed!important;margin:0!important;z-index:9999!important;opacity:.8}.gu-hide{display:none!important}.gu-unselectable{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.gu-transit{opacity:.2}"],
                        encapsulation: core.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        ItemComponent.ctorParameters = function () {
            return [
                { type: ContainerComponent, },
                { type: DraggableDirective, },
            ];
        };
        ItemComponent.propDecorators = {
            "model": [{ type: core.Input },],
            "dropZone": [{ type: core.Input },],
            "dropZones": [{ type: core.Input },],
            "droppableItemClass": [{ type: core.Input },],
            "removeOnSpill": [{ type: core.Input },],
            "copy": [{ type: core.Input },],
            "classString": [{ type: core.HostBinding, args: ['class',] },],
        };
        return ItemComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ components = [ContainerComponent, ItemComponent];
    var /** @type {?} */ directives = [DraggableDirective, DroppableDirective, DragHandleDirective];
    var NgxDnDModule = (function () {
        function NgxDnDModule() {
        }
        NgxDnDModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: tslib_1.__spread(components, directives),
                        exports: tslib_1.__spread(components, directives),
                        providers: [DrakeStoreService]
                    },] },
        ];
        return NgxDnDModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.DraggableDirective = DraggableDirective;
    exports.DroppableDirective = DroppableDirective;
    exports.DragHandleDirective = DragHandleDirective;
    exports.ItemComponent = ItemComponent;
    exports.ContainerComponent = ContainerComponent;
    exports.DrakeStoreService = DrakeStoreService;
    exports.NgxDnDModule = NgxDnDModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpbWxhbmUtbmd4LWRuZC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bzd2ltbGFuZS9uZ3gtZG5kL2xpYi9zZXJ2aWNlcy9kcmFrZS1zdG9yZS5zZXJ2aWNlLnRzIiwibmc6Ly9Ac3dpbWxhbmUvbmd4LWRuZC9saWIvZGlyZWN0aXZlcy9uZ3gtZHJvcHBhYmxlLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHN3aW1sYW5lL25neC1kbmQvbGliL2RpcmVjdGl2ZXMvbmd4LWRyYWdnYWJsZS5kaXJlY3RpdmUudHMiLCJuZzovL0Bzd2ltbGFuZS9uZ3gtZG5kL2xpYi9kaXJlY3RpdmVzL25neC1kcmFnLWhhbmRsZS5kaXJlY3RpdmUudHMiLCJuZzovL0Bzd2ltbGFuZS9uZ3gtZG5kL2xpYi9jb21wb25lbnRzL2NvbnRhaW5lci9jb250YWluZXIuY29tcG9uZW50LnRzIiwibmc6Ly9Ac3dpbWxhbmUvbmd4LWRuZC9saWIvY29tcG9uZW50cy9pdGVtL2l0ZW0uY29tcG9uZW50LnRzIiwibmc6Ly9Ac3dpbWxhbmUvbmd4LWRuZC9saWIvbmd4LWRuZC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBkcmFndWxhTmFtZXNwYWNlIGZyb20gJ0Bzd2ltbGFuZS9kcmFndWxhJztcbmltcG9ydCB7IERyb3BwYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4uL2RpcmVjdGl2ZXMvbmd4LWRyb3BwYWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9uZ3gtZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5cbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZGhlcmdlcy9uZy1wYWNrYWdyL2lzc3Vlcy8yMTdcbmNvbnN0IGRyYWd1bGEgPSBkcmFndWxhTmFtZXNwYWNlO1xuXG4vKipcbiAqIENlbnRyYWwgc2VydmljZSB0aGF0IGhhbmRsZXMgYWxsIGV2ZW50c1xuICpcbiAqIEBleHBvcnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERyYWtlU3RvcmVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBkcm9wcGFibGVNYXAgPSBuZXcgV2Vha01hcDxhbnksIERyb3BwYWJsZURpcmVjdGl2ZT4oKTtcbiAgcHJpdmF0ZSBkcmFnZ2FibGVNYXAgPSBuZXcgV2Vha01hcDxhbnksIERyYWdnYWJsZURpcmVjdGl2ZT4oKTtcbiAgcHJpdmF0ZSBkcmFndWxhT3B0aW9uczogZHJhZ3VsYU5hbWVzcGFjZS5EcmFndWxhT3B0aW9ucztcbiAgcHJpdmF0ZSBkcmFrZTogZHJhZ3VsYU5hbWVzcGFjZS5EcmFrZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRyYWd1bGFPcHRpb25zID0gdGhpcy5jcmVhdGVEcmFrZU9wdGlvbnMoKTtcbiAgICB0aGlzLmRyYWtlID0gZHJhZ3VsYShbXSwgdGhpcy5kcmFndWxhT3B0aW9ucyk7XG4gICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xuICB9XG5cbiAgcmVnaXN0ZXIoZHJvcHBhYmxlOiBEcm9wcGFibGVEaXJlY3RpdmUpIHtcbiAgICB0aGlzLmRyb3BwYWJsZU1hcC5zZXQoZHJvcHBhYmxlLmNvbnRhaW5lciwgZHJvcHBhYmxlKTtcbiAgICB0aGlzLmRyYWtlLmNvbnRhaW5lcnMucHVzaChkcm9wcGFibGUuY29udGFpbmVyKTtcbiAgfVxuXG4gIHJlbW92ZShkcm9wcGFibGU6IERyb3BwYWJsZURpcmVjdGl2ZSkge1xuICAgIHRoaXMuZHJvcHBhYmxlTWFwLmRlbGV0ZShkcm9wcGFibGUuY29udGFpbmVyKTtcbiAgICBjb25zdCBpZHggPSB0aGlzLmRyYWtlLmNvbnRhaW5lcnMuaW5kZXhPZihkcm9wcGFibGUuY29udGFpbmVyKTtcbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIHRoaXMuZHJha2UuY29udGFpbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3RlckRyYWdnYWJsZShkcmFnZ2FibGU6IERyYWdnYWJsZURpcmVjdGl2ZSkge1xuICAgIHRoaXMuZHJhZ2dhYmxlTWFwLnNldChkcmFnZ2FibGUuZWxlbWVudCwgZHJhZ2dhYmxlKTtcbiAgfVxuXG4gIHJlbW92ZURyYWdnYWJsZShkcmFnZ2FibGU6IERyYWdnYWJsZURpcmVjdGl2ZSkge1xuICAgIHRoaXMuZHJhZ2dhYmxlTWFwLmRlbGV0ZShkcmFnZ2FibGUuZWxlbWVudCk7XG4gIH1cblxuICBjcmVhdGVEcmFrZU9wdGlvbnMoKTogZHJhZ3VsYU5hbWVzcGFjZS5EcmFndWxhT3B0aW9ucyB7XG4gICAgY29uc3QgYWNjZXB0cyA9IChlbDogYW55LCB0YXJnZXQ6IGFueSAvKiwgc291cmNlOiBhbnksIHNpYmxpbmc6IGFueSAqLykgPT4ge1xuICAgICAgaWYgKGVsLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY29uc3QgZWxlbWVudENvbXBvbmVudCA9IHRoaXMuZHJhZ2dhYmxlTWFwLmdldChlbCk7XG4gICAgICBjb25zdCB0YXJnZXRDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQodGFyZ2V0KTtcbiAgICAgIGlmIChlbGVtZW50Q29tcG9uZW50ICYmIHRhcmdldENvbXBvbmVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudENvbXBvbmVudC5kcm9wWm9uZXMuaW5jbHVkZXModGFyZ2V0Q29tcG9uZW50LmRyb3Bab25lKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBjb25zdCBjb3B5ID0gKF86IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHNvdXJjZUNvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldChzb3VyY2UpO1xuICAgICAgaWYgKHNvdXJjZUNvbXBvbmVudCkge1xuICAgICAgICByZXR1cm4gc291cmNlQ29tcG9uZW50LmNvcHk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIGNvbnN0IG1vdmVzID0gKGVsPzogYW55LCBzb3VyY2U/OiBhbnksIGhhbmRsZT86IGFueSwgc2libGluZz86IGFueSkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudENvbXBvbmVudCA9IHRoaXMuZHJhZ2dhYmxlTWFwLmdldChlbCk7XG4gICAgICBpZiAoZWxlbWVudENvbXBvbmVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudENvbXBvbmVudC5tb3Zlcyhzb3VyY2UsIGhhbmRsZSwgc2libGluZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgYWNjZXB0cywgY29weSwgbW92ZXMsIHJldmVydE9uU3BpbGw6IHRydWUsIGRpcmVjdGlvbjogJ3ZlcnRpY2FsJyB9O1xuICB9XG5cbiAgcmVnaXN0ZXJFdmVudHMoKTogdm9pZCB7XG4gICAgbGV0IGRyYWdFbG06IGFueTtcbiAgICBsZXQgZHJhZ2dlZEl0ZW06IGFueTtcblxuICAgIHRoaXMuZHJha2Uub24oJ2RyYWcnLCAoZWw6IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGRyYWdnZWRJdGVtID0gdW5kZWZpbmVkO1xuICAgICAgZHJhZ0VsbSA9IGVsO1xuXG4gICAgICBpZiAoIWVsIHx8ICFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kcmFnZ2FibGVNYXAuaGFzKGVsKSkge1xuICAgICAgICBjb25zdCBlbGVtZW50Q29tcG9uZW50ID0gdGhpcy5kcmFnZ2FibGVNYXAuZ2V0KGVsKTtcbiAgICAgICAgZHJhZ2dlZEl0ZW0gPSBlbGVtZW50Q29tcG9uZW50Lm1vZGVsO1xuXG4gICAgICAgIGVsZW1lbnRDb21wb25lbnQuZHJhZy5lbWl0KHtcbiAgICAgICAgICB0eXBlOiAnZHJhZycsXG4gICAgICAgICAgZWwsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHZhbHVlOiBkcmFnZ2VkSXRlbVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTWFwLmhhcyhzb3VyY2UpKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZUNvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldChzb3VyY2UpO1xuICAgICAgICB0aGlzLmRyYWd1bGFPcHRpb25zLnJlbW92ZU9uU3BpbGwgPSBzb3VyY2VDb21wb25lbnQucmVtb3ZlT25TcGlsbDtcblxuICAgICAgICBzb3VyY2VDb21wb25lbnQuZHJhZy5lbWl0KHtcbiAgICAgICAgICB0eXBlOiAnZHJhZycsXG4gICAgICAgICAgZWwsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHNvdXJjZUNvbXBvbmVudCxcbiAgICAgICAgICB2YWx1ZTogZHJhZ2dlZEl0ZW1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmRyYWtlLm9uKCdkcm9wJywgKGVsOiBhbnksIHRhcmdldDogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0Q29tcG9uZW50ID0gdGhpcy5kcm9wcGFibGVNYXAuZ2V0KHRhcmdldCk7XG5cbiAgICAgIGlmICghdGFyZ2V0Q29tcG9uZW50KSB7XG4gICAgICAgIC8vIG5vdCBhIHRhcmdldCwgYWJvcnRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgZHJvcEVsbU1vZGVsID0gZHJhZ2dlZEl0ZW07XG4gICAgICBjb25zdCBkcm9wSW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHRhcmdldC5jaGlsZHJlbiwgZWwpO1xuXG4gICAgICBpZiAoZHJvcEluZGV4IDwgMCkge1xuICAgICAgICAvLyBkcm9wSW5kZXggaXMgYmFkLi4uIGNhbmNlbFxuICAgICAgICB0aGlzLmRyYWtlLmNhbmNlbCh0cnVlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3VyY2VDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQoc291cmNlKTtcblxuICAgICAgaWYgKHNvdXJjZUNvbXBvbmVudCkge1xuICAgICAgICBjb25zdCBzb3VyY2VNb2RlbCA9IHNvdXJjZUNvbXBvbmVudC5tb2RlbDtcbiAgICAgICAgY29uc3QgdGFyZ2V0TW9kZWwgPSB0YXJnZXRDb21wb25lbnQubW9kZWw7XG5cbiAgICAgICAgY29uc3QgaGFzRHJhZ01vZGVsID0gISEoc291cmNlTW9kZWwgJiYgZHJhZ2dlZEl0ZW0pO1xuICAgICAgICBjb25zdCBkcmFnSW5kZXggPSBoYXNEcmFnTW9kZWwgPyBzb3VyY2VNb2RlbC5pbmRleE9mKGRyYWdnZWRJdGVtKSA6IC0xO1xuICAgICAgICBpZiAoaGFzRHJhZ01vZGVsICYmIGRyYWdJbmRleCA8IDApIHtcbiAgICAgICAgICAvLyBkcmFnSW5kZXggaXMgYmFkLi4uIGNhbmNlbFxuICAgICAgICAgIHRoaXMuZHJha2UuY2FuY2VsKHRydWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXJnZXRNb2RlbCkge1xuICAgICAgICAgIGNvbnN0IHJlb3JkZXIgPSBkcmFnSW5kZXggPiAtMSAmJiBzb3VyY2VNb2RlbCAmJiB0YXJnZXQgPT09IHNvdXJjZTtcbiAgICAgICAgICBjb25zdCBjb3B5ID0gIXNvdXJjZU1vZGVsIHx8IGRyYWdFbG0gIT09IGVsO1xuICAgICAgICAgIGlmIChyZW9yZGVyKSB7XG4gICAgICAgICAgICBzb3VyY2VNb2RlbC5zcGxpY2UoZHJvcEluZGV4LCAwLCBzb3VyY2VNb2RlbC5zcGxpY2UoZHJhZ0luZGV4LCAxKVswXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChlbC5wYXJlbnROb2RlID09PSB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvcHkpIHtcbiAgICAgICAgICAgICAgZHJvcEVsbU1vZGVsID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkcm9wRWxtTW9kZWwpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChlbC5wYXJlbnROb2RlICE9PSBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgZWxlbWVudCBiYWNrLCBsZXQgYW5ndWxhciByZW1vdmUgaXRcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWtlLmNhbmNlbCh0cnVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzb3VyY2VNb2RlbC5zcGxpY2UoZHJhZ0luZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldE1vZGVsLnNwbGljZShkcm9wSW5kZXgsIDAsIGRyb3BFbG1Nb2RlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRhcmdldENvbXBvbmVudC5kcm9wLmVtaXQoe1xuICAgICAgICB0eXBlOiAnZHJvcCcsXG4gICAgICAgIGVsLFxuICAgICAgICBzb3VyY2UsXG4gICAgICAgIHZhbHVlOiBkcm9wRWxtTW9kZWwsXG4gICAgICAgIGRyb3BJbmRleFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRyYWtlLm9uKCdyZW1vdmUnLCAoZWw6IGFueSwgY29udGFpbmVyOiBhbnksIHNvdXJjZTogYW55KSA9PiB7XG4gICAgICBpZiAodGhpcy5kcm9wcGFibGVNYXAuaGFzKHNvdXJjZSkpIHtcbiAgICAgICAgY29uc3Qgc291cmNlQ29tcG9uZW50ID0gdGhpcy5kcm9wcGFibGVNYXAuZ2V0KHNvdXJjZSk7XG4gICAgICAgIGNvbnN0IHNvdXJjZU1vZGVsID0gc291cmNlQ29tcG9uZW50Lm1vZGVsO1xuXG4gICAgICAgIGNvbnN0IGRyYWdJbmRleCA9IGRyYWdnZWRJdGVtICYmIHNvdXJjZU1vZGVsID8gc291cmNlTW9kZWwuaW5kZXhPZihkcmFnZ2VkSXRlbSkgOiAtMTtcblxuICAgICAgICBpZiAoZHJhZ0luZGV4ID4gLTEpIHtcbiAgICAgICAgICBpZiAoZWwucGFyZW50Tm9kZSAhPT0gc291cmNlKSB7XG4gICAgICAgICAgICAvLyBhZGQgZWxlbWVudCBiYWNrLCBsZXQgYW5ndWxhciByZW1vdmUgaXRcbiAgICAgICAgICAgIHNvdXJjZS5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgc291cmNlQ29tcG9uZW50LnJlbW92ZS5lbWl0KHtcbiAgICAgICAgICB0eXBlOiAncmVtb3ZlJyxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHZhbHVlOiBkcmFnZ2VkSXRlbVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZHJha2Uub24oJ2NhbmNlbCcsIChlbDogYW55LCBjb250YWluZXI6IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU1hcC5oYXMoY29udGFpbmVyKSkge1xuICAgICAgICBjb25zdCBjb250YWluZXJDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQoY29udGFpbmVyKTtcbiAgICAgICAgY29udGFpbmVyQ29tcG9uZW50LmNhbmNlbC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiAnY2FuY2VsJyxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHZhbHVlOiBkcmFnZ2VkSXRlbVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZHJha2Uub24oJ292ZXInLCAoZWw6IGFueSwgY29udGFpbmVyOiBhbnksIHNvdXJjZTogYW55KSA9PiB7XG4gICAgICBpZiAodGhpcy5kcm9wcGFibGVNYXAuaGFzKGNvbnRhaW5lcikpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyQ29tcG9uZW50ID0gdGhpcy5kcm9wcGFibGVNYXAuZ2V0KGNvbnRhaW5lcik7XG4gICAgICAgIGNvbnRhaW5lckNvbXBvbmVudC5vdmVyLmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdvdmVyJyxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHZhbHVlOiBkcmFnZ2VkSXRlbVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZHJha2Uub24oJ291dCcsIChlbDogYW55LCBjb250YWluZXI6IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU1hcC5oYXMoY29udGFpbmVyKSkge1xuICAgICAgICBjb25zdCBjb250YWluZXJDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQoY29udGFpbmVyKTtcbiAgICAgICAgY29udGFpbmVyQ29tcG9uZW50Lm91dC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiAnb3V0JyxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHZhbHVlOiBkcmFnZ2VkSXRlbVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERyYWtlU3RvcmVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZHJha2Utc3RvcmUuc2VydmljZSc7XG5cbmxldCBpID0gMTAwMDA7XG5mdW5jdGlvbiBnZXROZXh0SWQoKSB7XG4gIHJldHVybiBpKys7XG59XG5cbi8qKlxuICogTWFrZXMgdGhlIGNvbnRhaW5lciBkcm9wcGFibGUgYW5kIGNoaWxkcmVuIGRyYWdnYWJsZS5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ3hEcm9wcGFibGVdJyB9KVxuZXhwb3J0IGNsYXNzIERyb3BwYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgbW9kZWw6IGFueTtcbiAgQElucHV0KCkgY29weSA9IGZhbHNlO1xuICBASW5wdXQoKSByZW1vdmVPblNwaWxsID0gZmFsc2U7XG4gIEBJbnB1dCgpIG5neERyb3BwYWJsZTogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBkcm9wOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBkcmFnOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvdmVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvdXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgY2FuY2VsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGdldCBjb250YWluZXIoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IGRyb3Bab25lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2Ryb3Bab25lIHx8IHRoaXMubmd4RHJvcHBhYmxlIHx8IHRoaXMuZGVmYXVsdFpvbmU7XG4gIH1cbiAgc2V0IGRyb3Bab25lKHZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5fZHJvcFpvbmUgPSB2YWw7XG4gIH1cblxuICBkZWZhdWx0Wm9uZTogc3RyaW5nO1xuICBfZHJvcFpvbmU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZHJha2VzU2VydmljZTogRHJha2VTdG9yZVNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kZWZhdWx0Wm9uZSA9IGBAQERlZmF1bHREcm9wWm9uZS0ke2dldE5leHRJZCgpfUBAYDtcbiAgICB0aGlzLmRyYWtlc1NlcnZpY2UucmVnaXN0ZXIodGhpcyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5vdmVyLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyLCAnZ3Utb3ZlcicpO1xuICAgIH0pO1xuICAgIHRoaXMub3V0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyLCAnZ3Utb3ZlcicpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kcmFrZXNTZXJ2aWNlLnJlbW92ZSh0aGlzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRHJvcHBhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3gtZHJvcHBhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFrZVN0b3JlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2RyYWtlLXN0b3JlLnNlcnZpY2UnO1xuXG4vKipcbiAqIEFkZHMgcHJvcGVydGllcyBhbmQgZXZlbnRzIHRvIGRyYWdnYWJsZSBlbGVtZW50c1xuICpcbiAqIEBleHBvcnRcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25neERyYWdnYWJsZV0nIH0pXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBuZ3hEcmFnZ2FibGU6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBtb2RlbDogYW55O1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkcm9wWm9uZXMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcFpvbmVzIHx8IHRoaXMubmd4RHJhZ2dhYmxlIHx8IHRoaXMuX3BhcmVudERyb3B6b25lcztcbiAgfVxuICBzZXQgZHJvcFpvbmVzKHZhbDogYW55KSB7XG4gICAgdGhpcy5fZHJvcFpvbmVzID0gdmFsO1xuICB9XG5cbiAgQElucHV0KCdtb3ZlcycpIF9tb3ZlczogYm9vbGVhbiB8ICgoLi4uYXJnczogYW55W10pID0+IGFueSkgPSB0cnVlO1xuXG4gIC8qXG4gIENvbnRlbnRDaGlsZHJlbiBkb2Vzbid0IGdldCBjaGlsZHJlbiBjcmVhdGVkIHdpdGggTmdUZW1wbGF0ZU91dGxldFxuICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTQ4NDJcbiAgSW1wbGVtZW50ZWQgdmlhIHVwZGF0ZUVsZW1lbnRzIG1ldGhvZFxuXG4gIEBDb250ZW50Q2hpbGRyZW4oRHJhZ0hhbmRsZURpcmVjdGl2ZSwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcbiAgaGFuZGxlc0xpc3Q6IFF1ZXJ5TGlzdDxEcmFnSGFuZGxlRGlyZWN0aXZlPjsgKi9cblxuICBoYW5kbGVzOiBhbnlbXSA9IFtdO1xuXG4gIGdldCBoYXNIYW5kbGUoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5oYW5kbGVzLmxlbmd0aDtcbiAgfVxuXG4gIEBPdXRwdXQoKSBkcmFnOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGRyYWdEZWxheTogbnVtYmVyID0gMjAwOyAvLyBtaWxsaXNlY29uZHNcbiAgZHJhZ0RlbGF5ZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHRvdWNoVGltZW91dDogYW55O1xuXG4gIGdldCBlbGVtZW50KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIF9kcm9wWm9uZXM6IHN0cmluZ1tdO1xuICBfcGFyZW50RHJvcHpvbmVzOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgZHJha2VzU2VydmljZTogRHJha2VTdG9yZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkcm9wcGFibGVEaXJlY3RpdmU6IERyb3BwYWJsZURpcmVjdGl2ZVxuICApIHt9XG5cbiAgLy8gRnJvbTogaHR0cHM6Ly9naXRodWIuY29tL2JldmFjcXVhL2RyYWd1bGEvaXNzdWVzLzI4OSNpc3N1ZWNvbW1lbnQtMjc3MTQzMTcyXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNobW92ZScsIFsnJGV2ZW50J10pXG4gIG9uTW92ZShlOiBFdmVudCkge1xuICAgIGlmICghdGhpcy5fbW92ZXMgfHwgdGhpcy5kcmFnRGVsYXllZCkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRvdWNoVGltZW91dCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcpXG4gIG9uRG93bigpIHtcbiAgICBpZiAodGhpcy5fbW92ZXMpIHtcbiAgICAgIHRoaXMudG91Y2hUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ0RlbGF5ZWQgPSBmYWxzZTtcbiAgICAgIH0sIHRoaXMuZHJhZ0RlbGF5KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd0b3VjaGVuZCcpXG4gIG9uVXAoKSB7XG4gICAgaWYgKHRoaXMuX21vdmVzKSB7XG4gICAgICBjbGVhclRpbWVvdXQoPG51bWJlcj50aGlzLnRvdWNoVGltZW91dCk7XG4gICAgICB0aGlzLmRyYWdEZWxheWVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX3BhcmVudERyb3B6b25lcyA9IFt0aGlzLmRyb3BwYWJsZURpcmVjdGl2ZS5kcm9wWm9uZV07XG4gICAgdGhpcy5kcmFrZXNTZXJ2aWNlLnJlZ2lzdGVyRHJhZ2dhYmxlKHRoaXMpO1xuICAgIHRoaXMudXBkYXRlRWxlbWVudHMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZHJha2VzU2VydmljZS5yZW1vdmVEcmFnZ2FibGUodGhpcyk7XG4gIH1cblxuICB1cGRhdGVFbGVtZW50cygpOiB2b2lkIHtcbiAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGhhbmRsZXM6IE5vZGVMaXN0ID0gbmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbbmd4ZHJhZ2hhbmRsZV0nKTtcbiAgICB0aGlzLmhhbmRsZXMgPSBBcnJheS5mcm9tKGhhbmRsZXMpLmZpbHRlcigoaDogYW55KSA9PiBmaW5kRmlyc3REcmFnZ2FibGVQYXJlbnQoaCkgPT09IG5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgZnVuY3Rpb24gZmluZEZpcnN0RHJhZ2dhYmxlUGFyZW50KGM6IGFueSkge1xuICAgICAgd2hpbGUgKGMucGFyZW50Tm9kZSkge1xuICAgICAgICBjID0gYy5wYXJlbnROb2RlO1xuICAgICAgICBpZiAoYy5oYXNBdHRyaWJ1dGUgJiYgYy5oYXNBdHRyaWJ1dGUoJ25neGRyYWdnYWJsZScpKSB7XG4gICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjYW5Nb3ZlKHNvdXJjZT86IGFueSwgaGFuZGxlPzogYW55LCBzaWJsaW5nPzogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9tb3ZlcyA9PT0gJ2Jvb2xlYW4nKSByZXR1cm4gdGhpcy5fbW92ZXM7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9tb3ZlcyA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHRoaXMuX21vdmVzKHRoaXMubW9kZWwsIHNvdXJjZSwgaGFuZGxlLCBzaWJsaW5nKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG1vdmVzKHNvdXJjZTogYW55LCBoYW5kbGU6IGFueSwgc2libGluZzogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmNhbk1vdmUoc291cmNlLCBoYW5kbGUsIHNpYmxpbmcpKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gdGhpcy5oYXNIYW5kbGUgPyB0aGlzLmhhbmRsZXMuc29tZShoID0+IGhhbmRlbEZvcihoYW5kbGUsIGgpKSA6IHRydWU7XG5cbiAgICBmdW5jdGlvbiBoYW5kZWxGb3IoYzogYW55LCBwOiBhbnkpIHtcbiAgICAgIGlmIChjID09PSBwKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHdoaWxlICgoYyA9IGMucGFyZW50Tm9kZSkgJiYgYyAhPT0gcCk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgIHJldHVybiAhIWM7XG4gICAgfVxuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlRWxlbWVudHMoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQWRkcyBwcm9wZXJ0aWVzIGFuZCBldmVudHMgdG8gZHJhZyBoYW5kbGUgZWxlbWVudHNcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ3hEcmFnSGFuZGxlXScgfSlcbmV4cG9ydCBjbGFzcyBEcmFnSGFuZGxlRGlyZWN0aXZlIHt9XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENvbnRlbnRDaGlsZCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEcm9wcGFibGVEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL25neC1kcm9wcGFibGUuZGlyZWN0aXZlJztcblxubGV0IGkgPSAwO1xuZnVuY3Rpb24gZ2V0TmV4dElkKCkge1xuICByZXR1cm4gaSsrO1xufVxuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGFsbG93cyBuZXN0ZWQgbmd4RHJvcHBhYmxlIGFuZCBuZ3hEcmFnZ2FibGVzXG4gKlxuICogQGV4cG9ydFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZG5kLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgPGRpdlxuICBuZ3hEcm9wcGFibGVcbiAgW2Ryb3Bab25lXT1cImRyb3Bab25lXCJcbiAgW21vZGVsXT1cIm1vZGVsXCJcbiAgW2NvcHldPVwiY29weVwiXG4gIFtuZ0NsYXNzXT1cInsgJ2d1LWVtcHR5JzogIW1vZGVsPy5sZW5ndGggfVwiXG4gIFtyZW1vdmVPblNwaWxsXT1cInJlbW92ZU9uU3BpbGxcIlxuICBjbGFzcz0nbmd4LWRuZC1jb250YWluZXInPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kZWxcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIG1vZGVsXCI+XG4gICAgICA8bmd4LWRuZC1pdGVtXG4gICAgICAgIG5neERyYWdnYWJsZVxuICAgICAgICBbbW9kZWxdPVwiaXRlbVwiXG4gICAgICAgIFtkcm9wWm9uZV09XCJkcm9wWm9uZVwiXG4gICAgICAgIFtkcm9wWm9uZXNdPVwiZHJvcFpvbmVzXCJcbiAgICAgICAgW2NvcHldPVwiY29weVwiXG4gICAgICAgIFttb3Zlc109XCJtb3Zlc1wiXG4gICAgICAgIFtyZW1vdmVPblNwaWxsXT1cInJlbW92ZU9uU3BpbGxcIlxuICAgICAgICBbZHJvcHBhYmxlSXRlbUNsYXNzXT1cImRyb3BwYWJsZUl0ZW1DbGFzc1wiPlxuICAgICAgPC9uZ3gtZG5kLWl0ZW0+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuICA8bmctY29udGVudCAqbmdJZj1cIiFtb2RlbFwiPjwvbmctY29udGVudD5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5uZ3gtZG5kLWNvbnRhaW5lcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjIpO2JvcmRlcjoycHggc29saWQgcmVkO21hcmdpbjoxMHB4O3BhZGRpbmc6MTBweH0ubmd4LWRuZC1jb250YWluZXIuZ3UtZW1wdHl7Ym9yZGVyOjJweCBkb3R0ZWQgcmVkfS5uZ3gtZG5kLWNvbnRhaW5lcjpudGgtY2hpbGQob2RkKXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjIpfS5uZ3gtZG5kLWNvbnRhaW5lciAuZXgtbW92ZWR7YmFja2dyb3VuZC1jb2xvcjojZTc0YzNjfS5uZ3gtZG5kLWNvbnRhaW5lciAuZXgtb3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjMpfS5uZ3gtZG5kLWNvbnRhaW5lciAuaGFuZGxle3BhZGRpbmc6MCA1cHg7bWFyZ2luLXJpZ2h0OjVweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjQpO2N1cnNvcjptb3ZlfS5uby1zZWxlY3R7LXdlYmtpdC10b3VjaC1jYWxsb3V0Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfWBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIENvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIG1vZGVsOiBhbnk7XG4gIEBJbnB1dCgpIGNvcHkgPSBmYWxzZTtcbiAgQElucHV0KCkgcmVtb3ZlT25TcGlsbCA9IGZhbHNlO1xuICBASW5wdXQoKSBkcm9wcGFibGVJdGVtQ2xhc3M6IHN0cmluZyB8ICgobzogYW55KSA9PiBhbnkpO1xuXG4gIEBJbnB1dCgpIGRyb3Bab25lID0gYEBARGVmYXVsdERyb3Bab25lLSR7Z2V0TmV4dElkKCl9QEBgO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkcm9wWm9uZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Ryb3Bab25lcyB8fCB0aGlzLl9kZWZhdWx0Wm9uZXM7XG4gIH1cbiAgc2V0IGRyb3Bab25lcyh2YWwpIHtcbiAgICB0aGlzLl9kcm9wWm9uZXMgPSB2YWw7XG4gIH1cblxuICBASW5wdXQoKSBtb3ZlczogKG1vZGVsOiBhbnksIHNvdXJjZTogYW55LCBoYW5kbGU6IGFueSwgc2libGluZzogYW55KSA9PiBib29sZWFuO1xuXG4gIC8vIEBJbnB1dCgpIGNsYXNzZXM6IGFueSA9IHt9O1xuICAvLyBASW5wdXQoKSBkcmFndWxhT3B0aW9uczogYW55O1xuXG4gIEBJbnB1dCgpXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpXG4gIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpXG4gIEBWaWV3Q2hpbGQoRHJvcHBhYmxlRGlyZWN0aXZlKVxuICBkcm9wcGFibGU6IGFueTtcblxuICBAT3V0cHV0KCkgZHJvcDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgZHJhZzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3ZlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSByZW1vdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIGNhbmNlbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBfZHJvcFpvbmVzOiBzdHJpbmdbXTtcbiAgX2RlZmF1bHRab25lczogc3RyaW5nW107XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fZGVmYXVsdFpvbmVzID0gW3RoaXMuZHJvcFpvbmVdO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZHJvcHBhYmxlLmRyYWcuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHRoaXMuZHJhZy5lbWl0KHYpKTtcbiAgICB0aGlzLmRyb3BwYWJsZS5kcm9wLnN1YnNjcmliZSgodjogYW55KSA9PiB0aGlzLmRyb3AuZW1pdCh2KSk7XG4gICAgdGhpcy5kcm9wcGFibGUub3Zlci5zdWJzY3JpYmUoKHY6IGFueSkgPT4gdGhpcy5vdmVyLmVtaXQodikpO1xuICAgIHRoaXMuZHJvcHBhYmxlLm91dC5zdWJzY3JpYmUoKHY6IGFueSkgPT4gdGhpcy5vdXQuZW1pdCh2KSk7XG4gICAgdGhpcy5kcm9wcGFibGUucmVtb3ZlLnN1YnNjcmliZSgodjogYW55KSA9PiB0aGlzLnJlbW92ZS5lbWl0KHYpKTtcbiAgICB0aGlzLmRyb3BwYWJsZS5jYW5jZWwuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHRoaXMuY2FuY2VsLmVtaXQodikpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuLi9jb250YWluZXIvY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL25neC1kcmFnZ2FibGUuZGlyZWN0aXZlJztcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBhbGxvd3MgbmVzdGVkIG5neERyb3BwYWJsZSBhbmQgbmd4RHJhZ2dhYmxlc1xuICogU2hvdWxkIG9ubHkgYmUgdXNlIGluc2lkZSBhIG5neC1kbmQtY29udGFpbmVyXG4gKiBPdXRzaWRlIGEgbmd4LWRuZC1jb250YWluZXIgdXNlIG5neERyb3BwYWJsZVxuICpcbiAqIEBleHBvcnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWRuZC1pdGVtJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJ0eXBlXCI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ2FycmF5J1wiPlxuICAgIDxuZ3gtZG5kLWNvbnRhaW5lclxuICAgICAgW21vZGVsXT1cIm1vZGVsXCJcbiAgICAgIFt0ZW1wbGF0ZV09XCJjb250YWluZXIudGVtcGxhdGVcIlxuICAgICAgW2Ryb3Bab25lXT1cImRyb3Bab25lXCJcbiAgICAgIFtkcm9wWm9uZXNdPVwiZHJvcFpvbmVzXCJcbiAgICAgIFtyZW1vdmVPblNwaWxsXT1cInJlbW92ZU9uU3BpbGxcIlxuICAgICAgW2Ryb3BwYWJsZUl0ZW1DbGFzc109XCJkcm9wcGFibGVJdGVtQ2xhc3NcIlxuICAgICAgW2NvcHldPVwiY29weVwiPlxuICAgIDwvbmd4LWRuZC1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidvYmplY3QnXCI+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAqbmdJZj1cImNvbnRhaW5lci50ZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250YWluZXIudGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImRhdGFcIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY29udGFpbmVyLnRlbXBsYXRlXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwibmd4LWRuZC1jb250ZW50XCI+XG4gICAgICAgIHt7bW9kZWwubGFiZWx9fVxuICAgICAgPC9kaXY+XG4gICAgICA8bmd4LWRuZC1jb250YWluZXJcbiAgICAgICAgKm5nSWY9XCJtb2RlbC5jaGlsZHJlblwiXG4gICAgICAgIFttb2RlbF09XCJtb2RlbC5jaGlsZHJlblwiXG4gICAgICAgIFt0ZW1wbGF0ZV09XCJjb250YWluZXIudGVtcGxhdGVcIlxuICAgICAgICBbZHJvcFpvbmVdPVwiZHJvcFpvbmVcIlxuICAgICAgICBbZHJvcFpvbmVzXT1cImRyb3Bab25lc1wiXG4gICAgICAgIFtyZW1vdmVPblNwaWxsXT1cInJlbW92ZU9uU3BpbGxcIlxuICAgICAgICBbZHJvcHBhYmxlSXRlbUNsYXNzXT1cImRyb3BwYWJsZUl0ZW1DbGFzc1wiXG4gICAgICAgIFtjb3B5XT1cImNvcHlcIj5cbiAgICAgIDwvbmd4LWRuZC1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIid1bmRlZmluZWQnXCI+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoRGVmYXVsdD5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICpuZ0lmPVwiY29udGFpbmVyLnRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRhaW5lci50ZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiZGF0YVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPGRpdlxuICAgICAgKm5nSWY9XCIhY29udGFpbmVyLnRlbXBsYXRlXCJcbiAgICAgIGNsYXNzPVwibmd4LWRuZC1jb250ZW50XCI+XG4gICAgICB7e21vZGVsfX1cbiAgICA8L2Rpdj5cbiAgPC9uZy1jb250YWluZXI+XG5cbjwvbmctY29udGFpbmVyPlxuXG5cblxuXG5cblxuXG5gLFxuICBzdHlsZXM6IFtgLm5neC1kbmQtaXRlbXttYXJnaW46MTBweDtwYWRkaW5nOjEwcHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4yKTt0cmFuc2l0aW9uOm9wYWNpdHkgLjRzIGVhc2UtaW4tb3V0O2JvcmRlcjoxcHggc29saWQgI2FkZDhlNjtkaXNwbGF5OmJsb2NrfS5uZ3gtZG5kLWl0ZW0uaGFzLWhhbmRsZSBbbmd4RHJhZ0hhbmRsZV0sLm5neC1kbmQtaXRlbS5oYXMtaGFuZGxlIFtuZ3hkcmFnaGFuZGxlXSwubmd4LWRuZC1pdGVtOm5vdCguaGFzLWhhbmRsZSk6bm90KC5tb3ZlLWRpc2FibGVkKXtjdXJzb3I6bW92ZTtjdXJzb3I6Z3JhYjtjdXJzb3I6LXdlYmtpdC1ncmFifS5uZ3gtZG5kLWl0ZW0gLm5neC1kbmQtY29udGVudHstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9Lm5neC1kbmQtaXRlbTpob3Zlcntib3JkZXI6MXB4IHNvbGlkICMwMGZ9Lmd1LW1pcnJvcntwb3NpdGlvbjpmaXhlZCFpbXBvcnRhbnQ7bWFyZ2luOjAhaW1wb3J0YW50O3otaW5kZXg6OTk5OSFpbXBvcnRhbnQ7b3BhY2l0eTouOH0uZ3UtaGlkZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fS5ndS11bnNlbGVjdGFibGV7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lIWltcG9ydGFudDstbW96LXVzZXItc2VsZWN0Om5vbmUhaW1wb3J0YW50Oy1tcy11c2VyLXNlbGVjdDpub25lIWltcG9ydGFudDt1c2VyLXNlbGVjdDpub25lIWltcG9ydGFudH0uZ3UtdHJhbnNpdHtvcGFjaXR5Oi4yfWBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBtb2RlbDogYW55O1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkcm9wWm9uZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcFpvbmUgfHwgdGhpcy5jb250YWluZXIuZHJvcFpvbmU7XG4gIH1cbiAgc2V0IGRyb3Bab25lKHZhbCkge1xuICAgIHRoaXMuX2Ryb3Bab25lID0gdmFsO1xuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IGRyb3Bab25lcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcFpvbmVzIHx8IHRoaXMuY29udGFpbmVyLmRyb3Bab25lcztcbiAgfVxuICBzZXQgZHJvcFpvbmVzKHZhbCkge1xuICAgIHRoaXMuX2Ryb3Bab25lcyA9IHZhbDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBkcm9wcGFibGVJdGVtQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Ryb3BwYWJsZUl0ZW1DbGFzcyB8fCB0aGlzLmNvbnRhaW5lci5kcm9wcGFibGVJdGVtQ2xhc3M7XG4gIH1cbiAgc2V0IGRyb3BwYWJsZUl0ZW1DbGFzcyh2YWwpIHtcbiAgICB0aGlzLl9kcm9wcGFibGVJdGVtQ2xhc3MgPSB2YWw7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgcmVtb3ZlT25TcGlsbCgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMuX3JlbW92ZU9uU3BpbGwgPT09ICdib29sZWFuJyA/IHRoaXMuX3JlbW92ZU9uU3BpbGwgOiB0aGlzLmNvbnRhaW5lci5yZW1vdmVPblNwaWxsO1xuICB9XG4gIHNldCByZW1vdmVPblNwaWxsKHZhbCkge1xuICAgIHRoaXMuX3JlbW92ZU9uU3BpbGwgPSB2YWw7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgY29weSgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMuX2NvcHkgPT09ICdib29sZWFuJyA/IHRoaXMuX2NvcHkgOiB0aGlzLmNvbnRhaW5lci5jb3B5O1xuICB9XG4gIHNldCBjb3B5KHZhbCkge1xuICAgIHRoaXMuX2NvcHkgPSB2YWw7XG4gIH1cblxuICBfY29weSA9IGZhbHNlO1xuICBfZHJvcFpvbmU6IGFueTtcbiAgX2Ryb3Bab25lczogYW55O1xuICBfZHJvcHBhYmxlSXRlbUNsYXNzOiBhbnk7XG4gIF9yZW1vdmVPblNwaWxsID0gZmFsc2U7XG4gIGRhdGE6IGFueTtcblxuICBnZXQgaGFzSGFuZGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRyYWdnYWJsZURpcmVjdGl2ZS5oYXNIYW5kbGU7XG4gIH1cblxuICBnZXQgbW92ZURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5kcmFnZ2FibGVEaXJlY3RpdmUuY2FuTW92ZSgpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBjbGFzc1N0cmluZygpIHtcbiAgICBjb25zdCBpdGVtQ2xhc3MgPVxuICAgICAgdHlwZW9mIHRoaXMuZHJvcHBhYmxlSXRlbUNsYXNzID09PSAnZnVuY3Rpb24nID8gdGhpcy5kcm9wcGFibGVJdGVtQ2xhc3ModGhpcy5tb2RlbCkgOiB0aGlzLmRyb3BwYWJsZUl0ZW1DbGFzcztcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBbJ25neC1kbmQtaXRlbScsIGl0ZW1DbGFzcyB8fCAnJ107XG4gICAgaWYgKHRoaXMubW92ZURpc2FibGVkKSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ21vdmUtZGlzYWJsZWQnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaGFzSGFuZGxlKSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ2hhcy1oYW5kbGUnKTtcbiAgICB9XG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5tb2RlbCkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIHRoaXMubW9kZWw7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udGFpbmVyOiBDb250YWluZXJDb21wb25lbnQsIHB1YmxpYyBkcmFnZ2FibGVEaXJlY3RpdmU6IERyYWdnYWJsZURpcmVjdGl2ZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRhdGEgPSB7XG4gICAgICBtb2RlbDogdGhpcy5tb2RlbCxcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIGRyb3Bab25lOiB0aGlzLmRyb3Bab25lLFxuICAgICAgdGVtcGxhdGU6IHRoaXMuY29udGFpbmVyLnRlbXBsYXRlXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IERyYWdnYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcm9wcGFibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmd4LWRyb3BwYWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJhZ0hhbmRsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtZHJhZy1oYW5kbGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb250YWluZXIvY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2l0ZW0vaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRHJha2VTdG9yZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2RyYWtlLXN0b3JlLnNlcnZpY2UnO1xuXG5jb25zdCBjb21wb25lbnRzID0gW0NvbnRhaW5lckNvbXBvbmVudCwgSXRlbUNvbXBvbmVudF07XG5jb25zdCBkaXJlY3RpdmVzID0gW0RyYWdnYWJsZURpcmVjdGl2ZSwgRHJvcHBhYmxlRGlyZWN0aXZlLCBEcmFnSGFuZGxlRGlyZWN0aXZlXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogWy4uLmNvbXBvbmVudHMsIC4uLmRpcmVjdGl2ZXNdLFxuICBleHBvcnRzOiBbLi4uY29tcG9uZW50cywgLi4uZGlyZWN0aXZlc10sXG4gIHByb3ZpZGVyczogW0RyYWtlU3RvcmVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hEbkRNb2R1bGUge31cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiRXZlbnRFbWl0dGVyIiwiRGlyZWN0aXZlIiwiRWxlbWVudFJlZiIsIlJlbmRlcmVyMiIsIklucHV0IiwiT3V0cHV0IiwiSG9zdExpc3RlbmVyIiwiaSIsImdldE5leHRJZCIsIkNvbXBvbmVudCIsIlZpZXdFbmNhcHN1bGF0aW9uIiwiQ29udGVudENoaWxkIiwiVGVtcGxhdGVSZWYiLCJWaWV3Q2hpbGQiLCJIb3N0QmluZGluZyIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7SUFPQSxxQkFBTSxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7Ozs7Ozs7UUFjL0I7Z0NBTHVCLElBQUksT0FBTyxFQUEyQjtnQ0FDdEMsSUFBSSxPQUFPLEVBQTJCO1lBSzNELElBQUksQ0FBQyxjQUFj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