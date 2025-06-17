import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environments } from "../environments/environments.dev";
import { Breeds } from "../interfaces/breeds.interface";
import { firstValueFrom } from "rxjs";
import { Login, LoginResponse } from "../interfaces/login.interface";

@Injectable({
  providedIn: 'root'
})
export class FetchService{
    constructor(
      private readonly httpClient:HttpClient
    ){}

    async getAllBreeds():Promise<Breeds[]>{
      return firstValueFrom( this.httpClient.get<Breeds[]>(environments.API_BREEDS));
    }

    async getAllBreedById(id:string):Promise<Breeds>{
      return firstValueFrom( this.httpClient.get<Breeds>(environments.API_BREEDS + '/' + id));
    }

    async getSearch(param:string):Promise<Breeds[]>{
      return firstValueFrom( this.httpClient.get<Breeds[]>(environments.API_BREEDS + '/search?q=' + param));
    }

    async login(body:Login):Promise<LoginResponse>{
      return firstValueFrom( this.httpClient.post<LoginResponse>(environments.API_AUTH + '/login',
        body
      ));
    }

    async register(body:Login):Promise<LoginResponse>{
      return firstValueFrom( this.httpClient.post<LoginResponse>(environments.API_AUTH + '/register',
        body
      ));
    }



}
