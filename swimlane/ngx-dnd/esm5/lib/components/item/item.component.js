/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewEncapsulation, HostBinding } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { DraggableDirective } from '../../directives/ngx-draggable.directive';
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
        { type: Component, args: [{
                    selector: 'ngx-dnd-item',
                    template: "<ng-container [ngSwitch]=\"type\">\n\n  <ng-container *ngSwitchCase=\"'array'\">\n    <ngx-dnd-container\n      [model]=\"model\"\n      [template]=\"container.template\"\n      [dropZone]=\"dropZone\"\n      [dropZones]=\"dropZones\"\n      [removeOnSpill]=\"removeOnSpill\"\n      [droppableItemClass]=\"droppableItemClass\"\n      [copy]=\"copy\">\n    </ngx-dnd-container>\n  </ng-container>\n\n  <ng-container *ngSwitchCase=\"'object'\">\n    <ng-template\n      *ngIf=\"container.template\"\n      [ngTemplateOutlet]=\"container.template\"\n      [ngTemplateOutletContext]=\"data\">\n    </ng-template>\n    <ng-container *ngIf=\"!container.template\">\n      <div\n        class=\"ngx-dnd-content\">\n        {{model.label}}\n      </div>\n      <ngx-dnd-container\n        *ngIf=\"model.children\"\n        [model]=\"model.children\"\n        [template]=\"container.template\"\n        [dropZone]=\"dropZone\"\n        [dropZones]=\"dropZones\"\n        [removeOnSpill]=\"removeOnSpill\"\n        [droppableItemClass]=\"droppableItemClass\"\n        [copy]=\"copy\">\n      </ngx-dnd-container>\n    </ng-container>\n  </ng-container>\n\n  <ng-container *ngSwitchCase=\"'undefined'\">\n  </ng-container>\n\n  <ng-container *ngSwitchDefault>\n    <ng-template\n      *ngIf=\"container.template\"\n      [ngTemplateOutlet]=\"container.template\"\n      [ngTemplateOutletContext]=\"data\">\n    </ng-template>\n    <div\n      *ngIf=\"!container.template\"\n      class=\"ngx-dnd-content\">\n      {{model}}\n    </div>\n  </ng-container>\n\n</ng-container>\n\n\n\n\n\n\n\n",
                    styles: [".ngx-dnd-item{margin:10px;padding:10px;background-color:rgba(0,0,0,.2);transition:opacity .4s ease-in-out;border:1px solid #add8e6;display:block}.ngx-dnd-item.has-handle [ngxDragHandle],.ngx-dnd-item.has-handle [ngxdraghandle],.ngx-dnd-item:not(.has-handle):not(.move-disabled){cursor:move;cursor:grab;cursor:-webkit-grab}.ngx-dnd-item .ngx-dnd-content{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ngx-dnd-item:hover{border:1px solid #00f}.gu-mirror{position:fixed!important;margin:0!important;z-index:9999!important;opacity:.8}.gu-hide{display:none!important}.gu-unselectable{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.gu-transit{opacity:.2}"],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    ItemComponent.ctorParameters = function () { return [
        { type: ContainerComponent, },
        { type: DraggableDirective, },
    ]; };
    ItemComponent.propDecorators = {
        "model": [{ type: Input },],
        "dropZone": [{ type: Input },],
        "dropZones": [{ type: Input },],
        "droppableItemClass": [{ type: Input },],
        "removeOnSpill": [{ type: Input },],
        "copy": [{ type: Input },],
        "classString": [{ type: HostBinding, args: ['class',] },],
    };
    return ItemComponent;
}());
export { ItemComponent };
function ItemComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ItemComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ItemComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ItemComponent.propDecorators;
    /** @type {?} */
    ItemComponent.prototype.model;
    /** @type {?} */
    ItemComponent.prototype._copy;
    /** @type {?} */
    ItemComponent.prototype._dropZone;
    /** @type {?} */
    ItemComponent.prototype._dropZones;
    /** @type {?} */
    ItemComponent.prototype._droppableItemClass;
    /** @type {?} */
    ItemComponent.prototype._removeOnSpill;
    /** @type {?} */
    ItemComponent.prototype.data;
    /** @type {?} */
    ItemComponent.prototype.container;
    /** @type {?} */
    ItemComponent.prototype.draggableDirective;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRuZC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2l0ZW0vaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7Ozs7Ozs7O0lBNko1RSx1QkFBbUIsU0FBNkIsRUFBUyxrQkFBc0M7UUFBNUUsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFBUyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO3FCQXJDdkYsS0FBSzs4QkFJSSxLQUFLO0tBaUM2RTswQkE1RS9GLG1DQUFROzs7OztZQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDOzs7Ozs7UUFFbkQsVUFBYSxHQUFHO1lBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7U0FDdEI7Ozs7MEJBR0csb0NBQVM7Ozs7O1lBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7Ozs7OztRQUVyRCxVQUFjLEdBQUc7WUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztTQUN2Qjs7OzswQkFHRyw2Q0FBa0I7Ozs7O1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQzs7Ozs7O1FBRXZFLFVBQXVCLEdBQUc7WUFDeEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQztTQUNoQzs7OzswQkFHRyx3Q0FBYTs7Ozs7WUFDZixNQUFNLENBQUMsT0FBTyxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7Ozs7OztRQUV2RyxVQUFrQixHQUFHO1lBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO1NBQzNCOzs7OzBCQUdHLCtCQUFJOzs7OztZQUNOLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzs7Ozs7O1FBRTVFLFVBQVMsR0FBRztZQUNWLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1NBQ2xCOzs7O0lBU0Qsc0JBQUksb0NBQVM7Ozs7UUFBYjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDO1NBQzFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFZOzs7O1FBQWhCO1lBQ0UsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNDOzs7T0FBQTswQkFHRyxzQ0FBVzs7Ozs7WUFDYixxQkFBTSxTQUFTLEdBQ2IsT0FBTyxJQUFJLENBQUMsa0JBQWtCLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7WUFFaEgscUJBQU0sT0FBTyxHQUFHLENBQUMsY0FBYyxFQUFFLFNBQVMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNsRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUMvQjtZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7O0lBRzNCLHNCQUFJLCtCQUFJOzs7O1FBQVI7WUFDRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDaEI7WUFDRCxNQUFNLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzFCOzs7T0FBQTs7OztJQUlELGdDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDVixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVE7U0FDbEMsQ0FBQztLQUNIOztnQkE3SkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUsNGlEQThEWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxnd0JBQWd3QixDQUFDO29CQUMxd0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3RDOzs7O2dCQTdFUSxrQkFBa0I7Z0JBQ2xCLGtCQUFrQjs7OzBCQThFeEIsS0FBSzs2QkFFTCxLQUFLOzhCQVFMLEtBQUs7dUNBUUwsS0FBSztrQ0FRTCxLQUFLO3lCQVFMLEtBQUs7Z0NBdUJMLFdBQVcsU0FBQyxPQUFPOzt3QkExSXRCOztTQWdGYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vY29udGFpbmVyL2NvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9uZ3gtZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgYWxsb3dzIG5lc3RlZCBuZ3hEcm9wcGFibGUgYW5kIG5neERyYWdnYWJsZXNcbiAqIFNob3VsZCBvbmx5IGJlIHVzZSBpbnNpZGUgYSBuZ3gtZG5kLWNvbnRhaW5lclxuICogT3V0c2lkZSBhIG5neC1kbmQtY29udGFpbmVyIHVzZSBuZ3hEcm9wcGFibGVcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1kbmQtaXRlbScsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwidHlwZVwiPlxuXG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidhcnJheSdcIj5cbiAgICA8bmd4LWRuZC1jb250YWluZXJcbiAgICAgIFttb2RlbF09XCJtb2RlbFwiXG4gICAgICBbdGVtcGxhdGVdPVwiY29udGFpbmVyLnRlbXBsYXRlXCJcbiAgICAgIFtkcm9wWm9uZV09XCJkcm9wWm9uZVwiXG4gICAgICBbZHJvcFpvbmVzXT1cImRyb3Bab25lc1wiXG4gICAgICBbcmVtb3ZlT25TcGlsbF09XCJyZW1vdmVPblNwaWxsXCJcbiAgICAgIFtkcm9wcGFibGVJdGVtQ2xhc3NdPVwiZHJvcHBhYmxlSXRlbUNsYXNzXCJcbiAgICAgIFtjb3B5XT1cImNvcHlcIj5cbiAgICA8L25neC1kbmQtY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInb2JqZWN0J1wiPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgKm5nSWY9XCJjb250YWluZXIudGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGFpbmVyLnRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJkYXRhXCI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWNvbnRhaW5lci50ZW1wbGF0ZVwiPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cIm5neC1kbmQtY29udGVudFwiPlxuICAgICAgICB7e21vZGVsLmxhYmVsfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPG5neC1kbmQtY29udGFpbmVyXG4gICAgICAgICpuZ0lmPVwibW9kZWwuY2hpbGRyZW5cIlxuICAgICAgICBbbW9kZWxdPVwibW9kZWwuY2hpbGRyZW5cIlxuICAgICAgICBbdGVtcGxhdGVdPVwiY29udGFpbmVyLnRlbXBsYXRlXCJcbiAgICAgICAgW2Ryb3Bab25lXT1cImRyb3Bab25lXCJcbiAgICAgICAgW2Ryb3Bab25lc109XCJkcm9wWm9uZXNcIlxuICAgICAgICBbcmVtb3ZlT25TcGlsbF09XCJyZW1vdmVPblNwaWxsXCJcbiAgICAgICAgW2Ryb3BwYWJsZUl0ZW1DbGFzc109XCJkcm9wcGFibGVJdGVtQ2xhc3NcIlxuICAgICAgICBbY29weV09XCJjb3B5XCI+XG4gICAgICA8L25neC1kbmQtY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCIndW5kZWZpbmVkJ1wiPlxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaERlZmF1bHQ+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAqbmdJZj1cImNvbnRhaW5lci50ZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250YWluZXIudGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImRhdGFcIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxkaXZcbiAgICAgICpuZ0lmPVwiIWNvbnRhaW5lci50ZW1wbGF0ZVwiXG4gICAgICBjbGFzcz1cIm5neC1kbmQtY29udGVudFwiPlxuICAgICAge3ttb2RlbH19XG4gICAgPC9kaXY+XG4gIDwvbmctY29udGFpbmVyPlxuXG48L25nLWNvbnRhaW5lcj5cblxuXG5cblxuXG5cblxuYCxcbiAgc3R5bGVzOiBbYC5uZ3gtZG5kLWl0ZW17bWFyZ2luOjEwcHg7cGFkZGluZzoxMHB4O2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMik7dHJhbnNpdGlvbjpvcGFjaXR5IC40cyBlYXNlLWluLW91dDtib3JkZXI6MXB4IHNvbGlkICNhZGQ4ZTY7ZGlzcGxheTpibG9ja30ubmd4LWRuZC1pdGVtLmhhcy1oYW5kbGUgW25neERyYWdIYW5kbGVdLC5uZ3gtZG5kLWl0ZW0uaGFzLWhhbmRsZSBbbmd4ZHJhZ2hhbmRsZV0sLm5neC1kbmQtaXRlbTpub3QoLmhhcy1oYW5kbGUpOm5vdCgubW92ZS1kaXNhYmxlZCl7Y3Vyc29yOm1vdmU7Y3Vyc29yOmdyYWI7Y3Vyc29yOi13ZWJraXQtZ3JhYn0ubmd4LWRuZC1pdGVtIC5uZ3gtZG5kLWNvbnRlbnR7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5uZ3gtZG5kLWl0ZW06aG92ZXJ7Ym9yZGVyOjFweCBzb2xpZCAjMDBmfS5ndS1taXJyb3J7cG9zaXRpb246Zml4ZWQhaW1wb3J0YW50O21hcmdpbjowIWltcG9ydGFudDt6LWluZGV4Ojk5OTkhaW1wb3J0YW50O29wYWNpdHk6Ljh9Lmd1LWhpZGV7ZGlzcGxheTpub25lIWltcG9ydGFudH0uZ3UtdW5zZWxlY3RhYmxley13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZSFpbXBvcnRhbnQ7LW1vei11c2VyLXNlbGVjdDpub25lIWltcG9ydGFudDstbXMtdXNlci1zZWxlY3Q6bm9uZSFpbXBvcnRhbnQ7dXNlci1zZWxlY3Q6bm9uZSFpbXBvcnRhbnR9Lmd1LXRyYW5zaXR7b3BhY2l0eTouMn1gXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgbW9kZWw6IGFueTtcblxuICBASW5wdXQoKVxuICBnZXQgZHJvcFpvbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Ryb3Bab25lIHx8IHRoaXMuY29udGFpbmVyLmRyb3Bab25lO1xuICB9XG4gIHNldCBkcm9wWm9uZSh2YWwpIHtcbiAgICB0aGlzLl9kcm9wWm9uZSA9IHZhbDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBkcm9wWm9uZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Ryb3Bab25lcyB8fCB0aGlzLmNvbnRhaW5lci5kcm9wWm9uZXM7XG4gIH1cbiAgc2V0IGRyb3Bab25lcyh2YWwpIHtcbiAgICB0aGlzLl9kcm9wWm9uZXMgPSB2YWw7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgZHJvcHBhYmxlSXRlbUNsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9kcm9wcGFibGVJdGVtQ2xhc3MgfHwgdGhpcy5jb250YWluZXIuZHJvcHBhYmxlSXRlbUNsYXNzO1xuICB9XG4gIHNldCBkcm9wcGFibGVJdGVtQ2xhc3ModmFsKSB7XG4gICAgdGhpcy5fZHJvcHBhYmxlSXRlbUNsYXNzID0gdmFsO1xuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IHJlbW92ZU9uU3BpbGwoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9yZW1vdmVPblNwaWxsID09PSAnYm9vbGVhbicgPyB0aGlzLl9yZW1vdmVPblNwaWxsIDogdGhpcy5jb250YWluZXIucmVtb3ZlT25TcGlsbDtcbiAgfVxuICBzZXQgcmVtb3ZlT25TcGlsbCh2YWwpIHtcbiAgICB0aGlzLl9yZW1vdmVPblNwaWxsID0gdmFsO1xuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IGNvcHkoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9jb3B5ID09PSAnYm9vbGVhbicgPyB0aGlzLl9jb3B5IDogdGhpcy5jb250YWluZXIuY29weTtcbiAgfVxuICBzZXQgY29weSh2YWwpIHtcbiAgICB0aGlzLl9jb3B5ID0gdmFsO1xuICB9XG5cbiAgX2NvcHkgPSBmYWxzZTtcbiAgX2Ryb3Bab25lOiBhbnk7XG4gIF9kcm9wWm9uZXM6IGFueTtcbiAgX2Ryb3BwYWJsZUl0ZW1DbGFzczogYW55O1xuICBfcmVtb3ZlT25TcGlsbCA9IGZhbHNlO1xuICBkYXRhOiBhbnk7XG5cbiAgZ2V0IGhhc0hhbmRsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kcmFnZ2FibGVEaXJlY3RpdmUuaGFzSGFuZGxlO1xuICB9XG5cbiAgZ2V0IG1vdmVEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuZHJhZ2dhYmxlRGlyZWN0aXZlLmNhbk1vdmUoKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgY2xhc3NTdHJpbmcoKSB7XG4gICAgY29uc3QgaXRlbUNsYXNzID1cbiAgICAgIHR5cGVvZiB0aGlzLmRyb3BwYWJsZUl0ZW1DbGFzcyA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuZHJvcHBhYmxlSXRlbUNsYXNzKHRoaXMubW9kZWwpIDogdGhpcy5kcm9wcGFibGVJdGVtQ2xhc3M7XG5cbiAgICBjb25zdCBjbGFzc2VzID0gWyduZ3gtZG5kLWl0ZW0nLCBpdGVtQ2xhc3MgfHwgJyddO1xuICAgIGlmICh0aGlzLm1vdmVEaXNhYmxlZCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKCdtb3ZlLWRpc2FibGVkJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmhhc0hhbmRsZSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKCdoYXMtaGFuZGxlJyk7XG4gICAgfVxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIGdldCB0eXBlKCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMubW9kZWwpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLm1vZGVsO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGNvbnRhaW5lcjogQ29udGFpbmVyQ29tcG9uZW50LCBwdWJsaWMgZHJhZ2dhYmxlRGlyZWN0aXZlOiBEcmFnZ2FibGVEaXJlY3RpdmUpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kYXRhID0ge1xuICAgICAgbW9kZWw6IHRoaXMubW9kZWwsXG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICBkcm9wWm9uZTogdGhpcy5kcm9wWm9uZSxcbiAgICAgIHRlbXBsYXRlOiB0aGlzLmNvbnRhaW5lci50ZW1wbGF0ZVxuICAgIH07XG4gIH1cbn1cbiJdfQ==