import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import type { DirectiveDoc } from './directive-doc.types';

@Component({
  selector: 'ngx-dnd-directive-doc',
  standalone: true,
  templateUrl: './directive-doc.component.html',
  styleUrl: './directive-doc.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectiveDocComponent {
  @Input({ required: true }) doc!: DirectiveDoc;
}
