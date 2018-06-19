/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './directives/ngx-draggable.directive';
import { DroppableDirective } from './directives/ngx-droppable.directive';
import { DragHandleDirective } from './directives/ngx-drag-handle.directive';
import { ContainerComponent } from './components/container/container.component';
import { ItemComponent } from './components/item/item.component';
import { DrakeStoreService } from './services/drake-store.service';
var /** @type {?} */ components = [ContainerComponent, ItemComponent];
var /** @type {?} */ directives = [DraggableDirective, DroppableDirective, DragHandleDirective];
var NgxDnDModule = /** @class */ (function () {
    function NgxDnDModule() {
    }
    NgxDnDModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: tslib_1.__spread(components, directives),
                    exports: tslib_1.__spread(components, directives),
                    providers: [DrakeStoreService]
                },] },
    ];
    return NgxDnDModule;
}());
export { NgxDnDModule };
function NgxDnDModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgxDnDModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgxDnDModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRuZC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRuZC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtZG5kLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVuRSxxQkFBTSxVQUFVLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUN2RCxxQkFBTSxVQUFVLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDOzs7OztnQkFFaEYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsWUFBWSxtQkFBTSxVQUFVLEVBQUssVUFBVSxDQUFDO29CQUM1QyxPQUFPLG1CQUFNLFVBQVUsRUFBSyxVQUFVLENBQUM7b0JBQ3ZDLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2lCQUMvQjs7dUJBbEJEOztTQW1CYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IERyYWdnYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcm9wcGFibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmd4LWRyb3BwYWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJhZ0hhbmRsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtZHJhZy1oYW5kbGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb250YWluZXIvY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2l0ZW0vaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRHJha2VTdG9yZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2RyYWtlLXN0b3JlLnNlcnZpY2UnO1xuXG5jb25zdCBjb21wb25lbnRzID0gW0NvbnRhaW5lckNvbXBvbmVudCwgSXRlbUNvbXBvbmVudF07XG5jb25zdCBkaXJlY3RpdmVzID0gW0RyYWdnYWJsZURpcmVjdGl2ZSwgRHJvcHBhYmxlRGlyZWN0aXZlLCBEcmFnSGFuZGxlRGlyZWN0aXZlXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogWy4uLmNvbXBvbmVudHMsIC4uLmRpcmVjdGl2ZXNdLFxuICBleHBvcnRzOiBbLi4uY29tcG9uZW50cywgLi4uZGlyZWN0aXZlc10sXG4gIHByb3ZpZGVyczogW0RyYWtlU3RvcmVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hEbkRNb2R1bGUge31cbiJdfQ==