import { CreateBookingComponent } from './../../../bookings/create-booking/create-booking.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { Place } from './../../place.model';
import { PlacesService } from './../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place:Place;

  constructor(
    private router:Router,
    private navController:NavController,
    private activatedRoute:ActivatedRoute,
    private placesService:PlacesService,
    private modalController:ModalController,
    private actionSheetController:ActionSheetController
    ){}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('placeId')){
        this.navController.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }

  onBookPlace(){
    //this.router.navigateByUrl('/places/tabs/discover');
    //or below
    //this.router.navigate(['/','places','tabs','discover']);
    //or below
    // this.navcontroller.navigateBack(['/','places','tabs','discover']);
    //or below
    //this.navController.navigateBack('/places/tabs/discover');
    //this.navController.navigateForward('/bookings');

    // this.modalController.create({
    //   component: CreateBookingComponent,
    //   componentProps: {selectedPlace: this.place},
    //   id: "modal1"
    // })
    // .then(modalElement=>{
    //   modalElement.present();
    //   return modalElement.onDidDismiss();
    // })
    // .then(resultData=>{
    //   console.log(resultData.data,resultData.role);
    //   if(resultData.role==="confirm"){
    //     console.log("Your booking is confirmed");
    //   }
    // });

    this.actionSheetController.create({
      header:'Choose an action',
      buttons:[
        {
          text:'Select Date',
          handler:()=>{
            this.openBookingModal('select');
          }
        },
        {
          text:'Random Date',
          handler:()=>{
            this.openBookingModal('random');
          }
        },
        {
          text:'Cancel',
          role:'destructive'//makes button color red
          //role:'cancel'
        }
      ]
    })
    .then((actionSheetElement)=>{
      actionSheetElement.present();
    });
  }

  openBookingModal(mode:'select'|'random'){
    console.log(mode);
    this.modalController.create({
      component: CreateBookingComponent,
      componentProps: {selectedPlace: this.place},
      id: "modal1"
    })
    .then(modalElement=>{
      modalElement.present();
      return modalElement.onDidDismiss();
    })
    .then(resultData=>{
      console.log(resultData.data,resultData.role);
      if(resultData.role==="confirm"){
        console.log("Your booking is confirmed");
      }
    });
  }

}



