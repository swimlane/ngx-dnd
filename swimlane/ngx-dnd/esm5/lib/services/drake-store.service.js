/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as dragulaNamespace from '@swimlane/dragula';
// see https://github.com/dherges/ng-packagr/issues/217
var /** @type {?} */ dragula = dragulaNamespace;
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
        { type: Injectable },
    ];
    /** @nocollapse */
    DrakeStoreService.ctorParameters = function () { return []; };
    return DrakeStoreService;
}());
export { DrakeStoreService };
function DrakeStoreService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DrakeStoreService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DrakeStoreService.ctorParameters;
    /** @type {?} */
    DrakeStoreService.prototype.droppableMap;
    /** @type {?} */
    DrakeStoreService.prototype.draggableMap;
    /** @type {?} */
    DrakeStoreService.prototype.dragulaOptions;
    /** @type {?} */
    DrakeStoreService.prototype.drake;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJha2Utc3RvcmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZG5kLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RyYWtlLXN0b3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxLQUFLLGdCQUFnQixNQUFNLG1CQUFtQixDQUFDOztBQUt0RCxxQkFBTSxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7Ozs7Ozs7SUFjL0I7NEJBTHVCLElBQUksT0FBTyxFQUEyQjs0QkFDdEMsSUFBSSxPQUFPLEVBQTJCO1FBSzNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7O0lBRUQsb0NBQVE7Ozs7SUFBUixVQUFTLFNBQTZCO1FBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNqRDs7Ozs7SUFFRCxrQ0FBTTs7OztJQUFOLFVBQU8sU0FBNkI7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLHFCQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMs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QUFBO29CQUNOLEtBQUssRUFBRSxXQUFXO2lCQUNuQixDQUFDLENBQUM7YUFDSjtTQUNGLENBQUMsQ0FBQztLQUNKOztnQkF2T0YsVUFBVTs7Ozs0QkFkWDs7U0FlYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIGRyYWd1bGFOYW1lc3BhY2UgZnJvbSAnQHN3aW1sYW5lL2RyYWd1bGEnO1xuaW1wb3J0IHsgRHJvcHBhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9uZ3gtZHJvcHBhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuLi9kaXJlY3RpdmVzL25neC1kcmFnZ2FibGUuZGlyZWN0aXZlJztcblxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9kaGVyZ2VzL25nLXBhY2thZ3IvaXNzdWVzLzIxN1xuY29uc3QgZHJhZ3VsYSA9IGRyYWd1bGFOYW1lc3BhY2U7XG5cbi8qKlxuICogQ2VudHJhbCBzZXJ2aWNlIHRoYXQgaGFuZGxlcyBhbGwgZXZlbnRzXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRHJha2VTdG9yZVNlcnZpY2Uge1xuICBwcml2YXRlIGRyb3BwYWJsZU1hcCA9IG5ldyBXZWFrTWFwPGFueSwgRHJvcHBhYmxlRGlyZWN0aXZlPigpO1xuICBwcml2YXRlIGRyYWdnYWJsZU1hcCA9IG5ldyBXZWFrTWFwPGFueSwgRHJhZ2dhYmxlRGlyZWN0aXZlPigpO1xuICBwcml2YXRlIGRyYWd1bGFPcHRpb25zOiBkcmFndWxhTmFtZXNwYWNlLkRyYWd1bGFPcHRpb25zO1xuICBwcml2YXRlIGRyYWtlOiBkcmFndWxhTmFtZXNwYWNlLkRyYWtlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZHJhZ3VsYU9wdGlvbnMgPSB0aGlzLmNyZWF0ZURyYWtlT3B0aW9ucygpO1xuICAgIHRoaXMuZHJha2UgPSBkcmFndWxhKFtdLCB0aGlzLmRyYWd1bGFPcHRpb25zKTtcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKCk7XG4gIH1cblxuICByZWdpc3Rlcihkcm9wcGFibGU6IERyb3BwYWJsZURpcmVjdGl2ZSkge1xuICAgIHRoaXMuZHJvcHBhYmxlTWFwLnNldChkcm9wcGFibGUuY29udGFpbmVyLCBkcm9wcGFibGUpO1xuICAgIHRoaXMuZHJha2UuY29udGFpbmVycy5wdXNoKGRyb3BwYWJsZS5jb250YWluZXIpO1xuICB9XG5cbiAgcmVtb3ZlKGRyb3BwYWJsZTogRHJvcHBhYmxlRGlyZWN0aXZlKSB7XG4gICAgdGhpcy5kcm9wcGFibGVNYXAuZGVsZXRlKGRyb3BwYWJsZS5jb250YWluZXIpO1xuICAgIGNvbnN0IGlkeCA9IHRoaXMuZHJha2UuY29udGFpbmVycy5pbmRleE9mKGRyb3BwYWJsZS5jb250YWluZXIpO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgdGhpcy5kcmFrZS5jb250YWluZXJzLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyRHJhZ2dhYmxlKGRyYWdnYWJsZTogRHJhZ2dhYmxlRGlyZWN0aXZlKSB7XG4gICAgdGhpcy5kcmFnZ2FibGVNYXAuc2V0KGRyYWdnYWJsZS5lbGVtZW50LCBkcmFnZ2FibGUpO1xuICB9XG5cbiAgcmVtb3ZlRHJhZ2dhYmxlKGRyYWdnYWJsZTogRHJhZ2dhYmxlRGlyZWN0aXZlKSB7XG4gICAgdGhpcy5kcmFnZ2FibGVNYXAuZGVsZXRlKGRyYWdnYWJsZS5lbGVtZW50KTtcbiAgfVxuXG4gIGNyZWF0ZURyYWtlT3B0aW9ucygpOiBkcmFndWxhTmFtZXNwYWNlLkRyYWd1bGFPcHRpb25zIHtcbiAgICBjb25zdCBhY2NlcHRzID0gKGVsOiBhbnksIHRhcmdldDogYW55IC8qLCBzb3VyY2U6IGFueSwgc2libGluZzogYW55ICovKSA9PiB7XG4gICAgICBpZiAoZWwuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBjb25zdCBlbGVtZW50Q29tcG9uZW50ID0gdGhpcy5kcmFnZ2FibGVNYXAuZ2V0KGVsKTtcbiAgICAgIGNvbnN0IHRhcmdldENvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldCh0YXJnZXQpO1xuICAgICAgaWYgKGVsZW1lbnRDb21wb25lbnQgJiYgdGFyZ2V0Q29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Q29tcG9uZW50LmRyb3Bab25lcy5pbmNsdWRlcyh0YXJnZXRDb21wb25lbnQuZHJvcFpvbmUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIGNvbnN0IGNvcHkgPSAoXzogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgY29uc3Qgc291cmNlQ29tcG9uZW50ID0gdGhpcy5kcm9wcGFibGVNYXAuZ2V0KHNvdXJjZSk7XG4gICAgICBpZiAoc291cmNlQ29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybiBzb3VyY2VDb21wb25lbnQuY29weTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3QgbW92ZXMgPSAoZWw/OiBhbnksIHNvdXJjZT86IGFueSwgaGFuZGxlPzogYW55LCBzaWJsaW5nPzogYW55KSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50Q29tcG9uZW50ID0gdGhpcy5kcmFnZ2FibGVNYXAuZ2V0KGVsKTtcbiAgICAgIGlmIChlbGVtZW50Q29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Q29tcG9uZW50Lm1vdmVzKHNvdXJjZSwgaGFuZGxlLCBzaWJsaW5nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICByZXR1cm4geyBhY2NlcHRzLCBjb3B5LCBtb3ZlcywgcmV2ZXJ0T25TcGlsbDogdHJ1ZSwgZGlyZWN0aW9uOiAndmVydGljYWwnIH07XG4gIH1cblxuICByZWdpc3RlckV2ZW50cygpOiB2b2lkIHtcbiAgICBsZXQgZHJhZ0VsbTogYW55O1xuICAgIGxldCBkcmFnZ2VkSXRlbTogYW55O1xuXG4gICAgdGhpcy5kcmFrZS5vbignZHJhZycsIChlbDogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgZHJhZ2dlZEl0ZW0gPSB1bmRlZmluZWQ7XG4gICAgICBkcmFnRWxtID0gZWw7XG5cbiAgICAgIGlmICghZWwgfHwgIXNvdXJjZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmRyYWdnYWJsZU1hcC5oYXMoZWwpKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRDb21wb25lbnQgPSB0aGlzLmRyYWdnYWJsZU1hcC5nZXQoZWwpO1xuICAgICAgICBkcmFnZ2VkSXRlbSA9IGVsZW1lbnRDb21wb25lbnQubW9kZWw7XG5cbiAgICAgICAgZWxlbWVudENvbXBvbmVudC5kcmFnLmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdkcmFnJyxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgdmFsdWU6IGRyYWdnZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kcm9wcGFibGVNYXAuaGFzKHNvdXJjZSkpIHtcbiAgICAgICAgY29uc3Qgc291cmNlQ29tcG9uZW50ID0gdGhpcy5kcm9wcGFibGVNYXAuZ2V0KHNvdXJjZSk7XG4gICAgICAgIHRoaXMuZHJhZ3VsYU9wdGlvbnMucmVtb3ZlT25TcGlsbCA9IHNvdXJjZUNvbXBvbmVudC5yZW1vdmVPblNwaWxsO1xuXG4gICAgICAgIHNvdXJjZUNvbXBvbmVudC5kcmFnLmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdkcmFnJyxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgc291cmNlQ29tcG9uZW50LFxuICAgICAgICAgIHZhbHVlOiBkcmFnZ2VkSXRlbVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZHJha2Uub24oJ2Ryb3AnLCAoZWw6IGFueSwgdGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXRDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQodGFyZ2V0KTtcblxuICAgICAgaWYgKCF0YXJnZXRDb21wb25lbnQpIHtcbiAgICAgICAgLy8gbm90IGEgdGFyZ2V0LCBhYm9ydFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBkcm9wRWxtTW9kZWwgPSBkcmFnZ2VkSXRlbTtcbiAgICAgIGNvbnN0IGRyb3BJbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwodGFyZ2V0LmNoaWxkcmVuLCBlbCk7XG5cbiAgICAgIGlmIChkcm9wSW5kZXggPCAwKSB7XG4gICAgICAgIC8vIGRyb3BJbmRleCBpcyBiYWQuLi4gY2FuY2VsXG4gICAgICAgIHRoaXMuZHJha2UuY2FuY2VsKHRydWUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNvdXJjZUNvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldChzb3VyY2UpO1xuXG4gICAgICBpZiAoc291cmNlQ29tcG9uZW50KSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZU1vZGVsID0gc291cmNlQ29tcG9uZW50Lm1vZGVsO1xuICAgICAgICBjb25zdCB0YXJnZXRNb2RlbCA9IHRhcmdldENvbXBvbmVudC5tb2RlbDtcblxuICAgICAgICBjb25zdCBoYXNEcmFnTW9kZWwgPSAhIShzb3VyY2VNb2RlbCAmJiBkcmFnZ2VkSXRlbSk7XG4gICAgICAgIGNvbnN0IGRyYWdJbmRleCA9IGhhc0RyYWdNb2RlbCA/IHNvdXJjZU1vZGVsLmluZGV4T2YoZHJhZ2dlZEl0ZW0pIDogLTE7XG4gICAgICAgIGlmIChoYXNEcmFnTW9kZWwgJiYgZHJhZ0luZGV4IDwgMCkge1xuICAgICAgICAgIC8vIGRyYWdJbmRleCBpcyBiYWQuLi4gY2FuY2VsXG4gICAgICAgICAgdGhpcy5kcmFrZS5jYW5jZWwodHJ1ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldE1vZGVsKSB7XG4gICAgICAgICAgY29uc3QgcmVvcmRlciA9IGRyYWdJbmRleCA+IC0xICYmIHNvdXJjZU1vZGVsICYmIHRhcmdldCA9PT0gc291cmNlO1xuICAgICAgICAgIGNvbnN0IGNvcHkgPSAhc291cmNlTW9kZWwgfHwgZHJhZ0VsbSAhPT0gZWw7XG4gICAgICAgICAgaWYgKHJlb3JkZXIpIHtcbiAgICAgICAgICAgIHNvdXJjZU1vZGVsLnNwbGljZShkcm9wSW5kZXgsIDAsIHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpWzBdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGVsLnBhcmVudE5vZGUgPT09IHRhcmdldCkge1xuICAgICAgICAgICAgICB0YXJnZXQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29weSkge1xuICAgICAgICAgICAgICBkcm9wRWxtTW9kZWwgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRyb3BFbG1Nb2RlbCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGVsLnBhcmVudE5vZGUgIT09IHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIC8vIGFkZCBlbGVtZW50IGJhY2ssIGxldCBhbmd1bGFyIHJlbW92ZSBpdFxuICAgICAgICAgICAgICAgIHRoaXMuZHJha2UuY2FuY2VsKHRydWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0TW9kZWwuc3BsaWNlKGRyb3BJbmRleCwgMCwgZHJvcEVsbU1vZGVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGFyZ2V0Q29tcG9uZW50LmRyb3AuZW1pdCh7XG4gICAgICAgIHR5cGU6ICdkcm9wJyxcbiAgICAgICAgZWwsXG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgdmFsdWU6IGRyb3BFbG1Nb2RlbCxcbiAgICAgICAgZHJvcEluZGV4XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZHJha2Uub24oJ3JlbW92ZScsIChlbDogYW55LCBjb250YWluZXI6IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU1hcC5oYXMoc291cmNlKSkge1xuICAgICAgICBjb25zdCBzb3VyY2VDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQoc291cmNlKTtcbiAgICAgICAgY29uc3Qgc291cmNlTW9kZWwgPSBzb3VyY2VDb21wb25lbnQubW9kZWw7XG5cbiAgICAgICAgY29uc3QgZHJhZ0luZGV4ID0gZHJhZ2dlZEl0ZW0gJiYgc291cmNlTW9kZWwgPyBzb3VyY2VNb2RlbC5pbmRleE9mKGRyYWdnZWRJdGVtKSA6IC0xO1xuXG4gICAgICAgIGlmIChkcmFnSW5kZXggPiAtMSkge1xuICAgICAgICAgIGlmIChlbC5wYXJlbnROb2RlICE9PSBzb3VyY2UpIHtcbiAgICAgICAgICAgIC8vIGFkZCBlbGVtZW50IGJhY2ssIGxldCBhbmd1bGFyIHJlbW92ZSBpdFxuICAgICAgICAgICAgc291cmNlLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc291cmNlTW9kZWwuc3BsaWNlKGRyYWdJbmRleCwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBzb3VyY2VDb21wb25lbnQucmVtb3ZlLmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdyZW1vdmUnLFxuICAgICAgICAgIGVsLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgdmFsdWU6IGRyYWdnZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kcmFrZS5vbignY2FuY2VsJywgKGVsOiBhbnksIGNvbnRhaW5lcjogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTWFwLmhhcyhjb250YWluZXIpKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckNvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldChjb250YWluZXIpO1xuICAgICAgICBjb250YWluZXJDb21wb25lbnQuY2FuY2VsLmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdjYW5jZWwnLFxuICAgICAgICAgIGVsLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgdmFsdWU6IGRyYWdnZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kcmFrZS5vbignb3ZlcicsIChlbDogYW55LCBjb250YWluZXI6IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU1hcC5oYXMoY29udGFpbmVyKSkge1xuICAgICAgICBjb25zdCBjb250YWluZXJDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQoY29udGFpbmVyKTtcbiAgICAgICAgY29udGFpbmVyQ29tcG9uZW50Lm92ZXIuZW1pdCh7XG4gICAgICAgICAgdHlwZTogJ292ZXInLFxuICAgICAgICAgIGVsLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgdmFsdWU6IGRyYWdnZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kcmFrZS5vbignb3V0JywgKGVsOiBhbnksIGNvbnRhaW5lcjogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTWFwLmhhcyhjb250YWluZXIpKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckNvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldChjb250YWluZXIpO1xuICAgICAgICBjb250YWluZXJDb21wb25lbnQub3V0LmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdvdXQnLFxuICAgICAgICAgIGVsLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgdmFsdWU6IGRyYWdnZWRJdGVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=