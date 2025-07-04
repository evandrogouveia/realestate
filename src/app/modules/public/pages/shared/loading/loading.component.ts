import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':leave', [
          style({opacity: 1}),
          animate('400ms', style({opacity: 0}))
        ])
      ]
    )
  ],
})

export class LoadingComponent implements OnInit {
  
  @Input() loading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
