import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:User = {
    email: "",
    password: ""
  }
  constructor(private _authService: AuthService,
              private _router: Router,
              public fleshMessage: FlashMessagesService) { }
  onSubmit(){
    this._authService.login(this.user.email, this.user.password).then(user=>{
      this._router.navigate(['/panel']);
      this.fleshMessage.show('Welcome to Book store!', {
        cssClass: 'alert-success', timeout: 3000
      })
    }).catch(error=>{
      this.fleshMessage.show(`${error.message}`, {
        cssClass: 'alert-danger', timeout: 5000
      });
    })
  }
  ngOnInit() {
  }

}
