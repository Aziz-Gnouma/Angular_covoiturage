import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

export function initializeKeycloak(keycloak: KeycloakService, router: Router): () => Promise<any> {
  return async () => {
    await keycloak.init({
      config: {
        realm: 'carpooling2', // Make sure to use the correct realm name
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

    // Check roles and navigate after initialization
    await checkRoles(keycloak, router);
  };
}
