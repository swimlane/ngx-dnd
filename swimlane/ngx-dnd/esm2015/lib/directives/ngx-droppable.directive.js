/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, Output, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { DrakeStoreService } from '../services/drake-store.service';
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
export class DroppableDirective {
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
function DroppableDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DroppableDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DroppableDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DroppableDirective.propDecorators;
    /** @type {?} */
    DroppableDirective.prototype.model;
    /** @type {?} */
    DroppableDirective.prototype.copy;
    /** @type {?} */
    DroppableDirective.prototype.removeOnSpill;
    /** @type {?} */
    DroppableDirective.prototype.ngxDroppable;
    /** @type {?} */
    DroppableDirective.prototype.drop;
    /** @type {?} */
    DroppableDirective.prototype.drag;
    /** @type {?} */
    DroppableDirective.prototype.over;
    /** @type {?} */
    DroppableDirective.prototype.out;
    /** @type {?} */
    DroppableDirective.prototype.remove;
    /** @type {?} */
    DroppableDirective.prototype.cancel;
    /** @type {?} */
    DroppableDirective.prototype.defaultZone;
    /** @type {?} */
    DroppableDirective.prototype._dropZone;
    /** @type {?} */
    DroppableDirective.prototype.el;
    /** @type {?} */
    DroppableDirective.prototype.renderer;
    /** @type {?} */
    DroppableDirective.prototype.drakesService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyb3BwYWJsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRuZC8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL25neC1kcm9wcGFibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBSU4sVUFBVSxFQUNWLFlBQVksRUFDWixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFcEUscUJBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQzs7OztBQUNkO0lBQ0UsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO0NBQ1o7Ozs7OztBQVFELE1BQU07Ozs7OztJQWlDSixZQUFvQixFQUFjLEVBQVUsUUFBbUIsRUFBVSxhQUFnQztRQUFyRixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtvQkEvQnpGLEtBQUs7NkJBQ0ksS0FBSztvQkFHTSxJQUFJLFlBQVksRUFBTztvQkFFdkIsSUFBSSxZQUFZLEVBQU87b0JBRXZCLElBQUksWUFBWSxFQUFPO21CQUV4QixJQUFJLFlBQVksRUFBTztzQkFFcEIsSUFBSSxZQUFZLEVBQU87c0JBRXZCLElBQUksWUFBWSxFQUFPO0tBaUJnRDs7OztJQWY3RyxJQUFJLFNBQVM7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDOUI7Ozs7UUFHRyxRQUFRO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDOzs7Ozs7SUFFakUsSUFBSSxRQUFRLENBQUMsR0FBVztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztLQUN0Qjs7OztJQU9ELFFBQVE7UUFDTixJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFxQixTQUFTLEVBQUUsSUFBSSxDQUFDO1FBQ3hELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25DOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ25ELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3RELENBQUMsQ0FBQztLQUNKOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2pDOzs7WUFwREYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFOzs7O1lBakJ2QyxVQUFVO1lBRVYsU0FBUztZQUdGLGlCQUFpQjs7O3NCQWN2QixLQUFLO3FCQUNMLEtBQUs7OEJBQ0wsS0FBSzs2QkFDTCxLQUFLO3FCQUVMLE1BQU07cUJBRU4sTUFBTTtxQkFFTixNQUFNO29CQUVOLE1BQU07dUJBRU4sTUFBTTt1QkFFTixNQUFNO3lCQU1OLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBBZnRlclZpZXdJbml0LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRHJha2VTdG9yZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9kcmFrZS1zdG9yZS5zZXJ2aWNlJztcblxubGV0IGkgPSAxMDAwMDtcbmZ1bmN0aW9uIGdldE5leHRJZCgpIHtcbiAgcmV0dXJuIGkrKztcbn1cblxuLyoqXG4gKiBNYWtlcyB0aGUgY29udGFpbmVyIGRyb3BwYWJsZSBhbmQgY2hpbGRyZW4gZHJhZ2dhYmxlLlxuICpcbiAqIEBleHBvcnRcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25neERyb3BwYWJsZV0nIH0pXG5leHBvcnQgY2xhc3MgRHJvcHBhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBtb2RlbDogYW55O1xuICBASW5wdXQoKSBjb3B5ID0gZmFsc2U7XG4gIEBJbnB1dCgpIHJlbW92ZU9uU3BpbGwgPSBmYWxzZTtcbiAgQElucHV0KCkgbmd4RHJvcHBhYmxlOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGRyb3A6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIGRyYWc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG92ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG91dDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBjYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgZ2V0IGNvbnRhaW5lcigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgZHJvcFpvbmUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcFpvbmUgfHwgdGhpcy5uZ3hEcm9wcGFibGUgfHwgdGhpcy5kZWZhdWx0Wm9uZTtcbiAgfVxuICBzZXQgZHJvcFpvbmUodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9kcm9wWm9uZSA9IHZhbDtcbiAgfVxuXG4gIGRlZmF1bHRab25lOiBzdHJpbmc7XG4gIF9kcm9wWm9uZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBkcmFrZXNTZXJ2aWNlOiBEcmFrZVN0b3JlU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRlZmF1bHRab25lID0gYEBARGVmYXVsdERyb3Bab25lLSR7Z2V0TmV4dElkKCl9QEBgO1xuICAgIHRoaXMuZHJha2VzU2VydmljZS5yZWdpc3Rlcih0aGlzKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXIuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXIsICdndS1vdmVyJyk7XG4gICAgfSk7XG4gICAgdGhpcy5vdXQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250YWluZXIsICdndS1vdmVyJyk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRyYWtlc1NlcnZpY2UucmVtb3ZlKHRoaXMpO1xuICB9XG59XG4iXX0=