import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from '../keycloak-init/keycloak-init.module';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private keycloak: KeycloakService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
 
    const isAuthenticated = this.keycloak.isLoggedIn();
    
   
    if (isAuthenticated) {
      return true;
    } else {
     
      return initializeKeycloak(this.keycloak, this.router)().then(() => this.router.createUrlTree(['/']));
    }
  }
}