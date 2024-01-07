import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { checkRoles } from '../keycloak-init/keycloak-util';

export function initializeKeycloak(keycloak: KeycloakService, router: Router): () => Promise<any> {
  return async () => {
    try {
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

      // Check roles after successful initialization
      await checkRoles(keycloak, router);
    } catch (error) {
      console.error('Error initializing Keycloak:', error);
      // Handle initialization error, e.g., redirect to an error page
      router.navigate(['/error']);
    }
  };
}
