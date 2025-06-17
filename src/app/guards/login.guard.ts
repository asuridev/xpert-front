import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { inject } from "@angular/core";

export function loginGuard(): CanActivateFn {
     return () => {
       const userService = inject(UserService);
       const router = inject(Router);

       if (userService.getIslogin()) {
         return true;
       } else {
         router.navigate(['/three']); //login page
         return false;
       }
     };
   }
