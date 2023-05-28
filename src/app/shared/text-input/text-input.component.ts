import { Component, OnInit, ViewChild, ElementRef, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor, OnInit{

  @ViewChild('input', { static: true }) input!: ElementRef;

  @Input() type = "text";

  @Input() label!: string;

  constructor(@Self() public controlDir: NgControl){
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;

    const validators = control?.validator ? [control.validator] : []

    control?.setValidators(validators);

    control?.updateValueAndValidity();
  }

  onChange(event: Event){
    return (event.target as HTMLInputElement).value
  }

  onTouched(){}

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error('Method not implemented.');
  // }

}
