import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../../user-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {pipe} from 'rxjs';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    // Initialize variable.
   usersList;
   pageLoad=false;

    POSTS: any;
    page = 1;
    count = 0;
    tableSize = 5;
    tableSizes = [3, 6, 9, 12];

  constructor(private  usersService:UserServiceService) { }

  ngOnInit(): void {
      this.getUsersList();
      this.fetchPosts();
  }

    getUsersList()
      {
          this.pageLoad =true;
          this.usersService.getUsersListApi().subscribe(response => {
              this.pageLoad =false;
              this.usersList = response;
          },
              error => {
                  Swal.fire('Error!','Unable to get users record. Something went wrong!','error');
              })
      }

    delete(id) {
      this.usersService.deleteUser(id).subscribe(res => { this.getUsersList(); }),pipe(first()),
        error => {
            //this.usersService.error(error);
            //console.log(error)
           // console.log("error code " + error.status)
        };
    }


    fetchPosts(): void {
        this.pageLoad =true;
        this.usersService.getAllPosts()
            .subscribe(
                response => {
                    this.pageLoad =false;
                    this.POSTS = response;
                },
                error => {
                    Swal.fire('Error!','Unable to get users post. Something went wrong!','error');
                });
    }

    onTableDataChange(event){
        this.page = event;
       // this.fetchPosts();
        this.getUsersList();
    }

    onTableSizeChange(event): void {
        this.tableSize = event.target.value;
        this.page = 1;
       // this.fetchPosts();
        this.getUsersList();
    }

    deleteConfirmation(id){
        Swal.fire({
            title: 'Are you sure?',
            text: 'This process is irreversible.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes.',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this.delete(id);
                Swal.fire(
                    'Removed!',
                    'User removed successfully.',
                    'success'
                )
            }
        })
    }
}
