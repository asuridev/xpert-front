import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserService{
  private isLogin:boolean = false;
  private email:string = "";
  private userId:string = "";

  public setIsLogin(login:boolean){
    this.isLogin = login;
  }
  public setEmail(email:string){
    this.email = email;
  }

  public setUserId(userId:string){
    this.userId = userId;
  }

  public getIslogin(){
    return this.isLogin;
  }

  public getEmail(){
    return this.email;
  }

  public getUserId(){
    return this.userId;
  }

}
