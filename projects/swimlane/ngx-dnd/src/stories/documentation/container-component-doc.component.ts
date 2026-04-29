import { ChangeDetectionStrategy, Component } from '@angular/core';

import containerDocSource from './container-component.mx';

import type { ContainerComponentDoc } from './container-component-doc.types';

@Component({
  selector: 'ngx-dnd-container-component-doc',
  standalone: true,
  templateUrl: './container-component-doc.component.html',
  styleUrl: './container-component-doc.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponentDocComponent {
  readonly doc: ContainerComponentDoc = JSON.parse(containerDocSource) as ContainerComponentDoc;
}
