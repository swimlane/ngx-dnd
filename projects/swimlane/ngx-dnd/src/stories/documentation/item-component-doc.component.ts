import { ChangeDetectionStrategy, Component } from '@angular/core';

import itemDocSource from './item-component.mx';

import type { ItemComponentDoc } from './item-component-doc.types';

@Component({
  selector: 'ngx-dnd-item-component-doc',
  standalone: true,
  templateUrl: './item-component-doc.component.html',
  styleUrl: './item-component-doc.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponentDocComponent {
  readonly doc: ItemComponentDoc = JSON.parse(itemDocSource) as ItemComponentDoc;
}
