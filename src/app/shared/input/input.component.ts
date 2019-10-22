import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import {NgModel} from '@angular/forms'

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  input: any;
  @Input() label: string;
  @Input() errorMessage: string;

  @ContentChild(NgModel) model: NgModel;

  constructor() { }

  ngOnInit() { }

  ngAfterContentInit() {
  	this.input = this.model;
  	if (this.input === undefined) {
  		throw new Error("Essa diretiva precisar ser usada com diretiva ngModel");
  	}
  }

  hasSuccess(): boolean {
	return this.input.valid && (this.input.dirt || this.input.touched) && this.errorMessage !== undefined;
  }

  hasError(): boolean {
  	return !this.input.valid && (this.input.dirt || this.input.touched)	&& this.errorMessage !== undefined;
  }

}