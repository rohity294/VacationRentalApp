import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from './../places.service';
import { Place } from './../place.model';
import { MenuController } from '@ionic/angular';
import {SegmentChangeEventDetail} from '@ionic/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit,OnDestroy {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  relevantPlaces: Place[];
  private placesSub:Subscription;
  chosenFilter = 'all';
  isLoading = false;

  constructor(private placesService:PlacesService,private menuController:MenuController,private authService:AuthService) { }
  
  //1:begins
  /*ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(zplaces=>{ 
      this.loadedPlaces = zplaces;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }) 
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
    this.relevantPlaces = event.detail.value==='all'?this.loadedPlaces:this.loadedPlaces.filter(place=>place.userId!==this.authService.userId);
    this.listedLoadedPlaces = this.relevantPlaces.slice(1);
  }*/

  // 1:above is buggy case and below is corrected case

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(zplaces=>{ 
      this.loadedPlaces = zplaces;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
      this.onFilterUpdate(this.chosenFilter);
    }) 
  }

  ionViewWillEnter(){
   this.isLoading = true;
   this.placesService.fetchPlaces2().subscribe(()=>{
     this.isLoading = false;
   });
  }

  onFilterUpdate(filterStringValue: string){
    console.log(filterStringValue);
    this.chosenFilter = filterStringValue;
    this.relevantPlaces = this.chosenFilter==='all'?this.loadedPlaces:this.loadedPlaces.filter(place=>place.userId!==this.authService.userId);
    this.listedLoadedPlaces = this.relevantPlaces.slice(1);
  }//1:ends

  onOpenMenu(){
    this.menuController.toggle();
  }
  

  ngOnDestroy(){
    if(this.placesSub){
      this.placesSub.unsubscribe();
    }
  }

}
