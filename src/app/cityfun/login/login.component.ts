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
import {accessTokenInfo, Base, loginInfo} from "../../types/types";

import { switchMap ,map} from 'rxjs/operators';

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
    let accessToken = ''; 
    this.submitted = true;
    if (this.form.valid) {
      this.cfHttp.post('pt.login',{ // pt.login
        password: this.password.value,
        userName: this.account.value,
      })
      .pipe(
        map((res: Base<loginInfo>) => res.data),
        switchMap((loginInfo: loginInfo) => {
            accessToken = loginInfo.accessToken;
          return this.cfHttp
            .get('authinfo', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            })
        })
      ).subscribe((result:Base<any>)=>{
          if (result && result.code == 1 ) {
            this.loginSuccessCallBack(result.data,accessToken);
            this.mzMessageService.info(result.msg);
            this.router.navigate(['./layout']);
          } else {
            this.submitted = false;
            this.mzMessageService.error(result.msg);
          }
        },
        (error) => {
          this.loginError(error);
        });
    }
   
  }
  private loginSuccessCallBack(userInfo,accessToken) {
    this.submitted = false;
    localStorage.setItem('accessToken',JSON.stringify({
      value:accessToken
    }));
    localStorage.setItem('user-info', JSON.stringify(userInfo));
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
