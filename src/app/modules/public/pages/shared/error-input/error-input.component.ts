import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-input',
  templateUrl: './error-input.component.html',
  styleUrls: ['./error-input.component.scss']
})
export class ErrorInputComponent implements OnInit {
  @Input() msg: string;
  @Input() invalid: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
