/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { DroppableDirective } from './ngx-droppable.directive';
import { DrakeStoreService } from '../services/drake-store.service';
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
        this.drag = new EventEmitter();
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
        { type: Directive, args: [{ selector: '[ngxDraggable]' },] },
    ];
    /** @nocollapse */
    DraggableDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: DrakeStoreService, },
        { type: DroppableDirective, },
    ]; };
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
    return DraggableDirective;
}());
export { DraggableDirective };
function DraggableDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DraggableDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DraggableDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DraggableDirective.propDecorators;
    /** @type {?} */
    DraggableDirective.prototype.ngxDraggable;
    /** @type {?} */
    DraggableDirective.prototype.model;
    /** @type {?} */
    DraggableDirective.prototype._moves;
    /** @type {?} */
    DraggableDirective.prototype.handles;
    /** @type {?} */
    DraggableDirective.prototype.drag;
    /** @type {?} */
    DraggableDirective.prototype.dragDelay;
    /** @type {?} */
    DraggableDirective.prototype.dragDelayed;
    /** @type {?} */
    DraggableDirective.prototype.touchTimeout;
    /** @type {?} */
    DraggableDirective.prototype._dropZones;
    /** @type {?} */
    DraggableDirective.prototype._parentDropzones;
    /** @type {?} */
    DraggableDirective.prototype.el;
    /** @type {?} */
    DraggableDirective.prototype.drakesService;
    /** @type {?} */
    DraggableDirective.prototype.droppableDirective;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyYWdnYWJsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRuZC8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL25neC1kcmFnZ2FibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRXBILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7O0lBa0RsRSw0QkFDVSxJQUNBLGVBQ0E7UUFGQSxPQUFFLEdBQUYsRUFBRTtRQUNGLGtCQUFhLEdBQWIsYUFBYTtRQUNiLHVCQUFrQixHQUFsQixrQkFBa0I7c0JBakNrQyxJQUFJOzs7Ozs7Ozt1QkFVakQsRUFBRTtvQkFNaUIsSUFBSSxZQUFZLEVBQU87eUJBRXZDLEdBQUc7MkJBQ0EsSUFBSTtLQWV2QjswQkF6Q0EseUNBQVM7Ozs7O1lBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7Ozs7OztRQUV2RSxVQUFjLEdBQVE7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7U0FDdkI7Ozs7SUFjRCxzQkFBSSx5Q0FBUzs7OztRQUFiO1lBQ0UsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUM5Qjs7O09BQUE7SUFTRCxzQkFBSSx1Q0FBTzs7OztRQUFYO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQzlCOzs7T0FBQTs7Ozs7SUFhRCxtQ0FBTTs7OztjQUFDLENBQVE7UUFDYixF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QUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFwQixDQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7Ozs7O1FBRTVFLG1CQUFtQixDQUFNLEVBQUUsQ0FBTTtZQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDekIsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNaO0tBQ0Y7Ozs7SUFFRCxzQ0FBUzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7O2dCQTVIRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7Ozs7Z0JBVnJCLFVBQVU7Z0JBR3JCLGlCQUFpQjtnQkFEakIsa0JBQWtCOzs7aUNBVXhCLEtBQUs7MEJBQ0wsS0FBSzs4QkFFTCxLQUFLOzJCQVFMLEtBQUssU0FBQyxPQUFPO3lCQWdCYixNQUFNOzJCQXFCTixZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDOzJCQVFwQyxZQUFZLFNBQUMsWUFBWTt5QkFTekIsWUFBWSxTQUFDLFVBQVU7OzZCQTdFMUI7O1NBV2Esa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRHJvcHBhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3gtZHJvcHBhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFrZVN0b3JlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2RyYWtlLXN0b3JlLnNlcnZpY2UnO1xuXG4vKipcbiAqIEFkZHMgcHJvcGVydGllcyBhbmQgZXZlbnRzIHRvIGRyYWdnYWJsZSBlbGVtZW50c1xuICpcbiAqIEBleHBvcnRcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25neERyYWdnYWJsZV0nIH0pXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBuZ3hEcmFnZ2FibGU6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBtb2RlbDogYW55O1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkcm9wWm9uZXMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcFpvbmVzIHx8IHRoaXMubmd4RHJhZ2dhYmxlIHx8IHRoaXMuX3BhcmVudERyb3B6b25lcztcbiAgfVxuICBzZXQgZHJvcFpvbmVzKHZhbDogYW55KSB7XG4gICAgdGhpcy5fZHJvcFpvbmVzID0gdmFsO1xuICB9XG5cbiAgQElucHV0KCdtb3ZlcycpIF9tb3ZlczogYm9vbGVhbiB8ICgoLi4uYXJnczogYW55W10pID0+IGFueSkgPSB0cnVlO1xuXG4gIC8qXG4gIENvbnRlbnRDaGlsZHJlbiBkb2Vzbid0IGdldCBjaGlsZHJlbiBjcmVhdGVkIHdpdGggTmdUZW1wbGF0ZU91dGxldFxuICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTQ4NDJcbiAgSW1wbGVtZW50ZWQgdmlhIHVwZGF0ZUVsZW1lbnRzIG1ldGhvZFxuXG4gIEBDb250ZW50Q2hpbGRyZW4oRHJhZ0hhbmRsZURpcmVjdGl2ZSwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcbiAgaGFuZGxlc0xpc3Q6IFF1ZXJ5TGlzdDxEcmFnSGFuZGxlRGlyZWN0aXZlPjsgKi9cblxuICBoYW5kbGVzOiBhbnlbXSA9IFtdO1xuXG4gIGdldCBoYXNIYW5kbGUoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5oYW5kbGVzLmxlbmd0aDtcbiAgfVxuXG4gIEBPdXRwdXQoKSBkcmFnOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGRyYWdEZWxheTogbnVtYmVyID0gMjAwOyAvLyBtaWxsaXNlY29uZHNcbiAgZHJhZ0RlbGF5ZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHRvdWNoVGltZW91dDogYW55O1xuXG4gIGdldCBlbGVtZW50KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIF9kcm9wWm9uZXM6IHN0cmluZ1tdO1xuICBfcGFyZW50RHJvcHpvbmVzOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgZHJha2VzU2VydmljZTogRHJha2VTdG9yZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkcm9wcGFibGVEaXJlY3RpdmU6IERyb3BwYWJsZURpcmVjdGl2ZVxuICApIHt9XG5cbiAgLy8gRnJvbTogaHR0cHM6Ly9naXRodWIuY29tL2JldmFjcXVhL2RyYWd1bGEvaXNzdWVzLzI4OSNpc3N1ZWNvbW1lbnQtMjc3MTQzMTcyXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNobW92ZScsIFsnJGV2ZW50J10pXG4gIG9uTW92ZShlOiBFdmVudCkge1xuICAgIGlmICghdGhpcy5fbW92ZXMgfHwgdGhpcy5kcmFnRGVsYXllZCkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRvdWNoVGltZW91dCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcpXG4gIG9uRG93bigpIHtcbiAgICBpZiAodGhpcy5fbW92ZXMpIHtcbiAgICAgIHRoaXMudG91Y2hUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ0RlbGF5ZWQgPSBmYWxzZTtcbiAgICAgIH0sIHRoaXMuZHJhZ0RlbGF5KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd0b3VjaGVuZCcpXG4gIG9uVXAoKSB7XG4gICAgaWYgKHRoaXMuX21vdmVzKSB7XG4gICAgICBjbGVhclRpbWVvdXQoPG51bWJlcj50aGlzLnRvdWNoVGltZW91dCk7XG4gICAgICB0aGlzLmRyYWdEZWxheWVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX3BhcmVudERyb3B6b25lcyA9IFt0aGlzLmRyb3BwYWJsZURpcmVjdGl2ZS5kcm9wWm9uZV07XG4gICAgdGhpcy5kcmFrZXNTZXJ2aWNlLnJlZ2lzdGVyRHJhZ2dhYmxlKHRoaXMpO1xuICAgIHRoaXMudXBkYXRlRWxlbWVudHMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZHJha2VzU2VydmljZS5yZW1vdmVEcmFnZ2FibGUodGhpcyk7XG4gIH1cblxuICB1cGRhdGVFbGVtZW50cygpOiB2b2lkIHtcbiAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGhhbmRsZXM6IE5vZGVMaXN0ID0gbmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbbmd4ZHJhZ2hhbmRsZV0nKTtcbiAgICB0aGlzLmhhbmRsZXMgPSBBcnJheS5mcm9tKGhhbmRsZXMpLmZpbHRlcigoaDogYW55KSA9PiBmaW5kRmlyc3REcmFnZ2FibGVQYXJlbnQoaCkgPT09IG5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgZnVuY3Rpb24gZmluZEZpcnN0RHJhZ2dhYmxlUGFyZW50KGM6IGFueSkge1xuICAgICAgd2hpbGUgKGMucGFyZW50Tm9kZSkge1xuICAgICAgICBjID0gYy5wYXJlbnROb2RlO1xuICAgICAgICBpZiAoYy5oYXNBdHRyaWJ1dGUgJiYgYy5oYXNBdHRyaWJ1dGUoJ25neGRyYWdnYWJsZScpKSB7XG4gICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjYW5Nb3ZlKHNvdXJjZT86IGFueSwgaGFuZGxlPzogYW55LCBzaWJsaW5nPzogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9tb3ZlcyA9PT0gJ2Jvb2xlYW4nKSByZXR1cm4gdGhpcy5fbW92ZXM7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9tb3ZlcyA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHRoaXMuX21vdmVzKHRoaXMubW9kZWwsIHNvdXJjZSwgaGFuZGxlLCBzaWJsaW5nKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG1vdmVzKHNvdXJjZTogYW55LCBoYW5kbGU6IGFueSwgc2libGluZzogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmNhbk1vdmUoc291cmNlLCBoYW5kbGUsIHNpYmxpbmcpKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gdGhpcy5oYXNIYW5kbGUgPyB0aGlzLmhhbmRsZXMuc29tZShoID0+IGhhbmRlbEZvcihoYW5kbGUsIGgpKSA6IHRydWU7XG5cbiAgICBmdW5jdGlvbiBoYW5kZWxGb3IoYzogYW55LCBwOiBhbnkpIHtcbiAgICAgIGlmIChjID09PSBwKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHdoaWxlICgoYyA9IGMucGFyZW50Tm9kZSkgJiYgYyAhPT0gcCk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgIHJldHVybiAhIWM7XG4gICAgfVxuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlRWxlbWVudHMoKTtcbiAgfVxufVxuIl19