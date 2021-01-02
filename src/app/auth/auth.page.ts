import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {LoadingController} from '@ionic/angular';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;

  constructor(private authService:AuthService, private router:Router, private loadingController:LoadingController) { }

  ngOnInit() {
  }

  // onLogin(){
  //   this.isLoading = true;
  //   console.log("logged in");
  //   this.authService.login();
  //    // this.router.navigateByUrl('/places/tabs/discover');
  //   setTimeout(()=>{
  //     this.isLoading = false;
  //     this.router.navigateByUrl('/places/tabs/discover');
  //   },1500);
  // }

  onLogin(){
    this.isLoading = true;
    console.log("logged in");
    this.authService.login();
     // this.router.navigateByUrl('/places/tabs/discover');
    this.loadingController
      .create({keyboardClose:true, message:'Logging in...'})
      .then(loadingElement=>{
        loadingElement.present();
        setTimeout(()=>{
          this.isLoading = false;
          loadingElement.dismiss();
          this.router.navigateByUrl('/places/tabs/discover');
        },1500);
      });
  }
  
}
