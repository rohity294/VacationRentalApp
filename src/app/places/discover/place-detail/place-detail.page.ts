import { AuthService } from './../../../auth/auth.service';
import { BookingService } from './../../../bookings/booking.service';
import { Subscription } from 'rxjs';
import { CreateBookingComponent } from './../../../bookings/create-booking/create-booking.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  ModalController,
  NavController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { Place } from './../../place.model';
import { PlacesService } from './../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  isBookable = false;
  isLoading = false;
  private placeSub: Subscription;

  constructor(
    private router: Router,
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private bookingService: BookingService,
    private loadingController: LoadingController,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navController.navigateBack('/places/tabs/discover');
        return;
      }
      // this.place = this.placesService.getPlace(paramMap.get('placeId'));
      this.isLoading = true;
      this.placeSub = this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe(
          (zplace) => {
            this.place = zplace;
            this.isBookable = zplace.userId !== this.authService.userId;
            this.isLoading = false;
          },
          (error) => {
            this.alertController
              .create({
                header: 'An error occured!',
                message: 'Could not load this place!',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      this.router.navigate(['/places/tabs/discover']);
                    },
                  }
                ]
              })
              .then((alertElement) => {
                alertElement.present();
              });
          }
        );
    });
  }

  onBookPlace() {
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

    this.actionSheetController
      .create({
        header: 'Choose an action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            },
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            },
          },
          {
            text: 'Cancel',
            role: 'destructive', //makes button color red
            //role:'cancel'
          },
        ],
      })
      .then((actionSheetElement) => {
        actionSheetElement.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalController
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place, selectedMode: mode },
        id: 'modal1',
      })
      .then((modalElement) => {
        modalElement.present();
        return modalElement.onDidDismiss();
      })
      .then((resultData) => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm') {
          //console.log("Your booking is confirmed");
          this.loadingController
            .create({ message: 'Booking place...' })
            .then((loadingElement) => {
              loadingElement.present();
              this.bookingService
                .addBooking(
                  this.place.id,
                  this.place.title,
                  this.place.imageUrl,
                  resultData.data.bookingData.firstName,
                  resultData.data.bookingData.lastName,
                  resultData.data.bookingData.guestNumber,
                  resultData.data.bookingData.startDate,
                  resultData.data.bookingData.endDate
                )
                .subscribe(() => {
                  loadingElement.dismiss();
                });
            });
        }
      });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe;
    }
  }
}
