import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() titleModal: string;
  @Input() titlePost: string;
  @Input() typeModal: string;
  @Input() data: any

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {}

  delete(){
    this.bsModalRef.content.callback(true);//emite um evento callback true para o modal
    this.bsModalRef.hide();
  }
  

}
