(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/swimlane/ngx-dnd/fesm5/swimlane-ngx-dnd.js":
/*!*********************************************************!*\
  !*** ./dist/swimlane/ngx-dnd/fesm5/swimlane-ngx-dnd.js ***!
  \*********************************************************/
/*! exports provided: DraggableDirective, DroppableDirective, DragHandleDirective, ItemComponent, ContainerComponent, DrakeStoreService, NgxDnDModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DraggableDirective", function() { return DraggableDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DroppableDirective", function() { return DroppableDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragHandleDirective", function() { return DragHandleDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemComponent", function() { return ItemComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContainerComponent", function() { return ContainerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrakeStoreService", function() { return DrakeStoreService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxDnDModule", function() { return NgxDnDModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _swimlane_dragula__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @swimlane/dragula */ "./node_modules/@swimlane/dragula/dragula.js");
/* harmony import */ var _swimlane_dragula__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_swimlane_dragula__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");





/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// see https://github.com/dherges/ng-packagr/issues/217
var /** @type {?} */ dragula = _swimlane_dragula__WEBPACK_IMPORTED_MODULE_1__;
/**
 * Central service that handles all events
 *
 * @export
 */
var DrakeStoreService = /** @class */ (function () {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
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
var DroppableDirective = /** @class */ (function () {
    function DroppableDirective(el, renderer, drakesService) {
        this.el = el;
        this.renderer = renderer;
        this.drakesService = drakesService;
        this.copy = false;
        this.removeOnSpill = false;
        this.drop = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.drag = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.over = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.out = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.remove = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.cancel = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(DroppableDirective.prototype, "container", {
        get: /**
         * @return {?}
         */
        function () {
            return this.el.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DroppableDirective.prototype, "dropZone", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dropZone || this.ngxDroppable || this.defaultZone;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{ selector: '[ngxDroppable]' },] },
    ];
    /** @nocollapse */
    DroppableDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], },
        { type: DrakeStoreService, },
    ]; };
    DroppableDirective.propDecorators = {
        "model": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "copy": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "removeOnSpill": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "ngxDroppable": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "drop": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "drag": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "over": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "out": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "remove": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "cancel": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "dropZone": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
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
var DraggableDirective = /** @class */ (function () {
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
        this.drag = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.dragDelay = 200;
        this.dragDelayed = true;
    }
    Object.defineProperty(DraggableDirective.prototype, "dropZones", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dropZones || this.ngxDraggable || this._parentDropzones;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._dropZones = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableDirective.prototype, "hasHandle", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.handles.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableDirective.prototype, "element", {
        get: /**
         * @return {?}
         */
        function () {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{ selector: '[ngxDraggable]' },] },
    ];
    /** @nocollapse */
    DraggableDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
        { type: DrakeStoreService, },
        { type: DroppableDirective, },
    ]; };
    DraggableDirective.propDecorators = {
        "ngxDraggable": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "model": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "dropZones": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "_moves": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['moves',] },],
        "drag": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "onMove": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['touchmove', ['$event'],] },],
        "onDown": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['touchstart',] },],
        "onUp": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['touchend',] },],
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
var DragHandleDirective = /** @class */ (function () {
    function DragHandleDirective() {
    }
    DragHandleDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{ selector: '[ngxDragHandle]' },] },
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
var ContainerComponent = /** @class */ (function () {
    function ContainerComponent() {
        this.copy = false;
        this.removeOnSpill = false;
        this.dropZone = "@@DefaultDropZone-" + getNextId$1() + "@@";
        this.drop = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.drag = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.over = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.out = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.remove = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.cancel = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(ContainerComponent.prototype, "dropZones", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dropZones || this._defaultZones;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ngx-dnd-container',
                    template: "<div\n  ngxDroppable\n  [dropZone]=\"dropZone\"\n  [model]=\"model\"\n  [copy]=\"copy\"\n  [ngClass]=\"{ 'gu-empty': !model?.length }\"\n  [removeOnSpill]=\"removeOnSpill\"\n  class='ngx-dnd-container'>\n  <ng-container *ngIf=\"model\">\n    <ng-container *ngFor=\"let item of model\">\n      <ngx-dnd-item\n        ngxDraggable\n        [model]=\"item\"\n        [dropZone]=\"dropZone\"\n        [dropZones]=\"dropZones\"\n        [copy]=\"copy\"\n        [moves]=\"moves\"\n        [removeOnSpill]=\"removeOnSpill\"\n        [droppableItemClass]=\"droppableItemClass\">\n      </ngx-dnd-item>\n    </ng-container>\n  </ng-container>\n  <ng-content *ngIf=\"!model\"></ng-content>\n</div>\n",
                    styles: [".ngx-dnd-container{background-color:rgba(255,255,255,.2);border:2px solid red;margin:10px;padding:10px}.ngx-dnd-container.gu-empty{border:2px dotted red}.ngx-dnd-container:nth-child(odd){background-color:rgba(0,0,0,.2)}.ngx-dnd-container .ex-moved{background-color:#e74c3c}.ngx-dnd-container .ex-over{background-color:rgba(255,255,255,.3)}.ngx-dnd-container .handle{padding:0 5px;margin-right:5px;background-color:rgba(0,0,0,.4);cursor:move}.no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"],
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
                },] },
    ];
    /** @nocollapse */
    ContainerComponent.propDecorators = {
        "model": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "copy": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "removeOnSpill": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "droppableItemClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "dropZone": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "dropZones": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "moves": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "template": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],] },],
        "droppable": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [DroppableDirective,] },],
        "drop": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "drag": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "over": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "out": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "remove": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "cancel": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
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
var ItemComponent = /** @class */ (function () {
    function ItemComponent(container, draggableDirective) {
        this.container = container;
        this.draggableDirective = draggableDirective;
        this._copy = false;
        this._removeOnSpill = false;
    }
    Object.defineProperty(ItemComponent.prototype, "dropZone", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dropZone || this.container.dropZone;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._dropZone = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "dropZones", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dropZones || this.container.dropZones;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._dropZones = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "droppableItemClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this._droppableItemClass || this.container.droppableItemClass;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._droppableItemClass = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "removeOnSpill", {
        get: /**
         * @return {?}
         */
        function () {
            return typeof this._removeOnSpill === 'boolean' ? this._removeOnSpill : this.container.removeOnSpill;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._removeOnSpill = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "copy", {
        get: /**
         * @return {?}
         */
        function () {
            return typeof this._copy === 'boolean' ? this._copy : this.container.copy;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._copy = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "hasHandle", {
        get: /**
         * @return {?}
         */
        function () {
            return this.draggableDirective.hasHandle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "moveDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.draggableDirective.canMove();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "classString", {
        get: /**
         * @return {?}
         */
        function () {
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
         */
        function () {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ngx-dnd-item',
                    template: "<ng-container [ngSwitch]=\"type\">\n\n  <ng-container *ngSwitchCase=\"'array'\">\n    <ngx-dnd-container\n      [model]=\"model\"\n      [template]=\"container.template\"\n      [dropZone]=\"dropZone\"\n      [dropZones]=\"dropZones\"\n      [removeOnSpill]=\"removeOnSpill\"\n      [droppableItemClass]=\"droppableItemClass\"\n      [copy]=\"copy\">\n    </ngx-dnd-container>\n  </ng-container>\n\n  <ng-container *ngSwitchCase=\"'object'\">\n    <ng-template\n      *ngIf=\"container.template\"\n      [ngTemplateOutlet]=\"container.template\"\n      [ngTemplateOutletContext]=\"data\">\n    </ng-template>\n    <ng-container *ngIf=\"!container.template\">\n      <div\n        class=\"ngx-dnd-content\">\n        {{model.label}}\n      </div>\n      <ngx-dnd-container\n        *ngIf=\"model.children\"\n        [model]=\"model.children\"\n        [template]=\"container.template\"\n        [dropZone]=\"dropZone\"\n        [dropZones]=\"dropZones\"\n        [removeOnSpill]=\"removeOnSpill\"\n        [droppableItemClass]=\"droppableItemClass\"\n        [copy]=\"copy\">\n      </ngx-dnd-container>\n    </ng-container>\n  </ng-container>\n\n  <ng-container *ngSwitchCase=\"'undefined'\">\n  </ng-container>\n\n  <ng-container *ngSwitchDefault>\n    <ng-template\n      *ngIf=\"container.template\"\n      [ngTemplateOutlet]=\"container.template\"\n      [ngTemplateOutletContext]=\"data\">\n    </ng-template>\n    <div\n      *ngIf=\"!container.template\"\n      class=\"ngx-dnd-content\">\n      {{model}}\n    </div>\n  </ng-container>\n\n</ng-container>\n\n\n\n\n\n\n\n",
                    styles: [".ngx-dnd-item{margin:10px;padding:10px;background-color:rgba(0,0,0,.2);transition:opacity .4s ease-in-out;border:1px solid #add8e6;display:block}.ngx-dnd-item.has-handle [ngxDragHandle],.ngx-dnd-item.has-handle [ngxdraghandle],.ngx-dnd-item:not(.has-handle):not(.move-disabled){cursor:move;cursor:grab;cursor:-webkit-grab}.ngx-dnd-item .ngx-dnd-content{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ngx-dnd-item:hover{border:1px solid #00f}.gu-mirror{position:fixed!important;margin:0!important;z-index:9999!important;opacity:.8}.gu-hide{display:none!important}.gu-unselectable{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.gu-transit{opacity:.2}"],
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
                },] },
    ];
    /** @nocollapse */
    ItemComponent.ctorParameters = function () { return [
        { type: ContainerComponent, },
        { type: DraggableDirective, },
    ]; };
    ItemComponent.propDecorators = {
        "model": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "dropZone": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "dropZones": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "droppableItemClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "removeOnSpill": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "copy": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "classString": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class',] },],
    };
    return ItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ components = [ContainerComponent, ItemComponent];
var /** @type {?} */ directives = [DraggableDirective, DroppableDirective, DragHandleDirective];
var NgxDnDModule = /** @class */ (function () {
    function NgxDnDModule() {
    }
    NgxDnDModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"]],
                    declarations: Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__spread"])(components, directives),
                    exports: Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__spread"])(components, directives),
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



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpbWxhbmUtbmd4LWRuZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHN3aW1sYW5lL25neC1kbmQvbGliL3NlcnZpY2VzL2RyYWtlLXN0b3JlLnNlcnZpY2UudHMiLCJuZzovL0Bzd2ltbGFuZS9uZ3gtZG5kL2xpYi9kaXJlY3RpdmVzL25neC1kcm9wcGFibGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ac3dpbWxhbmUvbmd4LWRuZC9saWIvZGlyZWN0aXZlcy9uZ3gtZHJhZ2dhYmxlLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHN3aW1sYW5lL25neC1kbmQvbGliL2RpcmVjdGl2ZXMvbmd4LWRyYWctaGFuZGxlLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHN3aW1sYW5lL25neC1kbmQvbGliL2NvbXBvbmVudHMvY29udGFpbmVyL2NvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL0Bzd2ltbGFuZS9uZ3gtZG5kL2xpYi9jb21wb25lbnRzL2l0ZW0vaXRlbS5jb21wb25lbnQudHMiLCJuZzovL0Bzd2ltbGFuZS9uZ3gtZG5kL2xpYi9uZ3gtZG5kLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIGRyYWd1bGFOYW1lc3BhY2UgZnJvbSAnQHN3aW1sYW5lL2RyYWd1bGEnO1xuaW1wb3J0IHsgRHJvcHBhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9uZ3gtZHJvcHBhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuLi9kaXJlY3RpdmVzL25neC1kcmFnZ2FibGUuZGlyZWN0aXZlJztcblxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9kaGVyZ2VzL25nLXBhY2thZ3IvaXNzdWVzLzIxN1xuY29uc3QgZHJhZ3VsYSA9IGRyYWd1bGFOYW1lc3BhY2U7XG5cbi8qKlxuICogQ2VudHJhbCBzZXJ2aWNlIHRoYXQgaGFuZGxlcyBhbGwgZXZlbnRzXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRHJha2VTdG9yZVNlcnZpY2Uge1xuICBwcml2YXRlIGRyb3BwYWJsZU1hcCA9IG5ldyBXZWFrTWFwPGFueSwgRHJvcHBhYmxlRGlyZWN0aXZlPigpO1xuICBwcml2YXRlIGRyYWdnYWJsZU1hcCA9IG5ldyBXZWFrTWFwPGFueSwgRHJhZ2dhYmxlRGlyZWN0aXZlPigpO1xuICBwcml2YXRlIGRyYWd1bGFPcHRpb25zOiBkcmFndWxhTmFtZXNwYWNlLkRyYWd1bGFPcHRpb25zO1xuICBwcml2YXRlIGRyYWtlOiBkcmFndWxhTmFtZXNwYWNlLkRyYWtlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZHJhZ3VsYU9wdGlvbnMgPSB0aGlzLmNyZWF0ZURyYWtlT3B0aW9ucygpO1xuICAgIHRoaXMuZHJha2UgPSBkcmFndWxhKFtdLCB0aGlzLmRyYWd1bGFPcHRpb25zKTtcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKCk7XG4gIH1cblxuICByZWdpc3Rlcihkcm9wcGFibGU6IERyb3BwYWJsZURpcmVjdGl2ZSkge1xuICAgIHRoaXMuZHJvcHBhYmxlTWFwLnNldChkcm9wcGFibGUuY29udGFpbmVyLCBkcm9wcGFibGUpO1xuICAgIHRoaXMuZHJha2UuY29udGFpbmVycy5wdXNoKGRyb3BwYWJsZS5jb250YWluZXIpO1xuICB9XG5cbiAgcmVtb3ZlKGRyb3BwYWJsZTogRHJvcHBhYmxlRGlyZWN0aXZlKSB7XG4gICAgdGhpcy5kcm9wcGFibGVNYXAuZGVsZXRlKGRyb3BwYWJsZS5jb250YWluZXIpO1xuICAgIGNvbnN0IGlkeCA9IHRoaXMuZHJha2UuY29udGFpbmVycy5pbmRleE9mKGRyb3BwYWJsZS5jb250YWluZXIpO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgdGhpcy5kcmFrZS5jb250YWluZXJzLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyRHJhZ2dhYmxlKGRyYWdnYWJsZTogRHJhZ2dhYmxlRGlyZWN0aXZlKSB7XG4gICAgdGhpcy5kcmFnZ2FibGVNYXAuc2V0KGRyYWdnYWJsZS5lbGVtZW50LCBkcmFnZ2FibGUpO1xuICB9XG5cbiAgcmVtb3ZlRHJhZ2dhYmxlKGRyYWdnYWJsZTogRHJhZ2dhYmxlRGlyZWN0aXZlKSB7XG4gICAgdGhpcy5kcmFnZ2FibGVNYXAuZGVsZXRlKGRyYWdnYWJsZS5lbGVtZW50KTtcbiAgfVxuXG4gIGNyZWF0ZURyYWtlT3B0aW9ucygpOiBkcmFndWxhTmFtZXNwYWNlLkRyYWd1bGFPcHRpb25zIHtcbiAgICBjb25zdCBhY2NlcHRzID0gKGVsOiBhbnksIHRhcmdldDogYW55IC8qLCBzb3VyY2U6IGFueSwgc2libGluZzogYW55ICovKSA9PiB7XG4gICAgICBpZiAoZWwuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBjb25zdCBlbGVtZW50Q29tcG9uZW50ID0gdGhpcy5kcmFnZ2FibGVNYXAuZ2V0KGVsKTtcbiAgICAgIGNvbnN0IHRhcmdldENvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldCh0YXJnZXQpO1xuICAgICAgaWYgKGVsZW1lbnRDb21wb25lbnQgJiYgdGFyZ2V0Q29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Q29tcG9uZW50LmRyb3Bab25lcy5pbmNsdWRlcyh0YXJnZXRDb21wb25lbnQuZHJvcFpvbmUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIGNvbnN0IGNvcHkgPSAoXzogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgY29uc3Qgc291cmNlQ29tcG9uZW50ID0gdGhpcy5kcm9wcGFibGVNYXAuZ2V0KHNvdXJjZSk7XG4gICAgICBpZiAoc291cmNlQ29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybiBzb3VyY2VDb21wb25lbnQuY29weTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3QgbW92ZXMgPSAoZWw/OiBhbnksIHNvdXJjZT86IGFueSwgaGFuZGxlPzogYW55LCBzaWJsaW5nPzogYW55KSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50Q29tcG9uZW50ID0gdGhpcy5kcmFnZ2FibGVNYXAuZ2V0KGVsKTtcbiAgICAgIGlmIChlbGVtZW50Q29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Q29tcG9uZW50Lm1vdmVzKHNvdXJjZSwgaGFuZGxlLCBzaWJsaW5nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICByZXR1cm4geyBhY2NlcHRzLCBjb3B5LCBtb3ZlcywgcmV2ZXJ0T25TcGlsbDogdHJ1ZSwgZGlyZWN0aW9uOiAndmVydGljYWwnIH07XG4gIH1cblxuICByZWdpc3RlckV2ZW50cygpOiB2b2lkIHtcbiAgICBsZXQgZHJhZ0VsbTogYW55O1xuICAgIGxldCBkcmFnZ2VkSXRlbTogYW55O1xuXG4gICAgdGhpcy5kcmFrZS5vbignZHJhZycsIChlbDogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgZHJhZ2dlZEl0ZW0gPSB1bmRlZmluZWQ7XG4gICAgICBkcmFnRWxtID0gZWw7XG5cbiAgICAgIGlmICghZWwgfHwgIXNvdXJjZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmRyYWdnYWJsZU1hcC5oYXMoZWwpKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRDb21wb25lbnQgPSB0aGlzLmRyYWdnYWJsZU1hcC5nZXQoZWwpO1xuICAgICAgICBkcmFnZ2VkSXRlbSA9IGVsZW1lbnRDb21wb25lbnQubW9kZWw7XG5cbiAgICAgICAgZWxlbWVudENvbXBvbmVudC5kcmFnLmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdkcmFnJyxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgdmFsdWU6IGRyYWdnZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kcm9wcGFibGVNYXAuaGFzKHNvdXJjZSkpIHtcbiAgICAgICAgY29uc3Qgc291cmNlQ29tcG9uZW50ID0gdGhpcy5kcm9wcGFibGVNYXAuZ2V0KHNvdXJjZSk7XG4gICAgICAgIHRoaXMuZHJhZ3VsYU9wdGlvbnMucmVtb3ZlT25TcGlsbCA9IHNvdXJjZUNvbXBvbmVudC5yZW1vdmVPblNwaWxsO1xuXG4gICAgICAgIHNvdXJjZUNvbXBvbmVudC5kcmFnLmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdkcmFnJyxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgc291cmNlQ29tcG9uZW50LFxuICAgICAgICAgIHZhbHVlOiBkcmFnZ2VkSXRlbVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZHJha2Uub24oJ2Ryb3AnLCAoZWw6IGFueSwgdGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXRDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQodGFyZ2V0KTtcblxuICAgICAgaWYgKCF0YXJnZXRDb21wb25lbnQpIHtcbiAgICAgICAgLy8gbm90IGEgdGFyZ2V0LCBhYm9ydFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBkcm9wRWxtTW9kZWwgPSBkcmFnZ2VkSXRlbTtcbiAgICAgIGNvbnN0IGRyb3BJbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwodGFyZ2V0LmNoaWxkcmVuLCBlbCk7XG5cbiAgICAgIGlmIChkcm9wSW5kZXggPCAwKSB7XG4gICAgICAgIC8vIGRyb3BJbmRleCBpcyBiYWQuLi4gY2FuY2VsXG4gICAgICAgIHRoaXMuZHJha2UuY2FuY2VsKHRydWUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNvdXJjZUNvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldChzb3VyY2UpO1xuXG4gICAgICBpZiAoc291cmNlQ29tcG9uZW50KSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZU1vZGVsID0gc291cmNlQ29tcG9uZW50Lm1vZGVsO1xuICAgICAgICBjb25zdCB0YXJnZXRNb2RlbCA9IHRhcmdldENvbXBvbmVudC5tb2RlbDtcblxuICAgICAgICBjb25zdCBoYXNEcmFnTW9kZWwgPSAhIShzb3VyY2VNb2RlbCAmJiBkcmFnZ2VkSXRlbSk7XG4gICAgICAgIGNvbnN0IGRyYWdJbmRleCA9IGhhc0RyYWdNb2RlbCA/IHNvdXJjZU1vZGVsLmluZGV4T2YoZHJhZ2dlZEl0ZW0pIDogLTE7XG4gICAgICAgIGlmIChoYXNEcmFnTW9kZWwgJiYgZHJhZ0luZGV4IDwgMCkge1xuICAgICAgICAgIC8vIGRyYWdJbmRleCBpcyBiYWQuLi4gY2FuY2VsXG4gICAgICAgICAgdGhpcy5kcmFrZS5jYW5jZWwodHJ1ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldE1vZGVsKSB7XG4gICAgICAgICAgY29uc3QgcmVvcmRlciA9IGRyYWdJbmRleCA+IC0xICYmIHNvdXJjZU1vZGVsICYmIHRhcmdldCA9PT0gc291cmNlO1xuICAgICAgICAgIGNvbnN0IGNvcHkgPSAhc291cmNlTW9kZWwgfHwgZHJhZ0VsbSAhPT0gZWw7XG4gICAgICAgICAgaWYgKHJlb3JkZXIpIHtcbiAgICAgICAgICAgIHNvdXJjZU1vZGVsLnNwbGljZShkcm9wSW5kZXgsIDAsIHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpWzBdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGVsLnBhcmVudE5vZGUgPT09IHRhcmdldCkge1xuICAgICAgICAgICAgICB0YXJnZXQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29weSkge1xuICAgICAgICAgICAgICBkcm9wRWxtTW9kZWwgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRyb3BFbG1Nb2RlbCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGVsLnBhcmVudE5vZGUgIT09IHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIC8vIGFkZCBlbGVtZW50IGJhY2ssIGxldCBhbmd1bGFyIHJlbW92ZSBpdFxuICAgICAgICAgICAgICAgIHRoaXMuZHJha2UuY2FuY2VsKHRydWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0TW9kZWwuc3BsaWNlKGRyb3BJbmRleCwgMCwgZHJvcEVsbU1vZGVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGFyZ2V0Q29tcG9uZW50LmRyb3AuZW1pdCh7XG4gICAgICAgIHR5cGU6ICdkcm9wJyxcbiAgICAgICAgZWwsXG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgdmFsdWU6IGRyb3BFbG1Nb2RlbCxcbiAgICAgICAgZHJvcEluZGV4XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZHJha2Uub24oJ3JlbW92ZScsIChlbDogYW55LCBjb250YWluZXI6IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU1hcC5oYXMoc291cmNlKSkge1xuICAgICAgICBjb25zdCBzb3VyY2VDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQoc291cmNlKTtcbiAgICAgICAgY29uc3Qgc291cmNlTW9kZWwgPSBzb3VyY2VDb21wb25lbnQubW9kZWw7XG5cbiAgICAgICAgY29uc3QgZHJhZ0luZGV4ID0gZHJhZ2dlZEl0ZW0gJiYgc291cmNlTW9kZWwgPyBzb3VyY2VNb2RlbC5pbmRleE9mKGRyYWdnZWRJdGVtKSA6IC0xO1xuXG4gICAgICAgIGlmIChkcmFnSW5kZXggPiAtMSkge1xuICAgICAgICAgIGlmIChlbC5wYXJlbnROb2RlICE9PSBzb3VyY2UpIHtcbiAgICAgICAgICAgIC8vIGFkZCBlbGVtZW50IGJhY2ssIGxldCBhbmd1bGFyIHJlbW92ZSBpdFxuICAgICAgICAgICAgc291cmNlLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc291cmNlTW9kZWwuc3BsaWNlKGRyYWdJbmRleCwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBzb3VyY2VDb21wb25lbnQucmVtb3ZlLmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdyZW1vdmUnLFxuICAgICAgICAgIGVsLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgdmFsdWU6IGRyYWdnZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kcmFrZS5vbignY2FuY2VsJywgKGVsOiBhbnksIGNvbnRhaW5lcjogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTWFwLmhhcyhjb250YWluZXIpKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckNvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldChjb250YWluZXIpO1xuICAgICAgICBjb250YWluZXJDb21wb25lbnQuY2FuY2VsLmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdjYW5jZWwnLFxuICAgICAgICAgIGVsLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgdmFsdWU6IGRyYWdnZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kcmFrZS5vbignb3ZlcicsIChlbDogYW55LCBjb250YWluZXI6IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU1hcC5oYXMoY29udGFpbmVyKSkge1xuICAgICAgICBjb25zdCBjb250YWluZXJDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQoY29udGFpbmVyKTtcbiAgICAgICAgY29udGFpbmVyQ29tcG9uZW50Lm92ZXIuZW1pdCh7XG4gICAgICAgICAgdHlwZTogJ292ZXInLFxuICAgICAgICAgIGVsLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgdmFsdWU6IGRyYWdnZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kcmFrZS5vbignb3V0JywgKGVsOiBhbnksIGNvbnRhaW5lcjogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTWFwLmhhcyhjb250YWluZXIpKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckNvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldChjb250YWluZXIpO1xuICAgICAgICBjb250YWluZXJDb21wb25lbnQub3V0LmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdvdXQnLFxuICAgICAgICAgIGVsLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgdmFsdWU6IGRyYWdnZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBBZnRlclZpZXdJbml0LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRHJha2VTdG9yZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9kcmFrZS1zdG9yZS5zZXJ2aWNlJztcblxubGV0IGkgPSAxMDAwMDtcbmZ1bmN0aW9uIGdldE5leHRJZCgpIHtcbiAgcmV0dXJuIGkrKztcbn1cblxuLyoqXG4gKiBNYWtlcyB0aGUgY29udGFpbmVyIGRyb3BwYWJsZSBhbmQgY2hpbGRyZW4gZHJhZ2dhYmxlLlxuICpcbiAqIEBleHBvcnRcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25neERyb3BwYWJsZV0nIH0pXG5leHBvcnQgY2xhc3MgRHJvcHBhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBtb2RlbDogYW55O1xuICBASW5wdXQoKSBjb3B5ID0gZmFsc2U7XG4gIEBJbnB1dCgpIHJlbW92ZU9uU3BpbGwgPSBmYWxzZTtcbiAgQElucHV0KCkgbmd4RHJvcHBhYmxlOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGRyb3A6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIGRyYWc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG92ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG91dDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBjYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgZ2V0IGNvbnRhaW5lcigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgZHJvcFpvbmUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcFpvbmUgfHwgdGhpcy5uZ3hEcm9wcGFibGUgfHwgdGhpcy5kZWZhdWx0Wm9uZTtcbiAgfVxuICBzZXQgZHJvcFpvbmUodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9kcm9wWm9uZSA9IHZhbDtcbiAgfVxuXG4gIGRlZmF1bHRab25lOiBzdHJpbmc7XG4gIF9kcm9wWm9uZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBkcmFrZXNTZXJ2aWNlOiBEcmFrZVN0b3JlU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRlZmF1bHRab25lID0gYEBARGVmYXVsdERyb3Bab25lLSR7Z2V0TmV4dElkKCl9QEBgO1xuICAgIHRoaXMuZHJha2VzU2VydmljZS5yZWdpc3Rlcih0aGlzKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXIuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXIsICdndS1vdmVyJyk7XG4gICAgfSk7XG4gICAgdGhpcy5vdXQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250YWluZXIsICdndS1vdmVyJyk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRyYWtlc1NlcnZpY2UucmVtb3ZlKHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEcm9wcGFibGVEaXJlY3RpdmUgfSBmcm9tICcuL25neC1kcm9wcGFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERyYWtlU3RvcmVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZHJha2Utc3RvcmUuc2VydmljZSc7XG5cbi8qKlxuICogQWRkcyBwcm9wZXJ0aWVzIGFuZCBldmVudHMgdG8gZHJhZ2dhYmxlIGVsZW1lbnRzXG4gKlxuICogQGV4cG9ydFxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmd4RHJhZ2dhYmxlXScgfSlcbmV4cG9ydCBjbGFzcyBEcmFnZ2FibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIG5neERyYWdnYWJsZTogc3RyaW5nW107XG4gIEBJbnB1dCgpIG1vZGVsOiBhbnk7XG5cbiAgQElucHV0KClcbiAgZ2V0IGRyb3Bab25lcygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9kcm9wWm9uZXMgfHwgdGhpcy5uZ3hEcmFnZ2FibGUgfHwgdGhpcy5fcGFyZW50RHJvcHpvbmVzO1xuICB9XG4gIHNldCBkcm9wWm9uZXModmFsOiBhbnkpIHtcbiAgICB0aGlzLl9kcm9wWm9uZXMgPSB2YWw7XG4gIH1cblxuICBASW5wdXQoJ21vdmVzJykgX21vdmVzOiBib29sZWFuIHwgKCguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9IHRydWU7XG5cbiAgLypcbiAgQ29udGVudENoaWxkcmVuIGRvZXNuJ3QgZ2V0IGNoaWxkcmVuIGNyZWF0ZWQgd2l0aCBOZ1RlbXBsYXRlT3V0bGV0XG4gIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNDg0MlxuICBJbXBsZW1lbnRlZCB2aWEgdXBkYXRlRWxlbWVudHMgbWV0aG9kXG5cbiAgQENvbnRlbnRDaGlsZHJlbihEcmFnSGFuZGxlRGlyZWN0aXZlLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuICBoYW5kbGVzTGlzdDogUXVlcnlMaXN0PERyYWdIYW5kbGVEaXJlY3RpdmU+OyAqL1xuXG4gIGhhbmRsZXM6IGFueVtdID0gW107XG5cbiAgZ2V0IGhhc0hhbmRsZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmhhbmRsZXMubGVuZ3RoO1xuICB9XG5cbiAgQE91dHB1dCgpIGRyYWc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgZHJhZ0RlbGF5OiBudW1iZXIgPSAyMDA7IC8vIG1pbGxpc2Vjb25kc1xuICBkcmFnRGVsYXllZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgdG91Y2hUaW1lb3V0OiBhbnk7XG5cbiAgZ2V0IGVsZW1lbnQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgX2Ryb3Bab25lczogc3RyaW5nW107XG4gIF9wYXJlbnREcm9wem9uZXM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBkcmFrZXNTZXJ2aWNlOiBEcmFrZVN0b3JlU2VydmljZSxcbiAgICBwcml2YXRlIGRyb3BwYWJsZURpcmVjdGl2ZTogRHJvcHBhYmxlRGlyZWN0aXZlXG4gICkge31cblxuICAvLyBGcm9tOiBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYS9pc3N1ZXMvMjg5I2lzc3VlY29tbWVudC0yNzcxNDMxNzJcbiAgQEhvc3RMaXN0ZW5lcigndG91Y2htb3ZlJywgWyckZXZlbnQnXSlcbiAgb25Nb3ZlKGU6IEV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9tb3ZlcyB8fCB0aGlzLmRyYWdEZWxheWVkKSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudG91Y2hUaW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd0b3VjaHN0YXJ0JylcbiAgb25Eb3duKCkge1xuICAgIGlmICh0aGlzLl9tb3Zlcykge1xuICAgICAgdGhpcy50b3VjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5kcmFnRGVsYXllZCA9IGZhbHNlO1xuICAgICAgfSwgdGhpcy5kcmFnRGVsYXkpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNoZW5kJylcbiAgb25VcCgpIHtcbiAgICBpZiAodGhpcy5fbW92ZXMpIHtcbiAgICAgIGNsZWFyVGltZW91dCg8bnVtYmVyPnRoaXMudG91Y2hUaW1lb3V0KTtcbiAgICAgIHRoaXMuZHJhZ0RlbGF5ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fcGFyZW50RHJvcHpvbmVzID0gW3RoaXMuZHJvcHBhYmxlRGlyZWN0aXZlLmRyb3Bab25lXTtcbiAgICB0aGlzLmRyYWtlc1NlcnZpY2UucmVnaXN0ZXJEcmFnZ2FibGUodGhpcyk7XG4gICAgdGhpcy51cGRhdGVFbGVtZW50cygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kcmFrZXNTZXJ2aWNlLnJlbW92ZURyYWdnYWJsZSh0aGlzKTtcbiAgfVxuXG4gIHVwZGF0ZUVsZW1lbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgaGFuZGxlczogTm9kZUxpc3QgPSBuYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuZ3hkcmFnaGFuZGxlXScpO1xuICAgIHRoaXMuaGFuZGxlcyA9IEFycmF5LmZyb20oaGFuZGxlcykuZmlsdGVyKChoOiBhbnkpID0+IGZpbmRGaXJzdERyYWdnYWJsZVBhcmVudChoKSA9PT0gbmF0aXZlRWxlbWVudCk7XG5cbiAgICBmdW5jdGlvbiBmaW5kRmlyc3REcmFnZ2FibGVQYXJlbnQoYzogYW55KSB7XG4gICAgICB3aGlsZSAoYy5wYXJlbnROb2RlKSB7XG4gICAgICAgIGMgPSBjLnBhcmVudE5vZGU7XG4gICAgICAgIGlmIChjLmhhc0F0dHJpYnV0ZSAmJiBjLmhhc0F0dHJpYnV0ZSgnbmd4ZHJhZ2dhYmxlJykpIHtcbiAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNhbk1vdmUoc291cmNlPzogYW55LCBoYW5kbGU/OiBhbnksIHNpYmxpbmc/OiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuX21vdmVzID09PSAnYm9vbGVhbicpIHJldHVybiB0aGlzLl9tb3ZlcztcbiAgICBpZiAodHlwZW9mIHRoaXMuX21vdmVzID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdGhpcy5fbW92ZXModGhpcy5tb2RlbCwgc291cmNlLCBoYW5kbGUsIHNpYmxpbmcpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbW92ZXMoc291cmNlOiBhbnksIGhhbmRsZTogYW55LCBzaWJsaW5nOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuY2FuTW92ZShzb3VyY2UsIGhhbmRsZSwgc2libGluZykpIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB0aGlzLmhhc0hhbmRsZSA/IHRoaXMuaGFuZGxlcy5zb21lKGggPT4gaGFuZGVsRm9yKGhhbmRsZSwgaCkpIDogdHJ1ZTtcblxuICAgIGZ1bmN0aW9uIGhhbmRlbEZvcihjOiBhbnksIHA6IGFueSkge1xuICAgICAgaWYgKGMgPT09IHApIHJldHVybiB0cnVlO1xuICAgICAgd2hpbGUgKChjID0gYy5wYXJlbnROb2RlKSAmJiBjICE9PSBwKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgcmV0dXJuICEhYztcbiAgICB9XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVFbGVtZW50cygpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBZGRzIHByb3BlcnRpZXMgYW5kIGV2ZW50cyB0byBkcmFnIGhhbmRsZSBlbGVtZW50c1xuICpcbiAqIEBleHBvcnRcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25neERyYWdIYW5kbGVdJyB9KVxuZXhwb3J0IGNsYXNzIERyYWdIYW5kbGVEaXJlY3RpdmUge31cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ29udGVudENoaWxkLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERyb3BwYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvbmd4LWRyb3BwYWJsZS5kaXJlY3RpdmUnO1xuXG5sZXQgaSA9IDA7XG5mdW5jdGlvbiBnZXROZXh0SWQoKSB7XG4gIHJldHVybiBpKys7XG59XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgYWxsb3dzIG5lc3RlZCBuZ3hEcm9wcGFibGUgYW5kIG5neERyYWdnYWJsZXNcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1kbmQtY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2XG4gIG5neERyb3BwYWJsZVxuICBbZHJvcFpvbmVdPVwiZHJvcFpvbmVcIlxuICBbbW9kZWxdPVwibW9kZWxcIlxuICBbY29weV09XCJjb3B5XCJcbiAgW25nQ2xhc3NdPVwieyAnZ3UtZW1wdHknOiAhbW9kZWw/Lmxlbmd0aCB9XCJcbiAgW3JlbW92ZU9uU3BpbGxdPVwicmVtb3ZlT25TcGlsbFwiXG4gIGNsYXNzPSduZ3gtZG5kLWNvbnRhaW5lcic+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RlbFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbW9kZWxcIj5cbiAgICAgIDxuZ3gtZG5kLWl0ZW1cbiAgICAgICAgbmd4RHJhZ2dhYmxlXG4gICAgICAgIFttb2RlbF09XCJpdGVtXCJcbiAgICAgICAgW2Ryb3Bab25lXT1cImRyb3Bab25lXCJcbiAgICAgICAgW2Ryb3Bab25lc109XCJkcm9wWm9uZXNcIlxuICAgICAgICBbY29weV09XCJjb3B5XCJcbiAgICAgICAgW21vdmVzXT1cIm1vdmVzXCJcbiAgICAgICAgW3JlbW92ZU9uU3BpbGxdPVwicmVtb3ZlT25TcGlsbFwiXG4gICAgICAgIFtkcm9wcGFibGVJdGVtQ2xhc3NdPVwiZHJvcHBhYmxlSXRlbUNsYXNzXCI+XG4gICAgICA8L25neC1kbmQtaXRlbT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxuZy1jb250ZW50ICpuZ0lmPVwiIW1vZGVsXCI+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLm5neC1kbmQtY29udGFpbmVye2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuMik7Ym9yZGVyOjJweCBzb2xpZCByZWQ7bWFyZ2luOjEwcHg7cGFkZGluZzoxMHB4fS5uZ3gtZG5kLWNvbnRhaW5lci5ndS1lbXB0eXtib3JkZXI6MnB4IGRvdHRlZCByZWR9Lm5neC1kbmQtY29udGFpbmVyOm50aC1jaGlsZChvZGQpe2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMil9Lm5neC1kbmQtY29udGFpbmVyIC5leC1tb3ZlZHtiYWNrZ3JvdW5kLWNvbG9yOiNlNzRjM2N9Lm5neC1kbmQtY29udGFpbmVyIC5leC1vdmVye2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuMyl9Lm5neC1kbmQtY29udGFpbmVyIC5oYW5kbGV7cGFkZGluZzowIDVweDttYXJnaW4tcmlnaHQ6NXB4O2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNCk7Y3Vyc29yOm1vdmV9Lm5vLXNlbGVjdHstd2Via2l0LXRvdWNoLWNhbGxvdXQ6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgbW9kZWw6IGFueTtcbiAgQElucHV0KCkgY29weSA9IGZhbHNlO1xuICBASW5wdXQoKSByZW1vdmVPblNwaWxsID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRyb3BwYWJsZUl0ZW1DbGFzczogc3RyaW5nIHwgKChvOiBhbnkpID0+IGFueSk7XG5cbiAgQElucHV0KCkgZHJvcFpvbmUgPSBgQEBEZWZhdWx0RHJvcFpvbmUtJHtnZXROZXh0SWQoKX1AQGA7XG5cbiAgQElucHV0KClcbiAgZ2V0IGRyb3Bab25lcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcFpvbmVzIHx8IHRoaXMuX2RlZmF1bHRab25lcztcbiAgfVxuICBzZXQgZHJvcFpvbmVzKHZhbCkge1xuICAgIHRoaXMuX2Ryb3Bab25lcyA9IHZhbDtcbiAgfVxuXG4gIEBJbnB1dCgpIG1vdmVzOiAobW9kZWw6IGFueSwgc291cmNlOiBhbnksIGhhbmRsZTogYW55LCBzaWJsaW5nOiBhbnkpID0+IGJvb2xlYW47XG5cbiAgLy8gQElucHV0KCkgY2xhc3NlczogYW55ID0ge307XG4gIC8vIEBJbnB1dCgpIGRyYWd1bGFPcHRpb25zOiBhbnk7XG5cbiAgQElucHV0KClcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZilcbiAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KClcbiAgQFZpZXdDaGlsZChEcm9wcGFibGVEaXJlY3RpdmUpXG4gIGRyb3BwYWJsZTogYW55O1xuXG4gIEBPdXRwdXQoKSBkcm9wOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBkcmFnOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvdmVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvdXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgY2FuY2VsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIF9kcm9wWm9uZXM6IHN0cmluZ1tdO1xuICBfZGVmYXVsdFpvbmVzOiBzdHJpbmdbXTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9kZWZhdWx0Wm9uZXMgPSBbdGhpcy5kcm9wWm9uZV07XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kcm9wcGFibGUuZHJhZy5zdWJzY3JpYmUoKHY6IGFueSkgPT4gdGhpcy5kcmFnLmVtaXQodikpO1xuICAgIHRoaXMuZHJvcHBhYmxlLmRyb3Auc3Vic2NyaWJlKCh2OiBhbnkpID0+IHRoaXMuZHJvcC5lbWl0KHYpKTtcbiAgICB0aGlzLmRyb3BwYWJsZS5vdmVyLnN1YnNjcmliZSgodjogYW55KSA9PiB0aGlzLm92ZXIuZW1pdCh2KSk7XG4gICAgdGhpcy5kcm9wcGFibGUub3V0LnN1YnNjcmliZSgodjogYW55KSA9PiB0aGlzLm91dC5lbWl0KHYpKTtcbiAgICB0aGlzLmRyb3BwYWJsZS5yZW1vdmUuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHRoaXMucmVtb3ZlLmVtaXQodikpO1xuICAgIHRoaXMuZHJvcHBhYmxlLmNhbmNlbC5zdWJzY3JpYmUoKHY6IGFueSkgPT4gdGhpcy5jYW5jZWwuZW1pdCh2KSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24sIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4uL2NvbnRhaW5lci9jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERyYWdnYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvbmd4LWRyYWdnYWJsZS5kaXJlY3RpdmUnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGFsbG93cyBuZXN0ZWQgbmd4RHJvcHBhYmxlIGFuZCBuZ3hEcmFnZ2FibGVzXG4gKiBTaG91bGQgb25seSBiZSB1c2UgaW5zaWRlIGEgbmd4LWRuZC1jb250YWluZXJcbiAqIE91dHNpZGUgYSBuZ3gtZG5kLWNvbnRhaW5lciB1c2Ugbmd4RHJvcHBhYmxlXG4gKlxuICogQGV4cG9ydFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZG5kLWl0ZW0nLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInR5cGVcIj5cblxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInYXJyYXknXCI+XG4gICAgPG5neC1kbmQtY29udGFpbmVyXG4gICAgICBbbW9kZWxdPVwibW9kZWxcIlxuICAgICAgW3RlbXBsYXRlXT1cImNvbnRhaW5lci50ZW1wbGF0ZVwiXG4gICAgICBbZHJvcFpvbmVdPVwiZHJvcFpvbmVcIlxuICAgICAgW2Ryb3Bab25lc109XCJkcm9wWm9uZXNcIlxuICAgICAgW3JlbW92ZU9uU3BpbGxdPVwicmVtb3ZlT25TcGlsbFwiXG4gICAgICBbZHJvcHBhYmxlSXRlbUNsYXNzXT1cImRyb3BwYWJsZUl0ZW1DbGFzc1wiXG4gICAgICBbY29weV09XCJjb3B5XCI+XG4gICAgPC9uZ3gtZG5kLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ29iamVjdCdcIj5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICpuZ0lmPVwiY29udGFpbmVyLnRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRhaW5lci50ZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiZGF0YVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjb250YWluZXIudGVtcGxhdGVcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJuZ3gtZG5kLWNvbnRlbnRcIj5cbiAgICAgICAge3ttb2RlbC5sYWJlbH19XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZ3gtZG5kLWNvbnRhaW5lclxuICAgICAgICAqbmdJZj1cIm1vZGVsLmNoaWxkcmVuXCJcbiAgICAgICAgW21vZGVsXT1cIm1vZGVsLmNoaWxkcmVuXCJcbiAgICAgICAgW3RlbXBsYXRlXT1cImNvbnRhaW5lci50ZW1wbGF0ZVwiXG4gICAgICAgIFtkcm9wWm9uZV09XCJkcm9wWm9uZVwiXG4gICAgICAgIFtkcm9wWm9uZXNdPVwiZHJvcFpvbmVzXCJcbiAgICAgICAgW3JlbW92ZU9uU3BpbGxdPVwicmVtb3ZlT25TcGlsbFwiXG4gICAgICAgIFtkcm9wcGFibGVJdGVtQ2xhc3NdPVwiZHJvcHBhYmxlSXRlbUNsYXNzXCJcbiAgICAgICAgW2NvcHldPVwiY29weVwiPlxuICAgICAgPC9uZ3gtZG5kLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ3VuZGVmaW5lZCdcIj5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hEZWZhdWx0PlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgKm5nSWY9XCJjb250YWluZXIudGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGFpbmVyLnRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJkYXRhXCI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8ZGl2XG4gICAgICAqbmdJZj1cIiFjb250YWluZXIudGVtcGxhdGVcIlxuICAgICAgY2xhc3M9XCJuZ3gtZG5kLWNvbnRlbnRcIj5cbiAgICAgIHt7bW9kZWx9fVxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cblxuPC9uZy1jb250YWluZXI+XG5cblxuXG5cblxuXG5cbmAsXG4gIHN0eWxlczogW2Aubmd4LWRuZC1pdGVte21hcmdpbjoxMHB4O3BhZGRpbmc6MTBweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjIpO3RyYW5zaXRpb246b3BhY2l0eSAuNHMgZWFzZS1pbi1vdXQ7Ym9yZGVyOjFweCBzb2xpZCAjYWRkOGU2O2Rpc3BsYXk6YmxvY2t9Lm5neC1kbmQtaXRlbS5oYXMtaGFuZGxlIFtuZ3hEcmFnSGFuZGxlXSwubmd4LWRuZC1pdGVtLmhhcy1oYW5kbGUgW25neGRyYWdoYW5kbGVdLC5uZ3gtZG5kLWl0ZW06bm90KC5oYXMtaGFuZGxlKTpub3QoLm1vdmUtZGlzYWJsZWQpe2N1cnNvcjptb3ZlO2N1cnNvcjpncmFiO2N1cnNvcjotd2Via2l0LWdyYWJ9Lm5neC1kbmQtaXRlbSAubmd4LWRuZC1jb250ZW50ey13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0ubmd4LWRuZC1pdGVtOmhvdmVye2JvcmRlcjoxcHggc29saWQgIzAwZn0uZ3UtbWlycm9ye3Bvc2l0aW9uOmZpeGVkIWltcG9ydGFudDttYXJnaW46MCFpbXBvcnRhbnQ7ei1pbmRleDo5OTk5IWltcG9ydGFudDtvcGFjaXR5Oi44fS5ndS1oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Lmd1LXVuc2VsZWN0YWJsZXstd2Via2l0LXVzZXItc2VsZWN0Om5vbmUhaW1wb3J0YW50Oy1tb3otdXNlci1zZWxlY3Q6bm9uZSFpbXBvcnRhbnQ7LW1zLXVzZXItc2VsZWN0Om5vbmUhaW1wb3J0YW50O3VzZXItc2VsZWN0Om5vbmUhaW1wb3J0YW50fS5ndS10cmFuc2l0e29wYWNpdHk6LjJ9YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG1vZGVsOiBhbnk7XG5cbiAgQElucHV0KClcbiAgZ2V0IGRyb3Bab25lKCkge1xuICAgIHJldHVybiB0aGlzLl9kcm9wWm9uZSB8fCB0aGlzLmNvbnRhaW5lci5kcm9wWm9uZTtcbiAgfVxuICBzZXQgZHJvcFpvbmUodmFsKSB7XG4gICAgdGhpcy5fZHJvcFpvbmUgPSB2YWw7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgZHJvcFpvbmVzKCkge1xuICAgIHJldHVybiB0aGlzLl9kcm9wWm9uZXMgfHwgdGhpcy5jb250YWluZXIuZHJvcFpvbmVzO1xuICB9XG4gIHNldCBkcm9wWm9uZXModmFsKSB7XG4gICAgdGhpcy5fZHJvcFpvbmVzID0gdmFsO1xuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IGRyb3BwYWJsZUl0ZW1DbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcHBhYmxlSXRlbUNsYXNzIHx8IHRoaXMuY29udGFpbmVyLmRyb3BwYWJsZUl0ZW1DbGFzcztcbiAgfVxuICBzZXQgZHJvcHBhYmxlSXRlbUNsYXNzKHZhbCkge1xuICAgIHRoaXMuX2Ryb3BwYWJsZUl0ZW1DbGFzcyA9IHZhbDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCByZW1vdmVPblNwaWxsKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy5fcmVtb3ZlT25TcGlsbCA9PT0gJ2Jvb2xlYW4nID8gdGhpcy5fcmVtb3ZlT25TcGlsbCA6IHRoaXMuY29udGFpbmVyLnJlbW92ZU9uU3BpbGw7XG4gIH1cbiAgc2V0IHJlbW92ZU9uU3BpbGwodmFsKSB7XG4gICAgdGhpcy5fcmVtb3ZlT25TcGlsbCA9IHZhbDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBjb3B5KCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy5fY29weSA9PT0gJ2Jvb2xlYW4nID8gdGhpcy5fY29weSA6IHRoaXMuY29udGFpbmVyLmNvcHk7XG4gIH1cbiAgc2V0IGNvcHkodmFsKSB7XG4gICAgdGhpcy5fY29weSA9IHZhbDtcbiAgfVxuXG4gIF9jb3B5ID0gZmFsc2U7XG4gIF9kcm9wWm9uZTogYW55O1xuICBfZHJvcFpvbmVzOiBhbnk7XG4gIF9kcm9wcGFibGVJdGVtQ2xhc3M6IGFueTtcbiAgX3JlbW92ZU9uU3BpbGwgPSBmYWxzZTtcbiAgZGF0YTogYW55O1xuXG4gIGdldCBoYXNIYW5kbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlRGlyZWN0aXZlLmhhc0hhbmRsZTtcbiAgfVxuXG4gIGdldCBtb3ZlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmRyYWdnYWJsZURpcmVjdGl2ZS5jYW5Nb3ZlKCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGNsYXNzU3RyaW5nKCkge1xuICAgIGNvbnN0IGl0ZW1DbGFzcyA9XG4gICAgICB0eXBlb2YgdGhpcy5kcm9wcGFibGVJdGVtQ2xhc3MgPT09ICdmdW5jdGlvbicgPyB0aGlzLmRyb3BwYWJsZUl0ZW1DbGFzcyh0aGlzLm1vZGVsKSA6IHRoaXMuZHJvcHBhYmxlSXRlbUNsYXNzO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IFsnbmd4LWRuZC1pdGVtJywgaXRlbUNsYXNzIHx8ICcnXTtcbiAgICBpZiAodGhpcy5tb3ZlRGlzYWJsZWQpIHtcbiAgICAgIGNsYXNzZXMucHVzaCgnbW92ZS1kaXNhYmxlZCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5oYXNIYW5kbGUpIHtcbiAgICAgIGNsYXNzZXMucHVzaCgnaGFzLWhhbmRsZScpO1xuICAgIH1cbiAgICByZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLm1vZGVsKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgdGhpcy5tb2RlbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250YWluZXI6IENvbnRhaW5lckNvbXBvbmVudCwgcHVibGljIGRyYWdnYWJsZURpcmVjdGl2ZTogRHJhZ2dhYmxlRGlyZWN0aXZlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGF0YSA9IHtcbiAgICAgIG1vZGVsOiB0aGlzLm1vZGVsLFxuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgZHJvcFpvbmU6IHRoaXMuZHJvcFpvbmUsXG4gICAgICB0ZW1wbGF0ZTogdGhpcy5jb250YWluZXIudGVtcGxhdGVcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgRHJhZ2dhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25neC1kcmFnZ2FibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERyb3BwYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtZHJvcHBhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFnSGFuZGxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25neC1kcmFnLWhhbmRsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbnRhaW5lci9jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaXRlbS9pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEcmFrZVN0b3JlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZHJha2Utc3RvcmUuc2VydmljZSc7XG5cbmNvbnN0IGNvbXBvbmVudHMgPSBbQ29udGFpbmVyQ29tcG9uZW50LCBJdGVtQ29tcG9uZW50XTtcbmNvbnN0IGRpcmVjdGl2ZXMgPSBbRHJhZ2dhYmxlRGlyZWN0aXZlLCBEcm9wcGFibGVEaXJlY3RpdmUsIERyYWdIYW5kbGVEaXJlY3RpdmVdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4uY29tcG9uZW50cywgLi4uZGlyZWN0aXZlc10sXG4gIGV4cG9ydHM6IFsuLi5jb21wb25lbnRzLCAuLi5kaXJlY3RpdmVzXSxcbiAgcHJvdmlkZXJzOiBbRHJha2VTdG9yZVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5neERuRE1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbImkiLCJnZXROZXh0SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBT0EscUJBQU0sT0FBTyxHQUFHLGdCQUFnQixDQUFDOzs7Ozs7O0lBYy9COzRCQUx1QixJQUFJLE9BQU8sRUFBMkI7NEJBQ3RDLElBQUksT0FBTyxFQUEyQjtRQUszRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3ZCOzs7OztJQUVELG9DQUFROzs7O0lBQVIsVUFBUyxTQUE2QjtRQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDakQ7Ozs7O0lBRUQsa0NBQU07Ozs7SUFBTixVQUFPLFNBQTZCO1FBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxxQkFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvRCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdEM7S0FDRjs7Ozs7SUFFRCw2Q0FBaUI7Ozs7SUFBakIsVUFBa0IsU0FBNkI7UUFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztLQUNyRDs7Ozs7SUFFRCwyQ0FBZTs7OztJQUFmLFVBQWdCLFNBQTZCO1FBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUM3Qzs7OztJQUVELDhDQUFrQjs7O0lBQWxCO1FBQUEsaUJBOEJDO1FBN0JDLHFCQUFNLE9BQU8sR0FBRyxVQUFDLEVBQU8sRUFBRSxNQUFXO1lBQ25DLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDdkIsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUNELHFCQUFNLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25ELHFCQUFNLGVBQWUsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0RCxJQUFJLGdCQUFnQixJQUFJLGVBQWUsRUFBRTtnQkFDdkMsT0FBTyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN0RTtZQUNELE9BQU8sSUFBSSxDQUFDO1NBQ2IsQ0FBQztRQUVGLHFCQUFNLElBQUksR0FBRyxVQUFDLENBQU0sRUFBRSxNQUFXO1lBQy9CLHFCQUFNLGVBQWUsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0RCxJQUFJLGVBQWUsRUFBRTtnQkFDbkIsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDO2FBQzdCO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FDZCxDQUFDO1FBRUYscUJBQU0sS0FBSyxHQUFHLFVBQUMsRUFBUSxFQUFFLE1BQVksRUFBRSxNQUFZLEVBQUUsT0FBYTtZQUNoRSxxQkFBTSxnQkFBZ0IsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuRCxJQUFJLGdCQUFnQixFQUFFO2dCQUNwQixPQUFPLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3hEO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDYixDQUFDO1FBRUYsT0FBTyxFQUFFLE9BQU8sU0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLEtBQUssT0FBQSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDO0tBQzdFOzs7O0lBRUQsMENBQWM7OztJQUFkO1FBQUEsaUJBcUtDO1FBcEtDLHFCQUFJLE9BQVksQ0FBQztRQUNqQixxQkFBSSxXQUFnQixDQUFDO1FBRXJCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEVBQU8sRUFBRSxNQUFXO1lBQ3pDLFdBQVcsR0FBRyxTQUFTLENBQUM7WUFDeEIsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUViLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xCLE9BQU87YUFDUjtZQUVELElBQUksS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQzdCLHFCQUFNLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRCxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO2dCQUVyQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUN6QixJQUFJLEVBQUUsTUFBTTtvQkFDWixFQUFFLElBQUE7b0JBQ0YsTUFBTSxRQUFBO29CQUNOLEtBQUssRUFBRSxXQUFXO2lCQUNuQixDQUFDLENBQUM7YUFDSjtZQUVELElBQUksS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2pDLHFCQUFNLGVBQWUsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEQsS0FBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQztnQkFFbEUsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLElBQUksRUFBRSxNQUFNO29CQUNaLEVBQUUsSUFBQTtvQkFDRixNQUFNLFFBQUE7b0JBQ04sZUFBZSxpQkFBQTtvQkFDZixLQUFLLEVBQUUsV0FBVztpQkFDbkIsQ0FBQyxDQUFDO2FBQ0o7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxFQUFPLEVBQUUsTUFBVyxFQUFFLE1BQVc7WUFDdEQscUJBQU0sZUFBZSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXRELElBQUksQ0FBQyxlQUFlLEVBQUU7O2dCQUVwQixPQUFPO2FBQ1I7WUFFRCxxQkFBSSxZQUFZLEdBQUcsV0FBVyxDQUFDO1lBQy9CLHFCQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVwRSxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7OztnQkFFakIsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLE9BQU87YUFDUjtZQUVELHFCQUFNLGVBQWUsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV0RCxJQUFJLGVBQWUsRUFBRTtnQkFDbkIscUJBQU0sV0FBVyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUM7Z0JBQzFDLHFCQUFNLFdBQVcsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDO2dCQUUxQyxxQkFBTSxZQUFZLEdBQUcsQ0FBQyxFQUFFLFdBQVcsSUFBSSxXQUFXLENBQUMsQ0FBQztnQkFDcEQscUJBQU0sU0FBUyxHQUFHLFlBQVksR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN2RSxJQUFJLFlBQVksSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFOzs7b0JBRWpDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN4QixPQUFPO2lCQUNSO2dCQUVELElBQUksV0FBVyxFQUFFO29CQUNmLHFCQUFNLE9BQU8sR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksV0FBVyxJQUFJLE1BQU0sS0FBSyxNQUFNLENBQUM7b0JBQ25FLHFCQUFNLElBQUksR0FBRyxDQUFDLFdBQVcsSUFBSSxPQUFPLEtBQUssRUFBRSxDQUFDO29CQUM1QyxJQUFJLE9BQU8sRUFBRTt3QkFDWCxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDdkU7eUJBQU07d0JBQ0wsSUFBSSxFQUFFLENBQUMsVUFBVSxLQUFLLE1BQU0sRUFBRTs0QkFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQzt5QkFDeEI7d0JBRUQsSUFBSSxJQUFJLEVBQUU7NEJBQ1IsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO3lCQUN6RDs2QkFBTTs0QkFDTCxJQUFJLEVBQUUsQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFFOzs7Z0NBRTVCLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzZCQUN6Qjs0QkFDRCxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDbEM7d0JBQ0QsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO3FCQUNoRDtpQkFDRjthQUNGO1lBRUQsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksRUFBRSxNQUFNO2dCQUNaLEVBQUUsSUFBQTtnQkFDRixNQUFNLFFBQUE7Z0JBQ04sS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLFNBQVMsV0FBQTthQUNWLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLEVBQU8sRUFBRSxTQUFjLEVBQUUsTUFBVztZQUMzRCxJQUFJLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNqQyxxQkFBTSxlQUFlLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RELHFCQUFNLFdBQVcsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDO2dCQUUxQyxxQkFBTSxTQUFTLEdBQUcsV0FBVyxJQUFJLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUVyRixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDbEIsSUFBSSxFQUFFLENBQUMsVUFBVSxLQUFLLE1BQU0sRUFBRTs7d0JBRTVCLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQ3hCO29CQUNELFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNsQztnQkFFRCxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDMUIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsRUFBRSxJQUFBO29CQUNGLFNBQVMsV0FBQTtvQkFDVCxNQUFNLFFBQUE7b0JBQ04sS0FBSyxFQUFFLFdBQVc7aUJBQ25CLENBQUMsQ0FBQzthQUNKO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUMsRUFBTyxFQUFFLFNBQWMsRUFBRSxNQUFXO1lBQzNELElBQUksS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3BDLHFCQUFNLGtCQUFrQixHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM1RCxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUM3QixJQUFJLEVBQUUsUUFBUTtvQkFDZCxFQUFFLElBQUE7b0JBQ0YsU0FBUyxXQUFBO29CQUNULE1BQU0sUUFBQTtvQkFDTixLQUFLLEVBQUUsV0FBVztpQkFDbkIsQ0FBQyxDQUFDO2FBQ0o7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxFQUFPLEVBQUUsU0FBYyxFQUFFLE1BQVc7WUFDekQsSUFBSSxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDcEMscUJBQU0sa0JBQWtCLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVELGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQzNCLElBQUksRUFBRSxNQUFNO29CQUNaLEVBQUUsSUFBQTtvQkFDRixTQUFTLFdBQUE7b0JBQ1QsTUFBTSxRQUFBO29CQUNOLEtBQUssRUFBRSxXQUFXO2lCQUNuQixDQUFDLENBQUM7YUFDSjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxVQUFDLEVBQU8sRUFBRSxTQUFjLEVBQUUsTUFBVztZQUN4RCxJQUFJLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNwQyxxQkFBTSxrQkFBa0IsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUQsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDMUIsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsRUFBRSxJQUFBO29CQUNGLFNBQVMsV0FBQTtvQkFDVCxNQUFNLFFBQUE7b0JBQ04sS0FBSyxFQUFFLFdBQVc7aUJBQ25CLENBQUMsQ0FBQzthQUNKO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7O2dCQXZPRixVQUFVOzs7OzRCQWRYOzs7Ozs7O0FDQUEsQUFjQSxxQkFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDOzs7O0FBQ2Q7SUFDRSxPQUFPLENBQUMsRUFBRSxDQUFDO0NBQ1o7Ozs7Ozs7SUF5Q0MsNEJBQW9CLEVBQWMsRUFBVSxRQUFtQixFQUFVLGFBQWdDO1FBQXJGLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQW1CO29CQS9CekYsS0FBSzs2QkFDSSxLQUFLO29CQUdNLElBQUksWUFBWSxFQUFPO29CQUV2QixJQUFJLFlBQVksRUFBTztvQkFFdkIsSUFBSSxZQUFZLEVBQU87bUJBRXhCLElBQUksWUFBWSxFQUFPO3NCQUVwQixJQUFJLFlBQVksRUFBTztzQkFFdkIsSUFBSSxZQUFZLEVBQU87S0FpQmdEO0lBZjdHLHNCQUFJLHlDQUFTOzs7O1FBQWI7WUFDRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQzlCOzs7T0FBQTswQkFHRyx3Q0FBUTs7Ozs7WUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDOzs7Ozs7UUFFakUsVUFBYSxHQUFXO1lBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1NBQ3RCOzs7Ozs7O0lBT0QscUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyx1QkFBcUIsU0FBUyxFQUFFLE9BQUksQ0FBQztRQUN4RCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNuQzs7OztJQUVELDRDQUFlOzs7SUFBZjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNuRCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztZQUNqQixLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3RELENBQUMsQ0FBQztLQUNKOzs7O0lBRUQsd0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakM7O2dCQXBERixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7Ozs7Z0JBakJ2QyxVQUFVO2dCQUVWLFNBQVM7Z0JBR0YsaUJBQWlCOzs7MEJBY3ZCLEtBQUs7eUJBQ0wsS0FBSztrQ0FDTCxLQUFLO2lDQUNMLEtBQUs7eUJBRUwsTUFBTTt5QkFFTixNQUFNO3lCQUVOLE1BQU07d0JBRU4sTUFBTTsyQkFFTixNQUFNOzJCQUVOLE1BQU07NkJBTU4sS0FBSzs7NkJBL0NSOzs7Ozs7O0FDQUE7Ozs7OztJQXFERSw0QkFDVSxJQUNBLGVBQ0E7UUFGQSxPQUFFLEdBQUYsRUFBRTtRQUNGLGtCQUFhLEdBQWIsYUFBYTtRQUNiLHVCQUFrQixHQUFsQixrQkFBa0I7c0JBakNrQyxJQUFJOzs7Ozs7Ozt1QkFVakQsRUFBRTtvQkFNaUIsSUFBSSxZQUFZLEVBQU87eUJBRXZDLEdBQUc7MkJBQ0EsSUFBSTtLQWV2QjswQkF6Q0EseUNBQVM7Ozs7O1lBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDOzs7Ozs7UUFFdkUsVUFBYyxHQUFRO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1NBQ3ZCOzs7O0lBY0Qsc0JBQUkseUNBQVM7Ozs7UUFBYjtZQUNFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1NBQzlCOzs7T0FBQTtJQVNELHNCQUFJLHVDQUFPOzs7O1FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQzlCOzs7T0FBQTs7Ozs7SUFhRCxtQ0FBTTs7OztjQUFDLENBQVE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNwQixZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2pDOzs7OztJQUlILG1DQUFNOzs7OztRQUNKLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDO2dCQUM3QixLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzthQUMxQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNwQjs7Ozs7SUFJSCxpQ0FBSTs7OztRQUNGLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLFlBQVksbUJBQVMsSUFBSSxDQUFDLFlBQVksRUFBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3pCOzs7OztJQUdILHFDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNmOzs7O0lBRUQsbUNBQU07OztJQUFOO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3ZCOzs7O0lBRUQsd0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUM7Ozs7SUFFRCwyQ0FBYzs7O0lBQWQ7UUFDRSxxQkFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDNUMscUJBQU0sT0FBTyxHQUFhLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFNLElBQUssT0FBQSx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxhQUFhLEdBQUEsQ0FBQyxDQUFDOzs7OztRQUVyRyxrQ0FBa0MsQ0FBTTtZQUN0QyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO2dCQUNqQixJQUFJLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsRUFBRTtvQkFDcEQsT0FBTyxDQUFDLENBQUM7aUJBQ1Y7YUFDRjtTQUNGO0tBQ0Y7Ozs7Ozs7SUFFRCxvQ0FBTzs7Ozs7O0lBQVAsVUFBUSxNQUFZLEVBQUUsTUFBWSxFQUFFLE9BQWE7UUFDL0MsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUztZQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6RCxJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVO1lBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMvRixPQUFPLElBQUksQ0FBQztLQUNiOzs7Ozs7O0lBRUQsa0NBQUs7Ozs7OztJQUFMLFVBQU0sTUFBVyxFQUFFLE1BQVcsRUFBRSxPQUFZO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFekQsT0FBTyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBQSxDQUFDLEdBQUcsSUFBSSxDQUFDOzs7Ozs7UUFFNUUsbUJBQW1CLENBQU0sRUFBRSxDQUFNO1lBQy9CLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDekIsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUFDLENBQUM7WUFDdEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ1o7S0FDRjs7OztJQUVELHNDQUFTOzs7SUFBVDtRQUNFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7Z0JBNUhGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTs7OztnQkFWckIsVUFBVTtnQkFHckIsaUJBQWlCO2dCQURqQixrQkFBa0I7OztpQ0FVeEIsS0FBSzswQkFDTCxLQUFLOzhCQUVMLEtBQUs7MkJBUUwsS0FBSyxTQUFDLE9BQU87eUJBZ0JiLE1BQU07MkJBcUJOLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7MkJBUXBDLFlBQVksU0FBQyxZQUFZO3lCQVN6QixZQUFZLFNBQUMsVUFBVTs7NkJBN0UxQjs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Z0JBT0MsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFOzs4QkFQMUM7Ozs7Ozs7QUNBQSxBQWVBLHFCQUFJQSxHQUFDLEdBQUcsQ0FBQyxDQUFDOzs7O0FBQ1Y7SUFDRSxPQUFPQSxHQUFDLEVBQUUsQ0FBQztDQUNaOzs7Ozs7OztvQkF1Q2lCLEtBQUs7NkJBQ0ksS0FBSzt3QkFHVix1QkFBcUJDLFdBQVMsRUFBRSxPQUFJO29CQXVCcEIsSUFBSSxZQUFZLEVBQU87b0JBRXZCLElBQUksWUFBWSxFQUFPO29CQUV2QixJQUFJLFlBQVksRUFBTzttQkFFeEIsSUFBSSxZQUFZLEVBQU87c0JBRXBCLElBQUksWUFBWSxFQUFPO3NCQUV2QixJQUFJLFlBQVksRUFBTzs7MEJBOUJ6RCx5Q0FBUzs7Ozs7WUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQzs7Ozs7O1FBRS9DLFVBQWMsR0FBRztZQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1NBQ3ZCOzs7Ozs7O0lBOEJELHFDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDdEM7Ozs7SUFFRCw0Q0FBZTs7O0lBQWY7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFDLENBQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFBLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFNLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBQSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUEsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFDLENBQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFBLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFNLElBQUssT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBQSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUEsQ0FBQyxDQUFDO0tBQ2xFOztnQkFyRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxvckJBd0JYO29CQUNDLE1BQU0sRUFBRSxDQUFDLHNqQkFBc2pCLENBQUM7b0JBQ2hrQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDdEM7Ozs7MEJBRUUsS0FBSzt5QkFDTCxLQUFLO2tDQUNMLEtBQUs7dUNBQ0wsS0FBSzs2QkFFTCxLQUFLOzhCQUVMLEtBQUs7MEJBUUwsS0FBSzs2QkFLTCxLQUFLLFlBQ0wsWUFBWSxTQUFDLFdBQVc7OEJBR3hCLEtBQUssWUFDTCxTQUFTLFNBQUMsa0JBQWtCO3lCQUc1QixNQUFNO3lCQUVOLE1BQU07eUJBRU4sTUFBTTt3QkFFTixNQUFNOzJCQUVOLE1BQU07MkJBRU4sTUFBTTs7NkJBOUZUOzs7Ozs7O0FDQUE7Ozs7Ozs7O0lBZ0tFLHVCQUFtQixTQUE2QixFQUFTLGtCQUFzQztRQUE1RSxjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQUFTLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7cUJBckN2RixLQUFLOzhCQUlJLEtBQUs7S0FpQzZFOzBCQTVFL0YsbUNBQVE7Ozs7O1lBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDOzs7Ozs7UUFFbkQsVUFBYSxHQUFHO1lBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7U0FDdEI7Ozs7MEJBR0csb0NBQVM7Ozs7O1lBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDOzs7Ozs7UUFFckQsVUFBYyxHQUFHO1lBQ2YsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7U0FDdkI7Ozs7MEJBR0csNkNBQWtCOzs7OztZQUNwQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDOzs7Ozs7UUFFdkUsVUFBdUIsR0FBRztZQUN4QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDO1NBQ2hDOzs7OzBCQUdHLHdDQUFhOzs7OztZQUNmLE9BQU8sT0FBTyxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDOzs7Ozs7UUFFdkcsVUFBa0IsR0FBRztZQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQztTQUMzQjs7OzswQkFHRywrQkFBSTs7Ozs7WUFDTixPQUFPLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzs7Ozs7O1FBRTVFLFVBQVMsR0FBRztZQUNWLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1NBQ2xCOzs7O0lBU0Qsc0JBQUksb0NBQVM7Ozs7UUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztTQUMxQzs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBWTs7OztRQUFoQjtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDM0M7OztPQUFBOzBCQUdHLHNDQUFXOzs7OztZQUNiLHFCQUFNLFNBQVMsR0FDYixPQUFPLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7WUFFaEgscUJBQU0sT0FBTyxHQUFHLENBQUMsY0FBYyxFQUFFLFNBQVMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNsRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDL0I7WUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDNUI7WUFDRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7O0lBRzNCLHNCQUFJLCtCQUFJOzs7O1FBQVI7WUFDRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM3QixPQUFPLE9BQU8sQ0FBQzthQUNoQjtZQUNELE9BQU8sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzFCOzs7T0FBQTs7OztJQUlELGdDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDVixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVE7U0FDbEMsQ0FBQztLQUNIOztnQkE3SkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUsNGlEQThEWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxnd0JBQWd3QixDQUFDO29CQUMxd0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3RDOzs7O2dCQTdFUSxrQkFBa0I7Z0JBQ2xCLGtCQUFrQjs7OzBCQThFeEIsS0FBSzs2QkFFTCxLQUFLOzhCQVFMLEtBQUs7dUNBUUwsS0FBSztrQ0FRTCxLQUFLO3lCQVFMLEtBQUs7Z0NBdUJMLFdBQVcsU0FBQyxPQUFPOzt3QkExSXRCOzs7Ozs7O0FDVUEscUJBQU0sVUFBVSxHQUFHLENBQUMsa0JBQWtCLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDdkQscUJBQU0sVUFBVSxHQUFHLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzs7Ozs7Z0JBRWhGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksV0FBTSxVQUFVLEVBQUssVUFBVSxDQUFDO29CQUM1QyxPQUFPLFdBQU0sVUFBVSxFQUFLLFVBQVUsQ0FBQztvQkFDdkMsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7aUJBQy9COzt1QkFsQkQ7Ozs7Ozs7Ozs7Ozs7OzsifQ==

/***/ }),

/***/ "./projects/swimlane/ngx-dnd/package.json":
/*!************************************************!*\
  !*** ./projects/swimlane/ngx-dnd/package.json ***!
  \************************************************/
/*! exports provided: name, description, version, peerDependencies, default */
/***/ (function(module) {

module.exports = {"name":"@swimlane/ngx-dnd","description":"Drag and Drop for Angular2 and beyond!","version":"5.0.1","peerDependencies":{"@angular/common":"^6.0.0-rc.0 || ^6.0.0","@angular/core":"^6.0.0-rc.0 || ^6.0.0","@swimlane/dragula":"^3.7.3","@types/dragula":"^2.1.33"}};

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-toolbar [title]=\"'ngx-dnd: Drag, Drop and Sorting Library for Angular2 and beyond!'\" [subtitle]=\"'v' + version\" class=\"main-toolbar\">\n  <ngx-toolbar-content>\n    <a href=\"https://github.com/swimlane/ngx-dnd\" target=\"_blank\">Github</a>\n  </ngx-toolbar-content>\n</ngx-toolbar>\n\n<main fxLayout=\"row nowrap\" fxFill>\n  <!-- div class=\"nav-col\" fxFlex=\"20%\">\n    <h1>\n      Ngx-<strong>dnd</strong>\n      <small class=\"version\">{{version}}</small>\n      <small class=\"subtitle\">Angular2+ DnD</small>\n    </h1>\n  </div -->\n  <div class=\"field\" fxFlex=\"100%\">\n\n    <ngx-section class=\"shadow\" sectionTitle=\"Sortable - No model\">\n      <div fxLayout=\"row nowrap\" fxFill>\n        <div fxFlex=\"50%\">\n          <div class='wrapper'>\n            <div class=\"ngx-dnd-container\" ngxDroppable>\n              <div class=\"ngx-dnd-item\" ngxDraggable>Item 1</div>\n              <div class=\"ngx-dnd-item\" ngxDraggable>Item 2</div>\n              <div class=\"ngx-dnd-item\" ngxDraggable>Item 3</div>\n            </div>\n          </div>\n        </div>\n        <div fxFlex=\"50%\">\n          <h3>Using Directives</h3>\n          <pre><code ngNonBindable><![CDATA[<div class=\"ngx-dnd-container\" ngxDroppable>\n  <div class=\"ngx-dnd-item\" ngxDraggable>Item 1</div>\n  <div class=\"ngx-dnd-item\" ngxDraggable>Item 2</div>\n  <div class=\"ngx-dnd-item\" ngxDraggable>Item 3</div>\n</div>]]></code></pre>\n\n          <h3>Using Components</h3>\n          <pre><code ngNonBindable><![CDATA[<ngx-dnd-container [model]=\"['Item 1', 'Item 2', 'Item 3']\">\n</ngx-dnd-container>]]></code></pre>\n        </div>\n      </div>\n    </ngx-section>\n\n    <ngx-section class=\"shadow\" sectionTitle=\"Sortable - No model - Disabled Item\">\n      <div fxLayout=\"row nowrap\" fxFill>\n        <div fxFlex=\"50%\">\n          <div class='wrapper'>\n            <div class=\"ngx-dnd-container\" ngxDroppable>\n              <div class=\"ngx-dnd-item move-disabled\" ngxDraggable [moves]=\"false\">Item 1 - Move Disabled</div>\n              <div class=\"ngx-dnd-item\" ngxDraggable>Item 2</div>\n              <div class=\"ngx-dnd-item\" ngxDraggable>Item 3</div>\n            </div>\n\n          </div>\n        </div>\n        <div fxFlex=\"50%\">\n          <h3>Using Directives</h3>\n          <pre><code ngNonBindable><![CDATA[<div class=\"ngx-dnd-container\" ngxDroppable>\n  <div class=\"ngx-dnd-item move-disabled\" ngxDraggable [moves]=\"false\">Item 1 - Move Disabled</div>\n  <div class=\"ngx-dnd-item\" ngxDraggable>Item 2</div>\n  <div class=\"ngx-dnd-item\" ngxDraggable>Item 3</div>\n</div>]]></code></pre>\n\n          <h3>Using Components</h3>\n          <pre><code ngNonBindable><![CDATA[<ngx-dnd-container [moves]=\"canMove\" [model]=\"['Item 1 - Move Disabled', 'Item 2', 'Item 3']\"></ngx-dnd-container>]]></code></pre>\n        </div>\n      </div>\n    </ngx-section>\n\n    <ngx-section class=\"shadow\" sectionTitle=\"Simple Sortable - from array model\">\n      <div fxLayout=\"row nowrap\" fxFill>\n        <div fxFlex=\"50%\">\n          <div class='wrapper'>\n            <div class=\"ngx-dnd-container\" ngxDroppable [model]=\"orderableList\">\n              <div class=\"ngx-dnd-item\" ngxDraggable *ngFor=\"let item of orderableList\" [model]=\"item\">{{item}}</div>\n            </div>\n          </div>\n        </div>\n        <div fxFlex=\"20%\">\n          <h3>Model</h3>\n          <pre><code>orderableList = {{orderableList | json}}</code></pre>\n        </div>\n        <div fxFlex=\"30%\">\n          <h3>Using Directives</h3>\n          <pre><code ngNonBindable><![CDATA[<div class=\"ngx-dnd-container\"\n    ngxDroppable [model]=\"orderableList\">\n  <div class=\"ngx-dnd-item\"\n    ngxDraggable\n    *ngFor=\"let item of orderableList\"\n    [model]=\"item\">\n      {{item}}\n    </div>\n</div>]]></code></pre>\n\n          <h3>Using Components</h3>\n          <pre><code ngNonBindable><![CDATA[<ngx-dnd-container\n  [model]=\"orderableList\">\n</ngx-dnd-container>]]></code></pre>\n        </div>\n      </div>\n    </ngx-section>\n\n    <ngx-section class=\"shadow\" sectionTitle=\"Simple Sortable - with drag handle\">\n      <div fxLayout=\"row nowrap\" fxFill>\n        <div fxFlex=\"50%\">\n          <div class='wrapper'>\n            <div class=\"ngx-dnd-container\" ngxDroppable [model]=\"orderableList\" dropZone=\"a\">\n              <div class=\"ngx-dnd-item has-handle\" ngxDraggable *ngFor=\"let item of orderableList\" [model]=\"item\">\n                <i class=\"icon icon-dots-vert\" ngxDragHandle></i>\n                {{item}}\n              </div>\n            </div>\n          </div>\n        </div>\n        <div fxFlex=\"20%\">\n          <h3>Model</h3>\n          <pre><code>orderableList = {{orderableList | json}}</code></pre>\n        </div>\n        <div fxFlex=\"30%\">\n          <h3>Using Directives</h3>\n          <pre><code ngNonBindable><![CDATA[<div class=\"ngx-dnd-container\"\n    ngxDroppable [model]=\"orderableList\">\n  <div class=\"ngx-dnd-item has-handle\"\n      ngxDraggable\n      *ngFor=\"let item of orderableList\" [model]=\"item\">\n    <i class=\"icon icon-dots-vert\" ngxDragHandle></i>\n    {{item}}\n  </div>\n</div>]]></code></pre>\n\n          <h3>Using Components</h3>\n          <pre><code ngNonBindable><![CDATA[<ngx-dnd-container\n  [model]=\"orderableList\">\n  <ng-template let-model=\"model\">\n    <i class=\"icon icon-dots-vert\" ngxDragHandle></i>\n    {{model}}\n  </ng-template>\n</ngx-dnd-container>]]></code></pre>\n        </div>\n      </div>\n    </ngx-section>\n\n    <ngx-section class=\"shadow\" sectionTitle=\"Orderable - With fxLayout\">\n      <div fxLayout=\"row nowrap\" fxFill>\n        <div [fxFlex]=\"'50%'\">\n          <div class='wrapper'>\n\n            <div class=\"ngx-dnd-container\" fxLayout=\"row wrap\" ngxDroppable>\n              <div fxFlex=\"1 1 45%\" class=\"ngx-dnd-item\" ngxDraggable>Item 1</div>\n              <div fxFlex=\"1 1 45%\" class=\"ngx-dnd-item\" ngxDraggable>Item 2</div>\n              <div fxFlex=\"1 1 20%\" class=\"ngx-dnd-item\" ngxDraggable>Item 3</div>\n              <div fxFlex=\"1 1 20%\" class=\"ngx-dnd-item\" ngxDraggable>Item 4</div>\n              <div fxFlex=\"1 1 20%\" class=\"ngx-dnd-item\" ngxDraggable>Item 5</div>\n            </div>\n\n          </div>\n        </div>\n        <div fxFlex=\"50%\">\n          <h3>Using Directives</h3>\n          <pre><code ngNonBindable><![CDATA[<div class=\"ngx-dnd-container\" fxLayout=\"row wrap\">\n  <div fxFlex=\"45\" class=\"ngx-dnd-item\">Item 1</div>\n  <div fxFlex=\"45\" class=\"ngx-dnd-item\">Item 2</div>\n  <div fxFlex=\"20\" class=\"ngx-dnd-item\">Item 3</div>\n  <div fxFlex=\"20\" class=\"ngx-dnd-item\">Item 4</div>\n  <div fxFlex=\"20\" class=\"ngx-dnd-item\">Item 5</div>\n</div>]]></code></pre>\n        </div>\n      </div>\n    </ngx-section>\n\n    <ngx-section class=\"shadow\" sectionTitle=\"Simple Drag-and-Drop - No model\">\n      <div fxLayout=\"row nowrap\" fxFill>\n        <div fxFlex=\"50%\">\n          <div class='wrapper'>\n            <div class=\"ngx-dnd-container\" ngxDroppable=\"example-two\">\n              <div class=\"ngx-dnd-item\" ngxDraggable>Item 1a</div>\n              <div class=\"ngx-dnd-item\" ngxDraggable>Item 2a</div>\n              <div class=\"ngx-dnd-item\" ngxDraggable>Item 3a</div>\n            </div>\n            <div class=\"ngx-dnd-container\" ngxDroppable=\"example-two\">\n              <div class=\"ngx-dnd-item\" ngxDraggable>Item 1b</div>\n              <div class=\"ngx-dnd-item\" ngxDraggable>Item 2b</div>\n              <div class=\"ngx-dnd-item\" ngxDraggable>Item 3b</div>\n            </div>\n          </div>\n        </div>\n        <div fxFlex=\"50%\">\n          <h3>Using Directives</h3>\n          <pre><code ngNonBindable><![CDATA[<div class=\"ngx-dnd-container\" ngxDroppable=\"example-two\">\n  <div class=\"ngx-dnd-item\" ngxDraggable>Item 1a</div>\n  <div class=\"ngx-dnd-item\" ngxDraggable>Item 2a</div>\n  <div class=\"ngx-dnd-item\" ngxDraggable>Item 3a</div>\n</div>\n<div class=\"ngx-dnd-container\" ngxDroppable=\"example-two\">\n  <div class=\"ngx-dnd-item\" ngxDraggable>Item 1b</div>\n  <div class=\"ngx-dnd-item\" ngxDraggable>Item 2b</div>\n  <div class=\"ngx-dnd-item\" ngxDraggable>Item 3b</div>\n</div>]]></code></pre>\n\n          <h3>Using Components</h3>\n          <pre><code ngNonBindable><![CDATA[<ngx-dnd-container\n  [model]=\"['Item 1a', 'Item 2a', 'Item 3a']\"\n  dropZone=\"example-two\">\n</ngx-dnd-container>\n<ngx-dnd-container\n  [model]=\"['Item 1b', 'Item 2b', 'Item 3b']\"\n  dropZone=\"example-two\">\n</ngx-dnd-container>]]></code></pre>\n        </div>\n      </div>\n    </ngx-section>\n\n\n    <ngx-section class=\"shadow\" sectionTitle=\"Restricted Drag-and-Drop - No model\">\n      <div fxLayout=\"row nowrap\" fxFill>\n        <div fxFlex=\"50%\">\n          <div class='wrapper'>\n            <div class=\"ngx-dnd-container\" ngxDroppable>\n              <div class=\"ngx-dnd-item\" ngxDraggable=\"['restricted-target']\">Item 1a</div>\n              <div class=\"ngx-dnd-item\" ngxDraggable=\"['restricted-target']\">Item 2a</div>\n              <div class=\"ngx-dnd-item\" ngxDraggable=\"['restricted-target']\">Item 3a</div>\n            </div>\n            <div class=\"ngx-dnd-container\" ngxDroppable=\"restricted-target\">\n              <div class=\"ngx-dnd-item\" ngxDraggable>Item 1b</div>\n              <div class=\"ngx-dnd-item\" ngxDraggable>Item 2b</div>\n              <div class=\"ngx-dnd-item\" ngxDraggable>Item 3b</div>\n            </div>\n          </div>\n        </div>\n        <div fxFlex=\"50%\">\n          <h3>Using Directives</h3>\n          <pre><code ngNonBindable><![CDATA[<div class=\"ngx-dnd-container\" ngxDroppable>\n  <div class=\"ngx-dnd-item\" ngxDraggable=\"['restricted-target']\">Item 1a</div>\n  <div class=\"ngx-dnd-item\" ngxDraggable=\"['restricted-target']\">Item 2a</div>\n  <div class=\"ngx-dnd-item\" ngxDraggable=\"['restricted-target']\">Item 3a</div>\n</div>\n<div class=\"ngx-dnd-container\" ngxDroppable=\"restricted-target\">\n  <div class=\"ngx-dnd-item\" ngxDraggable>Item 1b</div>\n  <div class=\"ngx-dnd-item\" ngxDraggable>Item 2b</div>\n  <div class=\"ngx-dnd-item\" ngxDraggable>Item 3b</div>\n</div>]]></code></pre>\n        </div>\n      </div>\n    </ngx-section>\n\n    <ngx-section class=\"shadow\" sectionTitle=\"Nested Sortable\">\n      <div fxLayout=\"row nowrap\" fxFill>\n        <div fxFlex=\"50%\">\n          <div class='wrapper'>\n            <ngx-dnd-container\n              [model]=\"orderableLists\">\n            </ngx-dnd-container>\n          </div>\n        </div>\n        <div fxFlex=\"25%\">\n          <h3>Model</h3>\n          <pre><code>orderableLists = {{orderableLists | json}}</code></pre>\n        </div>\n        <div fxFlex=\"25%\">\n          <h3>Using Components</h3>\n          <pre><code ngNonBindable><![CDATA[<ngx-dnd-container\n  [model]=\"orderableLists\">\n</ngx-dnd-container>]]></code></pre>\n        </div>\n      </div>\n    </ngx-section>\n\n    <ngx-section class=\"shadow\" sectionTitle=\"Nested Sortable - containers\">\n      <div fxLayout=\"row nowrap\" fxFill>\n        <div fxFlex=\"50%\">\n          <div class='wrapper'>\n            <ngx-dnd-container\n              [model]=\"nestedLists\">\n            </ngx-dnd-container>\n          </div>\n        </div>\n        <div fxFlex=\"25%\">\n          <h3>Model</h3>\n          <code><pre>nestedLists = {{nestedLists | json}}</pre></code>\n        </div>\n        <div fxFlex=\"25%\">\n          <h3>Using Components</h3>\n          <pre><code ngNonBindable><![CDATA[<ngx-dnd-container\n  [model]=\"nestedLists\">\n</ngx-dnd-container>]]></code></pre>\n        </div>\n      </div>\n    </ngx-section>\n\n    <ngx-section class=\"shadow\" sectionTitle=\"Restricted Drag-and-Drop - copy and remove on spill\">\n      <div fxLayout=\"row nowrap\" fxFill>\n        <div fxFlex=\"25%\">\n          <h4>Source</h4>\n            <ngx-dnd-container\n              [model]=\"sourceItems\"\n              [copy]=\"true\"\n              [dropZones]=\"['oneway-target']\">\n            </ngx-dnd-container>\n        </div>\n        <div fxFlex=\"25%\">\n          <h4>Target</h4>\n          <ngx-dnd-container\n            [model]=\"targetItems\"\n            dropZone=\"oneway-target\"\n            [removeOnSpill]=\"true\">\n          </ngx-dnd-container>\n        </div>\n        <div fxFlex=\"25%\">\n          <h3>Target Model</h3>\n          <pre><code>targetItems = {{targetItems | json}}</code></pre>\n        </div>\n        <div fxFlex=\"25%\">\n          <h3>Using Components</h3>\n          <pre><code ngNonBindable><![CDATA[<ngx-dnd-container\n  [model]=\"sourceItems\"\n  [copy]=\"true\"\n  [dropZones]=\"['oneway-target']\">\n</ngx-dnd-container>\n<ngx-dnd-container\n  [model]=\"targetItems\"\n  dropZone=\"oneway-target\"\n  [removeOnSpill]=\"true\">\n</ngx-dnd-container>]]></code></pre>\n        </div>\n      </div>\n    </ngx-section>\n\n    <ngx-section class=\"shadow\" sectionTitle=\"Nested Restricted Drag-and-Drop - with remove on spill\">\n      <div fxLayout=\"row nowrap\" fxFill>\n        <div fxFlex=\"25%\">\n          <h4>Source</h4>\n          <ngx-dnd-container\n            [model]=\"sourceNestedItems\"\n            [copy]=\"true\"\n            [dropZones]=\"['nested-oneway-target']\">\n          </ngx-dnd-container>\n        </div>\n        <div fxFlex=\"25%\">\n          <h4>Target</h4>\n          <ngx-dnd-container\n            [model]=\"targetNestedItems\"\n            dropZone=\"nested-oneway-target\"\n            [removeOnSpill]=\"true\">\n          </ngx-dnd-container>\n        </div>\n        <div fxFlex=\"25%\">\n          <h3>Target Model</h3>\n          <pre><code>targetNestedItems = {{targetNestedItems | json}}</code></pre>\n        </div>\n        <div fxFlex=\"25%\">\n          <h3>Using Components</h3>\n          <pre><code ngNonBindable><![CDATA[<ngx-dnd-container\n  [model]=\"sourceNestedItems\"\n  [copy]=\"true\"\n  [dropZones]=\"['nested-oneway-target']\">\n</ngx-dnd-container>\n<ngx-dnd-container\n  [model]=\"targetNestedItems\"\n  dropZone=\"nested-oneway-target\"\n  [removeOnSpill]=\"true\">\n</ngx-dnd-container>]]></code></pre>\n        </div>\n      </div>\n    </ngx-section>\n\n    <ngx-section class=\"shadow\" sectionTitle=\"Restricted Drag-and-Drop - multiple containers\">\n      <div fxLayout=\"row nowrap\" fxFill>\n        <div fxFlex=\"25%\">\n          <h4>Source</h4>\n            <ngx-dnd-container\n              [model]=\"sourceItems\"\n              [copy]=\"true\"\n              [dropZones]=\"['multiple-target-a', 'multiple-target-b']\">\n            </ngx-dnd-container>\n        </div>\n        <div fxFlex=\"25%\">\n          <h4>Target A</h4>\n          <ngx-dnd-container\n            [model]=\"targetItemsA\"\n            dropZone=\"multiple-target-a\"\n            [dropZones]=\"['multiple-target-a', 'multiple-target-b']\"\n            [removeOnSpill]=\"true\">\n          </ngx-dnd-container>\n        </div>\n        <div fxFlex=\"25%\">\n          <h4>Target B</h4>\n          <ngx-dnd-container\n            [model]=\"targetItemsB\"\n            dropZone=\"multiple-target-b\"\n            [dropZones]=\"['multiple-target-a', 'multiple-target-b']\"\n            [removeOnSpill]=\"true\">\n          </ngx-dnd-container>\n        </div>\n        <div fxFlex=\"25%\">\n          <h3>Using Components</h3>\n          <pre><code ngNonBindable><![CDATA[<ngx-dnd-container\n  [model]=\"sourceItems\"\n  [copy]=\"true\"\n  [dropZones]=\"['multiple-target-a', 'multiple-target-b']\">\n</ngx-dnd-container>\n<ngx-dnd-container\n  [model]=\"targetItemsA\"\n  dropZone=\"multiple-target-a\"\n  [removeOnSpill]=\"true\">\n</ngx-dnd-container>\n<ngx-dnd-container\n  [model]=\"targetItemsB\"\n  dropZone=\"multiple-target-b\"\n  [removeOnSpill]=\"true\">\n</ngx-dnd-container>]]></code></pre>\n        </div>\n      </div>\n    </ngx-section>\n\n    <ngx-section class=\"shadow builder\" sectionTitle=\"Builder Demo\">\n      <div fxLayout=\"row nowrap\" fxFill>\n        <div class=\"builder-source\" fxFlex=\"20%\">\n          <h4>Source</h4>\n\n          <ngx-dnd-container\n            class=\"root-container\"\n            [model]=\"sourceBuilderTools\"\n            [dropZones]=\"['builder-target']\"\n            [copy]=\"true\"\n            [droppableItemClass]=\"droppableItemClass\"\n            (drag)=\"builderDrag($event)\">\n\n            <ng-template let-item=\"model\">\n              <ngx-icon [fontIcon]=\"item.icon\"></ngx-icon>\n              {{item.name}}\n            </ng-template>\n          </ngx-dnd-container>\n\n        </div>\n        <div class=\"builder-target\" fxFlex=\"60%\">\n          <h4>Target</h4>\n\n          <ngx-dnd-container\n            class=\"root-container\"\n            [model]=\"targetBuilderTools\"\n            dropZone=\"builder-target\"\n            [removeOnSpill]=\"true\"\n            [droppableItemClass]=\"droppableItemClass\"\n            (drag)=\"log($event)\"\n            (drop)=\"log($event)\"\n            (over)=\"log($event)\"\n            (out)=\"log($event)\"\n            (remove)=\"log($event)\">\n\n            <ng-template let-model=\"model\" let-template=\"template\">\n              <div [ngSwitch]=\"model.inputType\">\n                <div *ngSwitchCase=\"'section'\">\n                   <ngx-section class=\"shadow\" [sectionTitle]=\"model.name\">\n                     <ngx-dnd-container\n                       dropZone=\"builder-target\"\n                       [model]=\"model.children\"\n                       [removeOnSpill]=\"true\"\n                       [template]=\"template\"\n                       [droppableItemClass]=\"droppableItemClass\"\n                       (drag)=\"log($event)\"\n                       (drop)=\"log($event)\"\n                       (over)=\"log($event)\"\n                       (out)=\"log($event)\"\n                       (remove)=\"log($event)\"\n                       (cancel)=\"log($event)\">\n                     </ngx-dnd-container>\n                   </ngx-section>\n                </div>\n                <div *ngSwitchDefault>\n                  <ngx-input\n                    [type]=\"model.inputType\"\n                    [hint]=\"model.name\"\n                    [autofocus]=\"false\"\n                    [ngModel]=\"model.data\">\n                  </ngx-input>\n                </div>\n              </div>\n            </ng-template>\n          </ngx-dnd-container>\n        </div>\n        <div fxFlex>\n          <h3>Model</h3>\n          <pre><code>{{targetBuilderTools | json}}</code></pre>\n        </div>\n      </div>\n      <i>View code <a href=\"https://github.com/swimlane/ngx-dnd/blob/master/demo/app.component.html#L413\">here</a></i>\n      <br /><i>Open console to see events</i>\n    </ngx-section>\n\n  </div>\n</main>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "html, body {\n  margin: 0;\n  padding: 0; }\n\nbody {\n  font-family: 'RobotoDraft', 'Roboto', 'Helvetica Neue, Helvetica, Arial', sans-serif;\n  font-style: normal;\n  font-weight: 300;\n  font-size: 1.4rem;\n  line-height: 2rem;\n  letter-spacing: 0.01rem;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  min-height: 100vh;\n  color: #666; }\n\n* {\n  box-sizing: border-box; }\n\n/**\n  * Text\n  */\n\n.dark {\n  /**\n    * Text\n    */ }\n\n.field {\n  color: #fff;\n  background: #1b1e27;\n  padding: 20px; }\n\n.no-margin {\n  margin: 0 !important; }\n\n/**\n * Navigation\n */\n\n.nav-col {\n  color: #fff;\n  background: #5b6882; }\n\n.nav-col a {\n    color: #fff; }\n\n.nav-col h1 {\n    display: block;\n    background: #5b6882;\n    padding: 0 15px;\n    line-height: 50px;\n    margin: 0; }\n\n.nav-col nav {\n    margin: 20px 15px; }\n\n.nav-col nav li {\n      padding: .1rem 0; }\n\n.nav-col nav ul ul {\n      padding-left: 10px;\n      padding-bottom: 10px;\n      font-size: .9em; }\n\n.nav-col nav a {\n      color: #fff;\n      text-decoration: none; }\n\n.wrapper {\n  width: 100%;\n  padding: 0 30px; }\n\nngx-section pre {\n  width: 90%; }\n\n.builder .ngx-dnd-item {\n  font-size: 16px; }\n\n.builder .builder-source .ngx-dnd-container {\n  border: none;\n  padding: 5px; }\n\n.builder .builder-target .ngx-input {\n  margin: 0; }\n\n.builder .builder-target .ngx-input .ngx-input-wrap {\n    margin: 0; }\n\n.builder .builder-target .ngx-dnd-container {\n  justify-content: space-between;\n  flex-flow: row wrap;\n  display: flex;\n  box-sizing: border-box;\n  border: 2px dotted transparent; }\n\n.gu-unselectable .builder .builder-target .ngx-dnd-container, .builder .builder-target .ngx-dnd-container.gu-over, .builder .builder-target .ngx-dnd-container.gu-over .ngx-dnd-container {\n    border: 2px dotted orange; }\n\n.builder .builder-target .ngx-dnd-container .ngx-dnd-item {\n    margin: 5px 1%;\n    border: 1px solid transparent;\n    flex: 1 1 100%;\n    box-sizing: border-box;\n    -webkit-box-flex: 1;\n    max-width: 100%; }\n\n.builder .builder-target .ngx-dnd-container .ngx-dnd-item.half {\n      flex: 1 1 48%;\n      box-sizing: border-box;\n      -webkit-box-flex: 1;\n      max-width: 48%; }\n\n.builder .builder-target .ngx-dnd-container .ngx-dnd-item.gu-transit,\n  .builder .builder-target .ngx-dnd-container .ngx-dnd-item:hover {\n    border: 1px solid #1786e9; }\n\n[ngxDragHandle].icon {\n  font-size: 0.7em;\n  cursor: move; }\n\n.ngx-icon.ngx-section {\n  display: inline-block;\n  margin-bottom: 0; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.version = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].APP_VERSION.replace(/\"/g, '');
        this.theme = 'dark';
        this.orderableList = ['Item 1', 'Item 2', 'Item 3'];
        this.orderableLists = [['Item 1a', 'Item 2a', 'Item 3a'], ['Item 1b', 'Item 2b', 'Item 3b']];
        this.nestedLists = [
            { label: 'Item 1', children: [] },
            {
                label: 'Item 2',
                children: [
                    { label: 'Item 2a', children: [] },
                    { label: 'Item 2b', children: [] },
                    { label: 'Item 2c', children: [] }
                ]
            },
            {
                label: 'Item 3',
                children: [
                    { label: 'Item 3a', children: [] },
                    { label: 'Item 3b', children: [] },
                    { label: 'Item 3c', children: [] }
                ]
            }
        ];
        this.sourceItems = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }];
        this.targetItems = [];
        this.targetItemsA = [];
        this.targetItemsB = [];
        this.sourceNestedItems = [
            { label: 'Item 1, no children', children: [] },
            {
                label: 'Item 2',
                children: [{ label: 'no' }, { label: 'children' }]
            },
            { label: "Item 3, can't have children" }
        ];
        this.targetNestedItems = [];
        this.sourceBuilderTools = [
            { name: 'Section', children: [], inputType: 'section', icon: 'section', class: 'wide' },
            { name: 'A String', inputType: 'string', icon: 'field-text', class: 'half' },
            { name: 'A Number', inputType: 'number', icon: 'field-numeric', class: 'half' }
        ];
        this.targetBuilderTools = [];
        this.droppableItemClass = function (item) { return item.class + " " + item.inputType; };
    }
    AppComponent.prototype.builderDrag = function (e) {
        var item = e.value;
        item.data =
            item.inputType === 'number'
                ? (Math.random() * 100) | 0
                : Math.random()
                    .toString(36)
                    .substring(20);
    };
    AppComponent.prototype.log = function (e) {
        console.log(e.type, e);
    };
    AppComponent.prototype.canMove = function (e) {
        return e.indexOf('Disabled') === -1;
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")],
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule, getBaseLocation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBaseLocation", function() { return getBaseLocation; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _swimlane_ngx_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-ui */ "./node_modules/@swimlane/ngx-ui/release/index.js");
/* harmony import */ var _swimlane_ngx_ui__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_ui__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _swimlane_ngx_ui_release_index_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-ui/release/index.css */ "./node_modules/@swimlane/ngx-ui/release/index.css");
/* harmony import */ var _swimlane_ngx_ui_release_index_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_ui_release_index_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _swimlane_ngx_dnd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @swimlane/ngx-dnd */ "./dist/swimlane/ngx-dnd/fesm5/swimlane-ngx-dnd.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            providers: [
                {
                    provide: _angular_common__WEBPACK_IMPORTED_MODULE_4__["APP_BASE_HREF"],
                    useFactory: getBaseLocation
                }
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
                _swimlane_ngx_ui__WEBPACK_IMPORTED_MODULE_6__["NgxUIModule"],
                _swimlane_ngx_dnd__WEBPACK_IMPORTED_MODULE_9__["NgxDnDModule"]
            ],
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());

function getBaseLocation() {
    var paths = location.pathname.split('/').splice(1, 1);
    var basePath = (paths && paths[0]) || '';
    return '/' + basePath;
}


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var pkg = __webpack_require__(/*! ../../projects/swimlane/ngx-dnd/package.json */ "./projects/swimlane/ngx-dnd/package.json");
var environment = {
    production: false,
    APP_VERSION: JSON.stringify(pkg.version)
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/jmh/workspace/components/ngx-dnd/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map