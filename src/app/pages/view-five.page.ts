import { Component } from "@angular/core";
import { UserService } from "../services/user.service";

@Component({
  selector:'xpert-five',
  imports:[],
  template:`
    <h1>Vista privada</h1>
    <h2>{{ email }}</h2>
    <h2>{{ userId }}</h2>
  `
})
export default class ViewFive{
  constructor(
    private readonly userService:UserService
  ){}

  get email(){
    return this.userService.getEmail();
  }

  get userId(){
    return this.userService.getUserId();
  }
}
