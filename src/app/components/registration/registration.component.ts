import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup; 
  constructor(public fb: FormBuilder,
              private _authService: AuthService,
              private _router: Router,
              public fleshMessage: FlashMessagesService ) { 
    this.registrationForm = this.fb.group({
      'userName': ['', [Validators.required ]],
      'userEmail': ['', [Validators.required, Validators.email ]],
      'password': this.fb.group({
        'userPassword': ['', [Validators.required, Validators.minLength(6)]],
        'confirmPassword': ['', [Validators.required ]]
    }, {validator: this.ConfirmPassword })
      })
      
   }
  
  ngOnInit() {

  }
  checkNameIsTaken(control: FormControl): ValidationErrors | null{
    return control.value;
  }

  checkEmailIsTaken(control: FormControl): ValidationErrors | null{
    return control.value;
  }
  ConfirmPassword(control:FormGroup): ValidationErrors | null {
    const userPassword = control.get('userPassword').value;
    const confirmPassword = control.get('confirmPassword').value;
    if(userPassword !== confirmPassword){
      control.get('confirmPassword').setErrors({confirmPasswordError:true});
    } 
    return null;
  }
  getUserNameError(){
    return this.registrationForm.controls['userName'].hasError('required') ? 'Необходимо ввести свое имя' : 
    this.registrationForm.controls['userName'].hasError('checkNameIsTaken') ? 'Пользователь с таким именем уже зарегистрирован' : '';
  }
  getUserEmailError(){
    return this.registrationForm.controls['userEmail'].hasError('required') ? 'Необходимо ввести свой email': 
    this.registrationForm.controls['userEmail'].hasError('email') ? 'Email введен неверно' : 
    this.registrationForm.controls['userEmail'].hasError('checkEmailIsTaken') ? 'Этот email уже зарегистрирован в системе': '';
  }
  getUserPasswordError(){
    return this.registrationForm.controls['password'].get('userPassword').hasError('required') ? 'Необходимо ввести пароль':
    this.registrationForm.controls['password'].get('userPassword').hasError('minlength') ? 'Пароль не соответствует требованиям' : '';
  }
  getConfirmPasswordError(){
    return this.registrationForm.controls['password'].get('confirmPassword').hasError('required') ? 'Необходимо повторно ввести пароль':
    this.registrationForm.controls['password'].get('confirmPassword').hasError('confirmPasswordError') ? 'Пароли не совпадают': '';
  }
  onSubmit(){
    this._authService.registration(this.registrationForm.controls['userEmail'].value, this.registrationForm.controls['password'].get('userPassword').value).then((user)=>{
      if(user){
        this._router.navigate(['/panel']);
        this.fleshMessage.show('Registration success', {
          cssClass: 'alert alert-primary', timeout: 2500
        })
      }
    }).catch((error)=>{
      if(error){
        this.fleshMessage.show('Registration error', {
          cssClass: 'alert alert-danger', timeout: 2500
        })
      }
    })
  }
}
