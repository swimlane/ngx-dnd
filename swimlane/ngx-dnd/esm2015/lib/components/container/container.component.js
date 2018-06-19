/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, ViewEncapsulation, ContentChild, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { DroppableDirective } from '../../directives/ngx-droppable.directive';
let /** @type {?} */ i = 0;
/**
 * @return {?}
 */
function getNextId() {
    return i++;
}
/**
 * Component that allows nested ngxDroppable and ngxDraggables
 *
 * @export
 */
export class ContainerComponent {
    constructor() {
        this.copy = false;
        this.removeOnSpill = false;
        this.dropZone = `@@DefaultDropZone-${getNextId()}@@`;
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
    get dropZones() {
        return this._dropZones || this._defaultZones;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set dropZones(val) {
        this._dropZones = val;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._defaultZones = [this.dropZone];
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.droppable.drag.subscribe((v) => this.drag.emit(v));
        this.droppable.drop.subscribe((v) => this.drop.emit(v));
        this.droppable.over.subscribe((v) => this.over.emit(v));
        this.droppable.out.subscribe((v) => this.out.emit(v));
        this.droppable.remove.subscribe((v) => this.remove.emit(v));
        this.droppable.cancel.subscribe((v) => this.cancel.emit(v));
    }
}
ContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-dnd-container',
                template: `<div
  ngxDroppable
  [dropZone]="dropZone"
  [model]="model"
  [copy]="copy"
  [ngClass]="{ 'gu-empty': !model?.length }"
  [removeOnSpill]="removeOnSpill"
  class='ngx-dnd-container'>
  <ng-container *ngIf="model">
    <ng-container *ngFor="let item of model">
      <ngx-dnd-item
        ngxDraggable
        [model]="item"
        [dropZone]="dropZone"
        [dropZones]="dropZones"
        [copy]="copy"
        [moves]="moves"
        [removeOnSpill]="removeOnSpill"
        [droppableItemClass]="droppableItemClass">
      </ngx-dnd-item>
    </ng-container>
  </ng-container>
  <ng-content *ngIf="!model"></ng-content>
</div>
`,
                styles: [`.ngx-dnd-container{background-color:rgba(255,255,255,.2);border:2px solid red;margin:10px;padding:10px}.ngx-dnd-container.gu-empty{border:2px dotted red}.ngx-dnd-container:nth-child(odd){background-color:rgba(0,0,0,.2)}.ngx-dnd-container .ex-moved{background-color:#e74c3c}.ngx-dnd-container .ex-over{background-color:rgba(255,255,255,.3)}.ngx-dnd-container .handle{padding:0 5px;margin-right:5px;background-color:rgba(0,0,0,.4);cursor:move}.no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}`],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
ContainerComponent.propDecorators = {
    "model": [{ type: Input },],
    "copy": [{ type: Input },],
    "removeOnSpill": [{ type: Input },],
    "droppableItemClass": [{ type: Input },],
    "dropZone": [{ type: Input },],
    "dropZones": [{ type: Input },],
    "moves": [{ type: Input },],
    "template": [{ type: Input }, { type: ContentChild, args: [TemplateRef,] },],
    "droppable": [{ type: Input }, { type: ViewChild, args: [DroppableDirective,] },],
    "drop": [{ type: Output },],
    "drag": [{ type: Output },],
    "over": [{ type: Output },],
    "out": [{ type: Output },],
    "remove": [{ type: Output },],
    "cancel": [{ type: Output },],
};
function ContainerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ContainerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ContainerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ContainerComponent.propDecorators;
    /** @type {?} */
    ContainerComponent.prototype.model;
    /** @type {?} */
    ContainerComponent.prototype.copy;
    /** @type {?} */
    ContainerComponent.prototype.removeOnSpill;
    /** @type {?} */
    ContainerComponent.prototype.droppableItemClass;
    /** @type {?} */
    ContainerComponent.prototype.dropZone;
    /** @type {?} */
    ContainerComponent.prototype.moves;
    /** @type {?} */
    ContainerComponent.prototype.template;
    /** @type {?} */
    ContainerComponent.prototype.droppable;
    /** @type {?} */
    ContainerComponent.prototype.drop;
    /** @type {?} */
    ContainerComponent.prototype.drag;
    /** @type {?} */
    ContainerComponent.prototype.over;
    /** @type {?} */
    ContainerComponent.prototype.out;
    /** @type {?} */
    ContainerComponent.prototype.remove;
    /** @type {?} */
    ContainerComponent.prototype.cancel;
    /** @type {?} */
    ContainerComponent.prototype._dropZones;
    /** @type {?} */
    ContainerComponent.prototype._defaultZones;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZG5kLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY29udGFpbmVyL2NvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBR1QsS0FBSyxFQUNMLE1BQU0sRUFDTixpQkFBaUIsRUFDakIsWUFBWSxFQUNaLFdBQVcsRUFDWCxTQUFTLEVBQ1QsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRTlFLHFCQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7QUFDVjtJQUNFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztDQUNaOzs7Ozs7QUFxQ0QsTUFBTTs7b0JBRVksS0FBSzs2QkFDSSxLQUFLO3dCQUdWLHFCQUFxQixTQUFTLEVBQUUsSUFBSTtvQkF1QnBCLElBQUksWUFBWSxFQUFPO29CQUV2QixJQUFJLFlBQVksRUFBTztvQkFFdkIsSUFBSSxZQUFZLEVBQU87bUJBRXhCLElBQUksWUFBWSxFQUFPO3NCQUVwQixJQUFJLFlBQVksRUFBTztzQkFFdkIsSUFBSSxZQUFZLEVBQU87Ozs7O1FBOUJ6RCxTQUFTO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQzs7Ozs7O0lBRS9DLElBQUksU0FBUyxDQUFDLEdBQUc7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztLQUN2Qjs7OztJQThCRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN0Qzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNsRTs7O1lBckZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXdCWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxzakJBQXNqQixDQUFDO2dCQUNoa0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDdEM7Ozs7c0JBRUUsS0FBSztxQkFDTCxLQUFLOzhCQUNMLEtBQUs7bUNBQ0wsS0FBSzt5QkFFTCxLQUFLOzBCQUVMLEtBQUs7c0JBUUwsS0FBSzt5QkFLTCxLQUFLLFlBQ0wsWUFBWSxTQUFDLFdBQVc7MEJBR3hCLEtBQUssWUFDTCxTQUFTLFNBQUMsa0JBQWtCO3FCQUc1QixNQUFNO3FCQUVOLE1BQU07cUJBRU4sTUFBTTtvQkFFTixNQUFNO3VCQUVOLE1BQU07dUJBRU4sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ29udGVudENoaWxkLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERyb3BwYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvbmd4LWRyb3BwYWJsZS5kaXJlY3RpdmUnO1xuXG5sZXQgaSA9IDA7XG5mdW5jdGlvbiBnZXROZXh0SWQoKSB7XG4gIHJldHVybiBpKys7XG59XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgYWxsb3dzIG5lc3RlZCBuZ3hEcm9wcGFibGUgYW5kIG5neERyYWdnYWJsZXNcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1kbmQtY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2XG4gIG5neERyb3BwYWJsZVxuICBbZHJvcFpvbmVdPVwiZHJvcFpvbmVcIlxuICBbbW9kZWxdPVwibW9kZWxcIlxuICBbY29weV09XCJjb3B5XCJcbiAgW25nQ2xhc3NdPVwieyAnZ3UtZW1wdHknOiAhbW9kZWw/Lmxlbmd0aCB9XCJcbiAgW3JlbW92ZU9uU3BpbGxdPVwicmVtb3ZlT25TcGlsbFwiXG4gIGNsYXNzPSduZ3gtZG5kLWNvbnRhaW5lcic+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RlbFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbW9kZWxcIj5cbiAgICAgIDxuZ3gtZG5kLWl0ZW1cbiAgICAgICAgbmd4RHJhZ2dhYmxlXG4gICAgICAgIFttb2RlbF09XCJpdGVtXCJcbiAgICAgICAgW2Ryb3Bab25lXT1cImRyb3Bab25lXCJcbiAgICAgICAgW2Ryb3Bab25lc109XCJkcm9wWm9uZXNcIlxuICAgICAgICBbY29weV09XCJjb3B5XCJcbiAgICAgICAgW21vdmVzXT1cIm1vdmVzXCJcbiAgICAgICAgW3JlbW92ZU9uU3BpbGxdPVwicmVtb3ZlT25TcGlsbFwiXG4gICAgICAgIFtkcm9wcGFibGVJdGVtQ2xhc3NdPVwiZHJvcHBhYmxlSXRlbUNsYXNzXCI+XG4gICAgICA8L25neC1kbmQtaXRlbT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxuZy1jb250ZW50ICpuZ0lmPVwiIW1vZGVsXCI+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLm5neC1kbmQtY29udGFpbmVye2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuMik7Ym9yZGVyOjJweCBzb2xpZCByZWQ7bWFyZ2luOjEwcHg7cGFkZGluZzoxMHB4fS5uZ3gtZG5kLWNvbnRhaW5lci5ndS1lbXB0eXtib3JkZXI6MnB4IGRvdHRlZCByZWR9Lm5neC1kbmQtY29udGFpbmVyOm50aC1jaGlsZChvZGQpe2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMil9Lm5neC1kbmQtY29udGFpbmVyIC5leC1tb3ZlZHtiYWNrZ3JvdW5kLWNvbG9yOiNlNzRjM2N9Lm5neC1kbmQtY29udGFpbmVyIC5leC1vdmVye2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuMyl9Lm5neC1kbmQtY29udGFpbmVyIC5oYW5kbGV7cGFkZGluZzowIDVweDttYXJnaW4tcmlnaHQ6NXB4O2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNCk7Y3Vyc29yOm1vdmV9Lm5vLXNlbGVjdHstd2Via2l0LXRvdWNoLWNhbGxvdXQ6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgbW9kZWw6IGFueTtcbiAgQElucHV0KCkgY29weSA9IGZhbHNlO1xuICBASW5wdXQoKSByZW1vdmVPblNwaWxsID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRyb3BwYWJsZUl0ZW1DbGFzczogc3RyaW5nIHwgKChvOiBhbnkpID0+IGFueSk7XG5cbiAgQElucHV0KCkgZHJvcFpvbmUgPSBgQEBEZWZhdWx0RHJvcFpvbmUtJHtnZXROZXh0SWQoKX1AQGA7XG5cbiAgQElucHV0KClcbiAgZ2V0IGRyb3Bab25lcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcFpvbmVzIHx8IHRoaXMuX2RlZmF1bHRab25lcztcbiAgfVxuICBzZXQgZHJvcFpvbmVzKHZhbCkge1xuICAgIHRoaXMuX2Ryb3Bab25lcyA9IHZhbDtcbiAgfVxuXG4gIEBJbnB1dCgpIG1vdmVzOiAobW9kZWw6IGFueSwgc291cmNlOiBhbnksIGhhbmRsZTogYW55LCBzaWJsaW5nOiBhbnkpID0+IGJvb2xlYW47XG5cbiAgLy8gQElucHV0KCkgY2xhc3NlczogYW55ID0ge307XG4gIC8vIEBJbnB1dCgpIGRyYWd1bGFPcHRpb25zOiBhbnk7XG5cbiAgQElucHV0KClcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZilcbiAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KClcbiAgQFZpZXdDaGlsZChEcm9wcGFibGVEaXJlY3RpdmUpXG4gIGRyb3BwYWJsZTogYW55O1xuXG4gIEBPdXRwdXQoKSBkcm9wOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBkcmFnOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvdmVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvdXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgY2FuY2VsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIF9kcm9wWm9uZXM6IHN0cmluZ1tdO1xuICBfZGVmYXVsdFpvbmVzOiBzdHJpbmdbXTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9kZWZhdWx0Wm9uZXMgPSBbdGhpcy5kcm9wWm9uZV07XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kcm9wcGFibGUuZHJhZy5zdWJzY3JpYmUoKHY6IGFueSkgPT4gdGhpcy5kcmFnLmVtaXQodikpO1xuICAgIHRoaXMuZHJvcHBhYmxlLmRyb3Auc3Vic2NyaWJlKCh2OiBhbnkpID0+IHRoaXMuZHJvcC5lbWl0KHYpKTtcbiAgICB0aGlzLmRyb3BwYWJsZS5vdmVyLnN1YnNjcmliZSgodjogYW55KSA9PiB0aGlzLm92ZXIuZW1pdCh2KSk7XG4gICAgdGhpcy5kcm9wcGFibGUub3V0LnN1YnNjcmliZSgodjogYW55KSA9PiB0aGlzLm91dC5lbWl0KHYpKTtcbiAgICB0aGlzLmRyb3BwYWJsZS5yZW1vdmUuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHRoaXMucmVtb3ZlLmVtaXQodikpO1xuICAgIHRoaXMuZHJvcHBhYmxlLmNhbmNlbC5zdWJzY3JpYmUoKHY6IGFueSkgPT4gdGhpcy5jYW5jZWwuZW1pdCh2KSk7XG4gIH1cbn1cbiJdfQ==