import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { calcMD5 } from '../../shared/services/md5';
import {CfhttpService} from "../../services/cfhttp.service";
import {Base, loginInfo} from "../../types/types";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  webetaInfo = null;
  form: FormGroup;
  account: AbstractControl;
  password: AbstractControl;
  remembered = true;
  submitted = false;
  loginErrorInfo: string;
  constructor(
    fb: FormBuilder,
    private mzMessageService: NzMessageService,
    private router: Router,
    private cfHttp: CfhttpService
  ) {
    this.form = fb.group({
      account: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.account = this.form.controls['account'];
    this.password = this.form.controls['password'];

    if (localStorage.getItem('account')) {
      this.account.setValue(localStorage.getItem('account'));
    }
  }
  public rememberAccount(): void {
    this.remembered = !this.remembered;

    if (this.remembered) {
      localStorage.setItem('account', this.account.value);
    } else {
      localStorage.removeItem('account');
    }
  }
  ngOnInit() {
    this.getMeta(); // web meta info
  }
  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      // const params = {
      //   account: this.account.value,
      //   password: calcMD5(this.password.value),
      // };
      this.cfHttp.post('login',{
        password: this.password.value,
        userName: this.account.value,
      }).subscribe(
        (res: Base<loginInfo>) => {
          if (res && res.code == 1 ) {
            let userInfo   = Object.assign(res.data,{userName:this.account.value,})         ;
            this.loginSuccessCallBack(userInfo);
            this.mzMessageService.info(res.msg);
            this.router.navigate(['./layout']);
          } else {
            this.submitted = false;
            this.mzMessageService.error(res.msg);
          }
        },
        (error) => {
          this.loginError(error);
        }
      );
    }
  }
  private loginSuccessCallBack(userInfo) {
    // console.log(userInfo);
    const data = {
      data: userInfo,
      islogin: true,
    };
    this.submitted = false;
    sessionStorage.setItem('authInfo', JSON.stringify(data));
  }

  private loginError(error) {
    this.submitted = false;
    this.mzMessageService.error(error);
  }
  ngOnDestroy() {}
  getMeta() {
    this.cfHttp.get('web.meta'  ).subscribe((res) => {
      this.webetaInfo = res;
    });
  }
}
