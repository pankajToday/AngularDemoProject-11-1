import { Component, Input, OnInit } from '@angular/core';
import {UserServiceService} from  '../../user-service.service';
import {FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import {Router} from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import {pipe} from 'rxjs';
import {first} from 'rxjs/operators';

import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    aFormGroup: FormGroup;
    pageLodeIndicator =false;
    userRouteId ;
    userProfileData;

    submitted = false;
    siteKey = "6LfUNCgaAAAAAEc_HXBr9CTJKsOYinrAQjRy9D83";
    from_gst=false;
    role_type=0
    isYesChecked= 'no';
    isNoChecked= 'yes';
    userNameField = true;
    companyNameFiled =false;
    gstNoField = false;
    // GST No : Assam -- 18AABCU9603R1ZM
    //https://www.ujjivansfb.in/pdf/GSTINs.pdf


  constructor(private userService:UserServiceService , private Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {

      this.aFormGroup = new FormGroup({
          recaptcha: new FormControl(''),

          role_id:  new FormControl('',[Validators.required,Validators.pattern('[1-99]')]),

          company_name: new FormControl('',[Validators.pattern("[a-zA-Z0-9 .-//()']{0,80}")]),
          gst_no:  new FormControl('',[Validators.pattern("[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}")]),
          gst_status:  new FormControl(),

          first_name:  new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]{3,30}")]),
          last_name:  new FormControl('',[Validators.pattern("[a-zA-Z ]{3,30}")]),
          email_id:  new FormControl('',[Validators.required,Validators.email]),
          phone_number: new FormControl('',[Validators.required,Validators.pattern("[0-9+]{10,13}")]),
          alt_number: new FormControl('',[Validators.pattern("[0-9]{10,13}")]),

          address:  new FormControl('',[Validators.pattern("[a-zA-Z0-9 .,-//']{0,200}")]),
          city_id:  new FormControl(),
          district_id:  new FormControl(),
          pin_code:  new FormControl('',[Validators.pattern("[0-9]{0,6}")]),
      });
      this.getUserProfile();
  }

    get recaptchaText(){ return this.aFormGroup.get('recaptcha');}
    get roleId(){ return this.aFormGroup.get('role_id');}
    get firstName(){ return this.aFormGroup.get('first_name');}
    get lastName(){ return this.aFormGroup.get('last_name');}
    get mobile(){ return this.aFormGroup.get('phone_number');}
    get altNumber(){ return this.aFormGroup.get('alt_number');}
    get companyName(){ return this.aFormGroup.get('company_name');}
    get gstNo(){ return this.aFormGroup.get('gst_no');}
    get gstStatus(){ return this.aFormGroup.get('gst_status');}
    get emailId(){ return this.aFormGroup.get('email_id');}
    get addressText(){ return this.aFormGroup.get('address');}
    get cityId(){ return this.aFormGroup.get('city_id');}
    get districtId(){ return this.aFormGroup.get('district_id');}
    get pinCode(){ return this.aFormGroup.get('pin_code');}

  getUserProfile()
  {
    // Get Parameter form Route
      this.pageLodeIndicator = true;
      this.Activatedroute.paramMap.subscribe(params => {
          this.userRouteId = params.get('id');
      });

      // Call user profile api
      this.userService.getUserProfile(this.userRouteId).subscribe(serviceData =>{
          this.pageLodeIndicator=false;
          this.userProfileData = serviceData;
          // Fill User Form.
          this.aFormGroup = new FormGroup({
              role_id:  new FormControl(1),

              company_name: new FormControl(''),
              gst_no:  new FormControl(''),
              gst_status:  new FormControl(),

              first_name:  new FormControl(this.userProfileData.data.first_name,[Validators.required,Validators.pattern("[a-zA-Z ]{3,30}")]),
              last_name:  new FormControl('Last Name',[Validators.pattern("[a-zA-Z ]{3,30}")]),

              email_id:  new FormControl('user1@example.com'),
              phone_number: new FormControl('+91 232223322'),
              alt_number: new FormControl('+91 232223444'),
              address:  new FormControl('Co-Operative colony BCCL TW'),
              city_id:  new FormControl('1'),
              district_id:  new FormControl('2'),
              pin_code:  new FormControl('232111'),
          });
      });

  }

  onSubmit():void{
      this.userService.addUser(JSON.stringify(this.aFormGroup.value)).subscribe(data=>{return data;});
  }

  formReset()
  {
      this.aFormGroup.reset();
  }




}
