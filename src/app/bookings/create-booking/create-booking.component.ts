import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  
  constructor(private modalController:ModalController) { }

  ngOnInit() {}

  onCancel(){
    this.modalController.dismiss("null","cancel","modal1");
    //arguments 1,2,3 above are respectively:data passed by model,role to identify which button was clicked modal id, where third argument modal id is optional, and it's absence the topmost modal on the stack would be automatically closed.
    console.log("booking cancelled");
  }

  onBookPlace(){
    this.modalController.dismiss({message:'booking confirmed!'},"confirm","modal1");
    console.log("booking placed");
  }

}
