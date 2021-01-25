import { FormGroup,FormControl,Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Place } from './../../place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from './../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  form:FormGroup;
  place:Place;

  constructor(
    private activatedRoute:ActivatedRoute,
    private placesService:PlacesService,
    private navController:NavController
  ){}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('placeId')){
        this.navController.navigateBack('/places/tabs/offers');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));

      this.form = new FormGroup({
        title: new FormControl(this.place.title,{updateOn:'blur',validators:[Validators.required]}),
        description: new FormControl(this.place.description,{updateOn:'blur',validators:[Validators.required, Validators.maxLength(180)]})
      });
    });
  }

  onUpdateOffer(){
    if(!this.form.valid){
      return;
    }
    console.log(this.form);
  }

}
