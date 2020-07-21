import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GithubuserserviceService} from '../githubuserservice.service';
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

 
  public search;
  public users;
  public userFlag=false;
  userData:any;
  userArray:any;
  title:string;
  initialSort:boolean=true;
  initialSort2:boolean=false;

  constructor(private router:Router,private userservice:GithubuserserviceService) { }

  ngOnInit(): void {
  }
  searchUser()
  {
     this.userservice.searchUser1(this.search).subscribe(
       data=>this.users=data,error=>console.log(error)
       
     )
     this.userFlag=true;
  }

  sort() {
    // console.log("fun1");
    this.userservice.SortUsers(this.title,this.initialSort).subscribe((result:any) => {
      //console.log(result);
      this.userData = result; 
      this.userArray = this.userData.items;
      //console.log(this.userArray);
      // console.log(this.userData);
      this.initialSort = !this.initialSort;
    });
  }

  sort2() {
    console.log("fun2");
    this.userservice.SortUsers(this.title,this.initialSort2).subscribe((result:any) => {
      //console.log(result);
      this.userData = result; 
      this.userArray = this.userData.items;
      // console.log(this.userData);
      this.initialSort = !this.initialSort;
    });
  }

    
}
