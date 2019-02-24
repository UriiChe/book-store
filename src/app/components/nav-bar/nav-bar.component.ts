import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLogin:boolean = false;
  userName: string;
  isPublic:boolean = false;
  showNav:boolean = false;
  constructor( private authService: AuthService,
               private router: Router,
               public fleshMessage: FlashMessagesService) { }
  logout(){
    this.authService.logout().then(()=>{
      this.router.navigate(['/login']);
    });
  }
  changeBtn(){
    this.showNav = !this.showNav;
    console.log(this.showNav);
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe(auth=>{
      if(auth){
        this.isLogin = true;
        this.userName = auth.email;
      } else {
        this.userName = "";
        this.isLogin = false;
      }
    });
    this.router.events.subscribe((e:Event)=>{
      if(e instanceof NavigationEnd){
        this.isPublic = e.url.indexOf('panel') === -1;
      }
    })
  }
}
