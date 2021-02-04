import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import {UserServiceService} from '../user-service.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    aFormGroup: FormGroup;
    loginAPIResult;


  constructor(public userService: UserServiceService, public router: Router) { }

  ngOnInit(): void {
     this.loginFormInit();
  }

  loginFormInit()
  {
      this.aFormGroup = new FormGroup({
          email:  new FormControl('eve.holt@reqres.in',[Validators.email, Validators.pattern("[a-zA-Z0-9@._]{3,30}")]),
          password:  new FormControl('cityslicka',[Validators.required,Validators.pattern("[a-zA-Z0-9@#$*_-]{4,10}")]),
      });
  }

    get passwordField(){ return this.aFormGroup.get('password'); }
    get loginIdField(){ return this.aFormGroup.get('email'); }

    onSubmit():void{
       // let data ={"email": this.aFormGroup.value.email,"password": this.aFormGroup.value.password };
        this.loginAPIResult =  this.userService.userLoginApi(this.aFormGroup.value)
            .subscribe(response => {
                if (response.status == 200 || response.status == 201) {
                    // @ts-ignore
                    let loginToken  = response.body.token;
                    localStorage.setItem('access_token', loginToken)
                    Swal.fire('Success!','Login was successful. Login Token : '+loginToken,'success');
                    this.router.navigate(['/']);
                }
                else if( response.status == 419  )
                {
                    Swal.fire('Error!','Login Expire.','error');
                }
                else
                { Swal.fire('Error!','Default Action taken','error');
                }
                // Or any other header:
                //console.log(response.headers.get('X-Custom-Header'));
            });
    }

    formReset()
    {
        this.aFormGroup.reset();
    }

    ngOnDestroy(): void {
    }

}
