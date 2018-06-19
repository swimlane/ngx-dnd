/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, Output, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { DrakeStoreService } from '../services/drake-store.service';
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
        this.drop = new EventEmitter();
        this.drag = new EventEmitter();
        this.over = new EventEmitter();
        this.out = new EventEmitter();
        this.remove = new EventEmitter();
        this.cancel = new EventEmitter();
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
        { type: Directive, args: [{ selector: '[ngxDroppable]' },] },
    ];
    /** @nocollapse */
    DroppableDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: DrakeStoreService, },
    ]; };
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
    return DroppableDirective;
}());
export { DroppableDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyb3BwYWJsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRuZC8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL25neC1kcm9wcGFibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBSU4sVUFBVSxFQUNWLFlBQVksRUFDWixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFcEUscUJBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQzs7OztBQUNkO0lBQ0UsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO0NBQ1o7Ozs7Ozs7SUF5Q0MsNEJBQW9CLEVBQWMsRUFBVSxRQUFtQixFQUFVLGFBQWdDO1FBQXJGLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQW1CO29CQS9CekYsS0FBSzs2QkFDSSxLQUFLO29CQUdNLElBQUksWUFBWSxFQUFPO29CQUV2QixJQUFJLFlBQVksRUFBTztvQkFFdkIsSUFBSSxZQUFZLEVBQU87bUJBRXhCLElBQUksWUFBWSxFQUFPO3NCQUVwQixJQUFJLFlBQVksRUFBTztzQkFFdkIsSUFBSSxZQUFZLEVBQU87S0FpQmdEO0lBZjdHLHNCQUFJLHlDQUFTOzs7O1FBQWI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7U0FDOUI7OztPQUFBOzBCQUdHLHdDQUFROzs7OztZQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Ozs7O1FBRWpFLFVBQWEsR0FBVztZQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztTQUN0Qjs7Ozs7OztJQU9ELHFDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsdUJBQXFCLFNBQVMsRUFBRSxPQUFJLENBQUM7UUFDeEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbkM7Ozs7SUFFRCw0Q0FBZTs7O0lBQWY7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDbkQsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDakIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN0RCxDQUFDLENBQUM7S0FDSjs7OztJQUVELHdDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2pDOztnQkFwREYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFOzs7O2dCQWpCdkMsVUFBVTtnQkFFVixTQUFTO2dCQUdGLGlCQUFpQjs7OzBCQWN2QixLQUFLO3lCQUNMLEtBQUs7a0NBQ0wsS0FBSztpQ0FDTCxLQUFLO3lCQUVMLE1BQU07eUJBRU4sTUFBTTt5QkFFTixNQUFNO3dCQUVOLE1BQU07MkJBRU4sTUFBTTsyQkFFTixNQUFNOzZCQU1OLEtBQUs7OzZCQS9DUjs7U0F5QmEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERyYWtlU3RvcmVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZHJha2Utc3RvcmUuc2VydmljZSc7XG5cbmxldCBpID0gMTAwMDA7XG5mdW5jdGlvbiBnZXROZXh0SWQoKSB7XG4gIHJldHVybiBpKys7XG59XG5cbi8qKlxuICogTWFrZXMgdGhlIGNvbnRhaW5lciBkcm9wcGFibGUgYW5kIGNoaWxkcmVuIGRyYWdnYWJsZS5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ3hEcm9wcGFibGVdJyB9KVxuZXhwb3J0IGNsYXNzIERyb3BwYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgbW9kZWw6IGFueTtcbiAgQElucHV0KCkgY29weSA9IGZhbHNlO1xuICBASW5wdXQoKSByZW1vdmVPblNwaWxsID0gZmFsc2U7XG4gIEBJbnB1dCgpIG5neERyb3BwYWJsZTogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBkcm9wOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBkcmFnOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvdmVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvdXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgY2FuY2VsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGdldCBjb250YWluZXIoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IGRyb3Bab25lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2Ryb3Bab25lIHx8IHRoaXMubmd4RHJvcHBhYmxlIHx8IHRoaXMuZGVmYXVsdFpvbmU7XG4gIH1cbiAgc2V0IGRyb3Bab25lKHZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5fZHJvcFpvbmUgPSB2YWw7XG4gIH1cblxuICBkZWZhdWx0Wm9uZTogc3RyaW5nO1xuICBfZHJvcFpvbmU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZHJha2VzU2VydmljZTogRHJha2VTdG9yZVNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kZWZhdWx0Wm9uZSA9IGBAQERlZmF1bHREcm9wWm9uZS0ke2dldE5leHRJZCgpfUBAYDtcbiAgICB0aGlzLmRyYWtlc1NlcnZpY2UucmVnaXN0ZXIodGhpcyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5vdmVyLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyLCAnZ3Utb3ZlcicpO1xuICAgIH0pO1xuICAgIHRoaXMub3V0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyLCAnZ3Utb3ZlcicpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kcmFrZXNTZXJ2aWNlLnJlbW92ZSh0aGlzKTtcbiAgfVxufVxuIl19