import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {IUser} from './user';
import {catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GithubuserserviceService {

  private search_url:string="https://api.github.com/search/users?q=";
  private api2:string="https://api.github.com/users/";
  constructor(private http:HttpClient) { }

  searchUser1(value:string){
    return this.http.get(this.search_url+value);
  }

  SortUsers(user:string,order:boolean) {
    var orderString:string;
    if(order) {
      orderString = "asc";
    }
    else {
      orderString = "desc";
    }
    return this.http.get(this.search_url.concat(user).concat("&sort=score&order=").concat(orderString));
 }
 userDetail(username:string){
   return this.http.get(this.api2+username);
 }

 getnextpage(user:string,counter:any){
   return this.http.get(this.search_url+user+"&page=" +counter);
 }
}




