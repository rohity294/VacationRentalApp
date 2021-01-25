import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {LoadingController} from '@ionic/angular';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

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

  onSwitchAuthMode(){
    this.isLogin = !this.isLogin;
  }

  onSubmit(form:NgForm){
    //console.log(form);
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email,password);

    if(this.isLogin){
      //send request to login server
    }else{
      //send reqeust to signup server
    }
  }
  
}
