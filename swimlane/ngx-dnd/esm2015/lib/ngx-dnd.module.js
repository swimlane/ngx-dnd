/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './directives/ngx-draggable.directive';
import { DroppableDirective } from './directives/ngx-droppable.directive';
import { DragHandleDirective } from './directives/ngx-drag-handle.directive';
import { ContainerComponent } from './components/container/container.component';
import { ItemComponent } from './components/item/item.component';
import { DrakeStoreService } from './services/drake-store.service';
const /** @type {?} */ components = [ContainerComponent, ItemComponent];
const /** @type {?} */ directives = [DraggableDirective, DroppableDirective, DragHandleDirective];
export class NgxDnDModule {
}
NgxDnDModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [...components, ...directives],
                exports: [...components, ...directives],
                providers: [DrakeStoreService]
            },] },
];
function NgxDnDModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgxDnDModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgxDnDModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRuZC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRuZC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtZG5kLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDMUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRW5FLHVCQUFNLFVBQVUsR0FBRyxDQUFDLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3ZELHVCQUFNLFVBQVUsR0FBRyxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFRakYsTUFBTTs7O1lBTkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxVQUFVLENBQUM7Z0JBQzVDLE9BQU8sRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLEdBQUcsVUFBVSxDQUFDO2dCQUN2QyxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzthQUMvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmd4LWRyYWdnYWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJvcHBhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25neC1kcm9wcGFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERyYWdIYW5kbGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmd4LWRyYWctaGFuZGxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29udGFpbmVyL2NvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9pdGVtL2l0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IERyYWtlU3RvcmVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9kcmFrZS1zdG9yZS5zZXJ2aWNlJztcblxuY29uc3QgY29tcG9uZW50cyA9IFtDb250YWluZXJDb21wb25lbnQsIEl0ZW1Db21wb25lbnRdO1xuY29uc3QgZGlyZWN0aXZlcyA9IFtEcmFnZ2FibGVEaXJlY3RpdmUsIERyb3BwYWJsZURpcmVjdGl2ZSwgRHJhZ0hhbmRsZURpcmVjdGl2ZV07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi5jb21wb25lbnRzLCAuLi5kaXJlY3RpdmVzXSxcbiAgZXhwb3J0czogWy4uLmNvbXBvbmVudHMsIC4uLmRpcmVjdGl2ZXNdLFxuICBwcm92aWRlcnM6IFtEcmFrZVN0b3JlU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RG5ETW9kdWxlIHt9XG4iXX0=