import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    
    // Obtenir le token d'authentification depuis le local storage
    const token = localStorage.getItem('token');

    // Cloner la requête et ajouter le token d'authentification à l'en-tête
    if (token) {
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
        
      }
      );
      console.log(token)
      // Poursuivre la requête avec le token ajouté à l'en-tête
      return next.handle(modifiedReq);
    }
    console.log(token)
    // Si le token n'est pas disponible, continuer avec la requête d'origine
    return next.handle(req);
  }
}
