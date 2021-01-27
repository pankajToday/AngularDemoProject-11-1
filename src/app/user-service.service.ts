import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse  } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {delay, catchError, retry, first, map, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';



const endpoint = 'https://jsonplaceholder.typicode.com/posts';
const  endPoint2 = 'https://reqres.in/api';
export class User {
    id: string;
    name: string;
    email: string;
    phone: number;

    role_type_id : number;
    role_id :  number;
    company_name :  string;
    gst_no : string;
    gst_status:  string;
    first_name:  string;
    last_name:  string;
    password:  string;
    password_confirm:  string;
    email_id :  string;
    phone_number:  number;
    alt_number:  string;
    address:  string;
    city_id:  number;
    district_id  :  number;
    pin_code :  number;
}
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private  http:HttpClient) { }

    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

  userCreateResponse;


    getData(){
    return {
      first_name: 'Pankaj',
        last_name: 'Kumar',
        phone_number: '+911234567890',
        alt_number:  '+91122222222',
        password:'12345678',
        password_confirm: '12345678'
    };
  }

    getAllPosts(): Observable<any> {
      let  params; // optional
        return this.http.get(endpoint, { params });
    }

    getUsersListApi(){
      let  params; // optional
      let url ='https://jsonplaceholder.typicode.com/users';
      return this.http.get(url, { params });
    }

    getUsersProfileApi(id){
        let url ='https://jsonplaceholder.typicode.com/photos/'+id;
        return this.http.get(url);
    }

    getUserProfile(id)
    {
        return this.http.get(endPoint2+'/users/'+id,this.httpHeader);
    }


    addUser(formData){
        let url ='https://jsonplaceholder.typicode.com/posts';
        return this.http.post(url,formData,{observe: 'response'}).pipe(catchError(this.processError) );
    }

    testHttpStatus(formData)
    {
        let url =endPoint2+'register';
       return this.http.post(url, formData,{observe: 'response'} ).pipe(catchError(this.processError) );
    }

    updateUser(id)
    {
        let url = endpoint;
        return this.http.delete(url + '/' + id, this.httpHeader)
            .pipe(catchError(this.processError) ); //
    }

    deleteUser(id){
      let url = endpoint;
      return this.http.delete(url + '/' + id, this.httpHeader).pipe(catchError(this.processError) ); //
    }

    processError(err) {
        let message = '';
        if(err.error instanceof ErrorEvent) {
            message = err.error.message;
        } else {
            message = `Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        if( err.status == 404)
        {Swal.fire('Error!','Something went wrong code : 400.','error')}
        else if( err.status == 404)
        {Swal.fire('Error!','Something went wrong code : 404.','error')}
        else if( err.status == 500)
        {Swal.fire('Error!','Something went wrong code : 500.','error')}
        return throwError(message);
    }



}
