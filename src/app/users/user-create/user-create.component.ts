import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import {UserServiceService} from '../../user-service.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';



@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})

export class UserCreateComponent implements OnInit , OnDestroy  {
   aFormGroup: FormGroup;


  constructor(public userService: UserServiceService, public router: Router) {}

   apiResult;
   submitted ;
   errorField ;
   siteKey = "6LfUNCgaAAAAAEc_HXBr9CTJKsOYinrAQjRy9D83";
   role_type=0
   isChecked= 0;
   isNoChecked= 'yes';
   userNameField = true;
   companyNameFiled =false;
   gstNoField = false;
    // GST No : Assam -- 18AABCU9603R1ZM
    //https://www.ujjivansfb.in/pdf/GSTINs.pdf
    ngOnInit(): void {
        this.aFormGroup = new FormGroup({
            recaptcha: new FormControl(''),
            role_type_id:  new FormControl(),
            role_id:  new FormControl('0',[Validators.required,Validators.pattern('[1-99]')]),
            company_name: new FormControl('',[Validators.pattern("[a-zA-Z0-9 .-//()']{0,80}")]),
            gst_no:  new FormControl('18AABCU9603R1ZM',[Validators.pattern("[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}")]),
            gst_status:  new FormControl(),
            first_name:  new FormControl('',[Validators.pattern("[a-zA-Z ]{3,30}")]),
            last_name:  new FormControl('',[Validators.pattern("[a-zA-Z ]{3,30}")]),
            password:  new FormControl('12345',[Validators.required,Validators.pattern("[a-zA-Z0-9@#$*_-]{4,10}")]),
            password_confirm:  new FormControl('12345',[Validators.required,
                Validators.pattern("[a-zA-Z0-9@#$*_-]{4,10}")]),
            email_id:  new FormControl('s12sd@sds.sss',[Validators.required,Validators.email]),
            phone_number: new FormControl('1234567890',[Validators.required,Validators.pattern("[0-9+]{10,13}")]),
            alt_number: new FormControl('',[Validators.pattern("[0-9]{10,13}")]),
            address:  new FormControl('',[Validators.pattern("[a-zA-Z0-9 .,-//']{0,200}")]),
            city_id:  new FormControl(),
            district_id:  new FormControl(),
            pin_code:  new FormControl('',[Validators.pattern("[0-9]{0,6}")]),
        });
    }

    get recaptchaText(){ return this.aFormGroup.get('recaptcha')}
    get roleTypeId(){ return this.aFormGroup.get('role_type_id')}
    get roleId(){ return this.aFormGroup.get('role_id')}
    get companyName(){ return this.aFormGroup.get('company_name')}
    get gstNo(){ return this.aFormGroup.get('gst_no')}
    get gstStatus(){ return this.aFormGroup.get('gst_status')}
    get firstName(){ return this.aFormGroup.get('first_name')}
    get lastName(){ return this.aFormGroup.get('last_name')}
    get passwordText(){ return this.aFormGroup.get('password')}
    get passwordConfirm(){ return this.aFormGroup.get('password_confirm')}
    get emailId(){ return this.aFormGroup.get('email_id')}
    get phoneNumber(){ return this.aFormGroup.get('phone_number')}
    get altNumber(){ return this.aFormGroup.get('alt_number')}
    get addressText(){ return this.aFormGroup.get('address')}
    get cityId(){ return this.aFormGroup.get('city_id')}
    get districtId(){ return this.aFormGroup.get('district_id')}
    get pinCode(){ return this.aFormGroup.get('pin_code')}


    onSubmit():void{
        this.submitted  = true ;
        this.aFormGroup.patchValue({role_type_id:this.aFormGroup.value.role_id});

        if( this.aFormGroup.value.role_id == 2)
        {
            this.aFormGroup.patchValue({first_name:''});
            this.aFormGroup.patchValue({last_name:''});

            if( !this.aFormGroup.value.company_name )
            { this.submitted=false;   this.errorField ="Company Name"; }

            if( this.aFormGroup.value.gst_status == true &&  this.aFormGroup.value.gst_no.length < 1 )
            {this.submitted=false;   this.errorField ="GST No. ";}

         }
        else
        {
            this.aFormGroup.patchValue({company_name:''});
            this.aFormGroup.patchValue({gst_status:''});
            this.aFormGroup.patchValue({gst_no:''});

            if( !this.aFormGroup.value.first_name)
            { this.submitted=false;  this.errorField ="First Name "; }
        }

        if( !this.aFormGroup.value.recaptcha)
        { this.submitted=false;  this.errorField ="Google Captcha "; }

        if( !this.submitted )
        {
            Swal.fire('Error!',this.errorField + 'is invalid!','error')
        }
        else
        { this.apiResult =  this.userService.addUser(JSON.stringify(this.aFormGroup.value))
            .subscribe(response => {
                if (response.status == 200 || response.status == 201) {
                    // @ts-ignore
                    this.apiResult  = response.body.id;
                    Swal.fire('Success!','User Created Successfully. New-Id : '+this.apiResult,'success');
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

    }

    console(myValue)
    {
        console.warn(myValue)
    }

    formReset()
    {
        this.aFormGroup.reset();
    }

    checkRole(myValue)
    {
        this.isChecked =0;
        this.role_type =myValue;
        this.gstNoField =false ;
      if(myValue == 2)
      {
          this.userNameField = false;
          this.companyNameFiled =true;
      }
      else
      {
          this.userNameField = true;
          this.companyNameFiled =false;
      }
    }

    @ViewChild("gst_status") gst_status;
    enableGSTNo()
    {
      this.aFormGroup.patchValue({gst_no:'18AABCU9603R1ZM'});
      if( this.gst_status.nativeElement.checked == 1 )
      {
          this.isChecked =1;
        this.gstNoField =true ;
      }
      else
      {
          this.isChecked =0;
        this.gstNoField =false ;
      }
    }

    verifyPassword(){
       let pass = this.aFormGroup.get('password').value;
        let confirmPass = this.aFormGroup.get('password_confirm').value;
         pass !== confirmPass ? Swal.fire('Warning!','Password do not match with confirm password.','warning') : {}
    }

    ngOnDestroy(): void {
    }




}
