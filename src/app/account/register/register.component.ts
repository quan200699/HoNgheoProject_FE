import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../account.service';
import {SweetalertService} from '../../shared/sweetalert/sweetalert.service';
import {ICON_SUCCESS} from '../../shared/sweetalert/alert-const';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required,
      Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required,
      Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl('', [Validators.required,
      Validators.minLength(6), Validators.maxLength(20)])
  });

  constructor(private accountService: AccountService,
              private router: Router,
              private sweetalertService: SweetalertService) {
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  ngOnInit() {
  }

  register() {
    if (this.signUpForm.valid) {
      this.accountService.register(this.signUpForm.value).subscribe(() => {
        this.signUpForm.reset();
        this.router.navigateByUrl("/login").then(() => {
          this.sweetalertService.showNotification(ICON_SUCCESS, 'Register success!', 'Register new account successfully!');
        });
      });
    }
  }

  comparePassword() {
    if (this.password.value !== this.confirmPassword.value) {
      this.confirmPassword.setErrors({confirmPassword: true});
    } else {
      this.confirmPassword.setErrors(null);
    }
  }
}
