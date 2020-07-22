import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { GithubuserserviceService} from '../githubuserservice.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  
  public userDetail;
  public search;
  public users:any;
  public userFlag=false;
  totalItems=30;
   count=1;
  currentPage=1;
  page=1;
  perPage=6;
  userData:any;
  userArray:any;
  title:string;
  initialSort:boolean=true;
  initialSort2:boolean=false;
  modalRef: BsModalRef;
  notscrolly:boolean=true;
  notEmptyPost: boolean=true;


  constructor(private router:Router,private userservice:GithubuserserviceService,private modalService: BsModalService,private spinner : NgxSpinnerService) { }

  searchUser()
  {
     this.userservice.searchUser1(this.search).subscribe(
       (data:any)=>{this.users=data.items;} 
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
    //console.log("fun2");
    this.userservice.SortUsers(this.title,this.initialSort2).subscribe((result:any) => {
      //console.log(result);
      this.userData = result; 
      this.userArray = this.userData.items;
      // console.log(this.userData);
      this.initialSort = !this.initialSort;
    });
  }

openModal(template: TemplateRef<any>,username){

  this.modalRef=this.modalService.show(template);
  this.userservice.userDetail(username).subscribe(
    data=>{this.userDetail=data;
    console.log(this.userDetail);
  })
  }

  setPage(event)
  {
    this.page=event;
  }
  onScroll(){
    if(this.notscrolly && this.notEmptyPost){
          this.notscrolly=false;
          console.log("scrolled");
          this.spinner.show();
          this.loadNextPost();
    }
  }
 loadNextPost(){
     
     this.userservice.getnextpage(this.search,this.count).subscribe((result:any )=>{
       const newPost = result;
       console.log(newPost);
       if(newPost.length == 0 ){
         this.notEmptyPost=false;
       }
       Array.prototype.push.apply(this.users,result.items);
       console.log(this.users,newPost.items);
       this.count=this.count+1; 
       this.spinner.hide();
       this.notscrolly=true;
     });

 }
 ngOnInit(): void {
}
}
