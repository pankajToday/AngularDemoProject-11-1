import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import  {UserServiceService} from '../../user-service.service'

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  constructor( private  userService:UserServiceService , private _Activatedroute:ActivatedRoute,
               private _router:Router) { }

  // Initialize Variables
    userProfileData;
    pageLodeIndicator =false;
    userRouteId;

  ngOnInit(): void {
      this.getUserProfile();
  }
  getUserProfile()
  {
    this.pageLodeIndicator = true;
      this._Activatedroute.paramMap.subscribe(params => {
          this.userRouteId = params.get('id');
      });

    this.userService.getUsersProfileApi(this.userRouteId).subscribe(serviceData =>{
      this.pageLodeIndicator=false;
      this.userProfileData = serviceData;  console.log( this.userProfileData );
    })

  }

    OnDestroy() {
        this.userRouteId.unsubscribe();
    }

}
