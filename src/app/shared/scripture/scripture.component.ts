import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-scripture',
  templateUrl: './scripture.component.html',
  styleUrls: ['./scripture.component.css']
})
export class ScriptureComponent {

  constructor(){}

  @Input() content!: string;

  @Input() bookName!: string;

  @Output() modalBoolValue = new EventEmitter<boolean>();

  closeModal(){
    this.modalBoolValue.emit(false);
    this.content = "";
    this.bookName = "";
  }

}
