import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent {
  @Input() messageNumber!: string;

  @Input() messageTitle!: string;

  @Input() messageDescription!: string;
}
