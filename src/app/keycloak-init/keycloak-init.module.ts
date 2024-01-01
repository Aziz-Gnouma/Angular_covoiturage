import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

export function initializeKeycloak(keycloak: KeycloakService, router: Router): () => Promise<any> {
  return async () => {
    await keycloak.init({
      config: {
        realm: 'Wasalni',
        url: 'http://localhost:8080/',
        clientId: 'carpooling_id',
      },
      initOptions: {
        onLoad: 'login-required',
        flow: 'standard',
        checkLoginIframe: false,
      },
      enableBearerInterceptor: true,
    });


    await checkRoles(keycloak, router);
  };
}

async function checkRoles(keycloak: KeycloakService, router: Router): Promise<void> {
    const token: string | null = await keycloak.getToken();

    if (token) {
      const roles: string[] = extractRolesFromToken(token);
      const userId = extractUserIdFromToken(token);


      const userDetails = await keycloak.loadUserProfile();
      console.log('User Details:', userDetails);

      console.log('User id:', userId); // Log the user roles

      if (roles.includes('DRIVER')) {

        router.navigate(['/dash']);
      } else if (roles.includes('ADMIN')) {

        router.navigate(['/dashadmin']);
      }else if (roles.includes('CLIENT')) {

        router.navigate(['/Client_acceuil']);
      }
    }
  }


  function extractRolesFromToken(token: string): string[] {
    const decodedToken: any = decodeToken(token);
    return decodedToken?.realm_access?.roles || [];
  }

  function extractUserIdFromToken(token: string): string | null {
    const decodedToken: any = decodeToken(token);
    return decodedToken?.sub || null;
  }

  function decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }




  }
