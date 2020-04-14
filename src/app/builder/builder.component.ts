import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BuilderComponent {
  sourceBuilderTools = [
    { name: 'Section', children: [] as any[], inputType: 'section', icon: 'far fa-square', class: 'wide' },
    { name: 'String', inputType: 'string', icon: 'fas fa-language', class: 'half' },
    { name: 'Number', inputType: 'number', icon: 'fas fa-hashtag', class: 'half' }
  ];
  targetBuilderTools: any[] = [];

  droppableItemClass = (item: any) => `${item.class} ${item.inputType}`;

  builderDrag(e: any) {
    const item = e.value;
    item.data = item.inputType === 'number' ? (Math.random() * 100) | 0 : Math.random().toString(36).substring(20);
  }

  log(e: any) {
    console.log(e.type, e);
  }

  canMove(e: any): boolean {
    return e.indexOf('Disabled') === -1;
  }
}
