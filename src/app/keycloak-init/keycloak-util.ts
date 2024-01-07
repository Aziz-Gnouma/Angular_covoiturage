// keycloak-util.ts

import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

export async function checkRoles(keycloak: KeycloakService, router: Router): Promise<void> {
  const token: string | null = await keycloak.getToken();

  if (token) {
    const roles: string[] = extractRolesFromToken(token);
    const userId = extractUserIdFromToken(token);

    const userDetails = await keycloak.loadUserProfile();
    console.log('User Details:', userDetails);
    console.log('User id:', userId);

    // Log the user roles
    console.log('User roles:', roles);

    // Redirect based on user roles
    if (roles.includes('DRIVER')) {
      router.navigate(['/dash']);
    } else if (roles.includes('ADMIN')) {
      router.navigate(['/dashadmin']);
    } else if (roles.includes('CLIENT')) {
      router.navigate(['/Client_acceuil']);
    } else {
      console.log('No matching role for navigation. Redirect to default page.');
      // Handle default redirection or display an error message
      router.navigate(['/']);
    }
  }
}

export function extractRolesFromToken(token: string): string[] {
  const decodedToken: any = decodeToken(token);
  return decodedToken?.realm_access?.roles || [];
}

export function extractUserIdFromToken(token: string): string | null {
  const decodedToken: any = decodeToken(token);
  return decodedToken?.sub || null;
}

export function decodeToken(token: string): any {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
}
