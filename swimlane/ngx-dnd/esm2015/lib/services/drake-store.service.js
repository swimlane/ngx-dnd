/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as dragulaNamespace from '@swimlane/dragula';
// see https://github.com/dherges/ng-packagr/issues/217
const /** @type {?} */ dragula = dragulaNamespace;
/**
 * Central service that handles all events
 *
 * @export
 */
export class DrakeStoreService {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJha2Utc3RvcmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZG5kLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RyYWtlLXN0b3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxLQUFLLGdCQUFnQixNQUFNLG1CQUFtQixDQUFDOztBQUt0RCx1QkFBTSxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7Ozs7OztBQVFqQyxNQUFNO0lBTUo7NEJBTHVCLElBQUksT0FBTyxFQUEyQjs0QkFDdEMsSUFBSSxPQUFPLEVBQTJCO1FBSzNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7O0lBRUQsUUFBUSxDQUFDLFNBQTZCO1FBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNqRDs7Ozs7SUFFRCxNQUFNLENBQUMsU0FBNkI7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLHVCQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFD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QUUsV0FBVztpQkFDbkIsQ0FBQyxDQUFDO2FBQ0o7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFPLEVBQUUsU0FBYyxFQUFFLE1BQVcsRUFBRSxFQUFFO1lBQzdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsdUJBQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVELGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQzNCLElBQUksRUFBRSxNQUFNO29CQUNaLEVBQUU7b0JBQ0YsU0FBUztvQkFDVCxNQUFNO29CQUNOLEtBQUssRUFBRSxXQUFXO2lCQUNuQixDQUFDLENBQUM7YUFDSjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQU8sRUFBRSxTQUFjLEVBQUUsTUFBVyxFQUFFLEVBQUU7WUFDNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyx1QkFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUQsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDMUIsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsRUFBRTtvQkFDRixTQUFTO29CQUNULE1BQU07b0JBQ04sS0FBSyxFQUFFLFdBQVc7aUJBQ25CLENBQUMsQ0FBQzthQUNKO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7OztZQXZPRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBkcmFndWxhTmFtZXNwYWNlIGZyb20gJ0Bzd2ltbGFuZS9kcmFndWxhJztcbmltcG9ydCB7IERyb3BwYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4uL2RpcmVjdGl2ZXMvbmd4LWRyb3BwYWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9uZ3gtZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5cbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZGhlcmdlcy9uZy1wYWNrYWdyL2lzc3Vlcy8yMTdcbmNvbnN0IGRyYWd1bGEgPSBkcmFndWxhTmFtZXNwYWNlO1xuXG4vKipcbiAqIENlbnRyYWwgc2VydmljZSB0aGF0IGhhbmRsZXMgYWxsIGV2ZW50c1xuICpcbiAqIEBleHBvcnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERyYWtlU3RvcmVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBkcm9wcGFibGVNYXAgPSBuZXcgV2Vha01hcDxhbnksIERyb3BwYWJsZURpcmVjdGl2ZT4oKTtcbiAgcHJpdmF0ZSBkcmFnZ2FibGVNYXAgPSBuZXcgV2Vha01hcDxhbnksIERyYWdnYWJsZURpcmVjdGl2ZT4oKTtcbiAgcHJpdmF0ZSBkcmFndWxhT3B0aW9uczogZHJhZ3VsYU5hbWVzcGFjZS5EcmFndWxhT3B0aW9ucztcbiAgcHJpdmF0ZSBkcmFrZTogZHJhZ3VsYU5hbWVzcGFjZS5EcmFrZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRyYWd1bGFPcHRpb25zID0gdGhpcy5jcmVhdGVEcmFrZU9wdGlvbnMoKTtcbiAgICB0aGlzLmRyYWtlID0gZHJhZ3VsYShbXSwgdGhpcy5kcmFndWxhT3B0aW9ucyk7XG4gICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xuICB9XG5cbiAgcmVnaXN0ZXIoZHJvcHBhYmxlOiBEcm9wcGFibGVEaXJlY3RpdmUpIHtcbiAgICB0aGlzLmRyb3BwYWJsZU1hcC5zZXQoZHJvcHBhYmxlLmNvbnRhaW5lciwgZHJvcHBhYmxlKTtcbiAgICB0aGlzLmRyYWtlLmNvbnRhaW5lcnMucHVzaChkcm9wcGFibGUuY29udGFpbmVyKTtcbiAgfVxuXG4gIHJlbW92ZShkcm9wcGFibGU6IERyb3BwYWJsZURpcmVjdGl2ZSkge1xuICAgIHRoaXMuZHJvcHBhYmxlTWFwLmRlbGV0ZShkcm9wcGFibGUuY29udGFpbmVyKTtcbiAgICBjb25zdCBpZHggPSB0aGlzLmRyYWtlLmNvbnRhaW5lcnMuaW5kZXhPZihkcm9wcGFibGUuY29udGFpbmVyKTtcbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIHRoaXMuZHJha2UuY29udGFpbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3RlckRyYWdnYWJsZShkcmFnZ2FibGU6IERyYWdnYWJsZURpcmVjdGl2ZSkge1xuICAgIHRoaXMuZHJhZ2dhYmxlTWFwLnNldChkcmFnZ2FibGUuZWxlbWVudCwgZHJhZ2dhYmxlKTtcbiAgfVxuXG4gIHJlbW92ZURyYWdnYWJsZShkcmFnZ2FibGU6IERyYWdnYWJsZURpcmVjdGl2ZSkge1xuICAgIHRoaXMuZHJhZ2dhYmxlTWFwLmRlbGV0ZShkcmFnZ2FibGUuZWxlbWVudCk7XG4gIH1cblxuICBjcmVhdGVEcmFrZU9wdGlvbnMoKTogZHJhZ3VsYU5hbWVzcGFjZS5EcmFndWxhT3B0aW9ucyB7XG4gICAgY29uc3QgYWNjZXB0cyA9IChlbDogYW55LCB0YXJnZXQ6IGFueSAvKiwgc291cmNlOiBhbnksIHNpYmxpbmc6IGFueSAqLykgPT4ge1xuICAgICAgaWYgKGVsLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY29uc3QgZWxlbWVudENvbXBvbmVudCA9IHRoaXMuZHJhZ2dhYmxlTWFwLmdldChlbCk7XG4gICAgICBjb25zdCB0YXJnZXRDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQodGFyZ2V0KTtcbiAgICAgIGlmIChlbGVtZW50Q29tcG9uZW50ICYmIHRhcmdldENvbXBvbmVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudENvbXBvbmVudC5kcm9wWm9uZXMuaW5jbHVkZXModGFyZ2V0Q29tcG9uZW50LmRyb3Bab25lKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBjb25zdCBjb3B5ID0gKF86IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHNvdXJjZUNvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldChzb3VyY2UpO1xuICAgICAgaWYgKHNvdXJjZUNvbXBvbmVudCkge1xuICAgICAgICByZXR1cm4gc291cmNlQ29tcG9uZW50LmNvcHk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIGNvbnN0IG1vdmVzID0gKGVsPzogYW55LCBzb3VyY2U/OiBhbnksIGhhbmRsZT86IGFueSwgc2libGluZz86IGFueSkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudENvbXBvbmVudCA9IHRoaXMuZHJhZ2dhYmxlTWFwLmdldChlbCk7XG4gICAgICBpZiAoZWxlbWVudENvbXBvbmVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudENvbXBvbmVudC5tb3Zlcyhzb3VyY2UsIGhhbmRsZSwgc2libGluZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgYWNjZXB0cywgY29weSwgbW92ZXMsIHJldmVydE9uU3BpbGw6IHRydWUsIGRpcmVjdGlvbjogJ3ZlcnRpY2FsJyB9O1xuICB9XG5cbiAgcmVnaXN0ZXJFdmVudHMoKTogdm9pZCB7XG4gICAgbGV0IGRyYWdFbG06IGFueTtcbiAgICBsZXQgZHJhZ2dlZEl0ZW06IGFueTtcblxuICAgIHRoaXMuZHJha2Uub24oJ2RyYWcnLCAoZWw6IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGRyYWdnZWRJdGVtID0gdW5kZWZpbmVkO1xuICAgICAgZHJhZ0VsbSA9IGVsO1xuXG4gICAgICBpZiAoIWVsIHx8ICFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kcmFnZ2FibGVNYXAuaGFzKGVsKSkge1xuICAgICAgICBjb25zdCBlbGVtZW50Q29tcG9uZW50ID0gdGhpcy5kcmFnZ2FibGVNYXAuZ2V0KGVsKTtcbiAgICAgICAgZHJhZ2dlZEl0ZW0gPSBlbGVtZW50Q29tcG9uZW50Lm1vZGVsO1xuXG4gICAgICAgIGVsZW1lbnRDb21wb25lbnQuZHJhZy5lbWl0KHtcbiAgICAgICAgICB0eXBlOiAnZHJhZycsXG4gICAgICAgICAgZWwsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHZhbHVlOiBkcmFnZ2VkSXRlbVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTWFwLmhhcyhzb3VyY2UpKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZUNvbXBvbmVudCA9IHRoaXMuZHJvcHBhYmxlTWFwLmdldChzb3VyY2UpO1xuICAgICAgICB0aGlzLmRyYWd1bGFPcHRpb25zLnJlbW92ZU9uU3BpbGwgPSBzb3VyY2VDb21wb25lbnQucmVtb3ZlT25TcGlsbDtcblxuICAgICAgICBzb3VyY2VDb21wb25lbnQuZHJhZy5lbWl0KHtcbiAgICAgICAgICB0eXBlOiAnZHJhZycsXG4gICAgICAgICAgZWwsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHNvdXJjZUNvbXBvbmVudCxcbiAgICAgICAgICB2YWx1ZTogZHJhZ2dlZEl0ZW1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmRyYWtlLm9uKCdkcm9wJywgKGVsOiBhbnksIHRhcmdldDogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0Q29tcG9uZW50ID0gdGhpcy5kcm9wcGFibGVNYXAuZ2V0KHRhcmdldCk7XG5cbiAgICAgIGlmICghdGFyZ2V0Q29tcG9uZW50KSB7XG4gICAgICAgIC8vIG5vdCBhIHRhcmdldCwgYWJvcnRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgZHJvcEVsbU1vZGVsID0gZHJhZ2dlZEl0ZW07XG4gICAgICBjb25zdCBkcm9wSW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHRhcmdldC5jaGlsZHJlbiwgZWwpO1xuXG4gICAgICBpZiAoZHJvcEluZGV4IDwgMCkge1xuICAgICAgICAvLyBkcm9wSW5kZXggaXMgYmFkLi4uIGNhbmNlbFxuICAgICAgICB0aGlzLmRyYWtlLmNhbmNlbCh0cnVlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3VyY2VDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQoc291cmNlKTtcblxuICAgICAgaWYgKHNvdXJjZUNvbXBvbmVudCkge1xuICAgICAgICBjb25zdCBzb3VyY2VNb2RlbCA9IHNvdXJjZUNvbXBvbmVudC5tb2RlbDtcbiAgICAgICAgY29uc3QgdGFyZ2V0TW9kZWwgPSB0YXJnZXRDb21wb25lbnQubW9kZWw7XG5cbiAgICAgICAgY29uc3QgaGFzRHJhZ01vZGVsID0gISEoc291cmNlTW9kZWwgJiYgZHJhZ2dlZEl0ZW0pO1xuICAgICAgICBjb25zdCBkcmFnSW5kZXggPSBoYXNEcmFnTW9kZWwgPyBzb3VyY2VNb2RlbC5pbmRleE9mKGRyYWdnZWRJdGVtKSA6IC0xO1xuICAgICAgICBpZiAoaGFzRHJhZ01vZGVsICYmIGRyYWdJbmRleCA8IDApIHtcbiAgICAgICAgICAvLyBkcmFnSW5kZXggaXMgYmFkLi4uIGNhbmNlbFxuICAgICAgICAgIHRoaXMuZHJha2UuY2FuY2VsKHRydWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXJnZXRNb2RlbCkge1xuICAgICAgICAgIGNvbnN0IHJlb3JkZXIgPSBkcmFnSW5kZXggPiAtMSAmJiBzb3VyY2VNb2RlbCAmJiB0YXJnZXQgPT09IHNvdXJjZTtcbiAgICAgICAgICBjb25zdCBjb3B5ID0gIXNvdXJjZU1vZGVsIHx8IGRyYWdFbG0gIT09IGVsO1xuICAgICAgICAgIGlmIChyZW9yZGVyKSB7XG4gICAgICAgICAgICBzb3VyY2VNb2RlbC5zcGxpY2UoZHJvcEluZGV4LCAwLCBzb3VyY2VNb2RlbC5zcGxpY2UoZHJhZ0luZGV4LCAxKVswXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChlbC5wYXJlbnROb2RlID09PSB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvcHkpIHtcbiAgICAgICAgICAgICAgZHJvcEVsbU1vZGVsID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkcm9wRWxtTW9kZWwpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChlbC5wYXJlbnROb2RlICE9PSBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgZWxlbWVudCBiYWNrLCBsZXQgYW5ndWxhciByZW1vdmUgaXRcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWtlLmNhbmNlbCh0cnVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzb3VyY2VNb2RlbC5zcGxpY2UoZHJhZ0luZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldE1vZGVsLnNwbGljZShkcm9wSW5kZXgsIDAsIGRyb3BFbG1Nb2RlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRhcmdldENvbXBvbmVudC5kcm9wLmVtaXQoe1xuICAgICAgICB0eXBlOiAnZHJvcCcsXG4gICAgICAgIGVsLFxuICAgICAgICBzb3VyY2UsXG4gICAgICAgIHZhbHVlOiBkcm9wRWxtTW9kZWwsXG4gICAgICAgIGRyb3BJbmRleFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRyYWtlLm9uKCdyZW1vdmUnLCAoZWw6IGFueSwgY29udGFpbmVyOiBhbnksIHNvdXJjZTogYW55KSA9PiB7XG4gICAgICBpZiAodGhpcy5kcm9wcGFibGVNYXAuaGFzKHNvdXJjZSkpIHtcbiAgICAgICAgY29uc3Qgc291cmNlQ29tcG9uZW50ID0gdGhpcy5kcm9wcGFibGVNYXAuZ2V0KHNvdXJjZSk7XG4gICAgICAgIGNvbnN0IHNvdXJjZU1vZGVsID0gc291cmNlQ29tcG9uZW50Lm1vZGVsO1xuXG4gICAgICAgIGNvbnN0IGRyYWdJbmRleCA9IGRyYWdnZWRJdGVtICYmIHNvdXJjZU1vZGVsID8gc291cmNlTW9kZWwuaW5kZXhPZihkcmFnZ2VkSXRlbSkgOiAtMTtcblxuICAgICAgICBpZiAoZHJhZ0luZGV4ID4gLTEpIHtcbiAgICAgICAgICBpZiAoZWwucGFyZW50Tm9kZSAhPT0gc291cmNlKSB7XG4gICAgICAgICAgICAvLyBhZGQgZWxlbWVudCBiYWNrLCBsZXQgYW5ndWxhciByZW1vdmUgaXRcbiAgICAgICAgICAgIHNvdXJjZS5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgc291cmNlQ29tcG9uZW50LnJlbW92ZS5lbWl0KHtcbiAgICAgICAgICB0eXBlOiAncmVtb3ZlJyxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHZhbHVlOiBkcmFnZ2VkSXRlbVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZHJha2Uub24oJ2NhbmNlbCcsIChlbDogYW55LCBjb250YWluZXI6IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU1hcC5oYXMoY29udGFpbmVyKSkge1xuICAgICAgICBjb25zdCBjb250YWluZXJDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQoY29udGFpbmVyKTtcbiAgICAgICAgY29udGFpbmVyQ29tcG9uZW50LmNhbmNlbC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiAnY2FuY2VsJyxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHZhbHVlOiBkcmFnZ2VkSXRlbVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZHJha2Uub24oJ292ZXInLCAoZWw6IGFueSwgY29udGFpbmVyOiBhbnksIHNvdXJjZTogYW55KSA9PiB7XG4gICAgICBpZiAodGhpcy5kcm9wcGFibGVNYXAuaGFzKGNvbnRhaW5lcikpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyQ29tcG9uZW50ID0gdGhpcy5kcm9wcGFibGVNYXAuZ2V0KGNvbnRhaW5lcik7XG4gICAgICAgIGNvbnRhaW5lckNvbXBvbmVudC5vdmVyLmVtaXQoe1xuICAgICAgICAgIHR5cGU6ICdvdmVyJyxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHZhbHVlOiBkcmFnZ2VkSXRlbVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZHJha2Uub24oJ291dCcsIChlbDogYW55LCBjb250YWluZXI6IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU1hcC5oYXMoY29udGFpbmVyKSkge1xuICAgICAgICBjb25zdCBjb250YWluZXJDb21wb25lbnQgPSB0aGlzLmRyb3BwYWJsZU1hcC5nZXQoY29udGFpbmVyKTtcbiAgICAgICAgY29udGFpbmVyQ29tcG9uZW50Lm91dC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiAnb3V0JyxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHZhbHVlOiBkcmFnZ2VkSXRlbVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19