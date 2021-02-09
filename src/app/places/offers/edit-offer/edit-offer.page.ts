import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  NavController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from './../../place.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from './../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  form: FormGroup;
  place: Place;
  placeId: string;
  isLoading = false;
  private placeSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private navController: NavController,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navController.navigateBack('/places/tabs/offers');
        return;
      }

      this.placeId = paramMap.get('placeId');

      // this.place = this.placesService.getPlace(paramMap.get('placeId'));

      this.isLoading = true;

      this.placeSub = this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe(
          (zplace) => {
            this.place = zplace;
            this.form = new FormGroup({
              title: new FormControl(this.place.title, {
                updateOn: 'blur',
                validators: [Validators.required],
              }),
              description: new FormControl(this.place.description, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)],
              }),
            });
            this.isLoading = false;
          },
          (error) => {
            this.alertController.create({
              header: 'An error occured!',
              message:
                'This place could not be fetched.Please try again later.',
              buttons:[{text:'OK',handler:()=>{
                this.router.navigate(['/places/tabs/offers']);
              }}]
            })
            .then(alertElement=>{
              alertElement.present();
            })
            ;
          }
        );
    });
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingController
      .create({
        message: 'Updating place...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.placesService
          .updatePlace(
            this.place.id,
            this.form.value.title,
            this.form.value.description
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/places/tabs/offers']);
          });
      });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe;
    }
  }
}
