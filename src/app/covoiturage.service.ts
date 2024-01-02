import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { cov } from './cov';
import { reservation } from './reservation';
import { user } from './user';


@Injectable({
  providedIn: 'root'
})

export class CovoiturageService {

  private baseURL = "http://localhost:8083/driver/covoiturages";
  private FURL = "http://localhost:8083/driver/";
  private RURL = "http://localhost:3002/participation";
  private log = "http://localhost:9898/auth";

  constructor(private httpClient: HttpClient) { }

  getCovoituragesList(): Observable<cov[]>{
    return this.httpClient.get<cov[]>(`${this.baseURL}`);
  }

  getCovoituragesListByIdDriver(idDriver: string): Observable<cov[]> {
    const url = `${this.FURL}covoituragesDriver/${idDriver}`;
    return this.httpClient.get<cov[]>(url);
  }

  getResrvationsList(): Observable<cov[]>{
    return this.httpClient.get<cov[]>(`${this.RURL}`);
  }

  getReservationsCount(id: number): Observable<Number> {
    return this.httpClient.get<Number>(`${this.RURL}Count/${id}`);
  }

  getReservationsEtat(): Observable<cov[]> {
    return this.httpClient.get<cov[]>(`${this.RURL}Etat`);
  }



  createCovoiturage(cov: cov): Observable<Object>{
    alert("Covoiturage saved ");

    return this.httpClient.post(`${this.baseURL}`, cov);
  }

  getCovoiturageById(id: number): Observable<cov>{
    return this.httpClient.get<cov>(`${this.baseURL}/${id}`);
  }

  updateCovoiturage(id: number, cov: cov): Observable<Object>{

    const confirmed = confirm("Updated Covoiturage !");
    if (confirmed) {
    return this.httpClient.put(`${this.baseURL}/${id}`, cov);
  } else {
    return new Observable<Object>();
  }
  }

  deleteCovoiturage(id: number): Observable<Object>{
    const confirmed = confirm("deleted Covoiturage !");
    if (confirmed) {
      return this.httpClient.delete(`${this.baseURL}/${id}`);
    } else {
      return new Observable<Object>();
    }
  }
  updateReservation(id: number, reservation: reservation): Observable<any> {
    const url = `${this.RURL}Driver/${id}?etat=${reservation.etat}`;

    return this.httpClient.put(url, reservation);
  }

  deleteReservation(id: number): Observable<Object>{
    const confirmed = confirm("deleted reservation !");
    if (confirmed) {
      return this.httpClient.delete(`${this.RURL}/${id}`);
    } else {
      return new Observable<Object>();
    }
  }
  getCovoituragetByNom(nom: string): Observable<cov>{
    return this.httpClient.get<cov>(`${this.FURL}/${nom}`);
  }



  counts(): Observable<cov>{
    return this.httpClient.get<cov>(`${this.FURL}count`);
  }
  counts2(): Observable<reservation>{
   return this.httpClient.get<reservation>(`${this.RURL}Count`);
  }
  counts3(): Observable<reservation>{
    return this.httpClient.get<reservation>(`${this.RURL}AnnuledCount`);
    }
 getUsersList(): Observable<user[]>{
  return this.httpClient.get<user[]>(`${this.log}/all`);
}

sendEmail(queryParams: string): Observable<any> {
  // Append the query parameters to the base URL
  const url = `http://localhost:8083/driver/SendEmail?${queryParams}`;
  return this.httpClient.post(url, null);
}

getDriversList(): Observable<user[]> {
  return this.httpClient.get<user[]>(`${this.log}/drivers`);
}
deleteDriver(id: number): Observable<any> {
  return this.httpClient.delete<any>(`${this.log}/${id}`);
}
//list-client
getClientsList(): Observable<user[]> {
  return this.httpClient.get<user[]>(`${this.log}/clients`);
}
deleteClient(id: number): Observable<any> {
  return this.httpClient.delete<any>(`${this.log}/${id}`);
}
getParticipationsForCovoiturage(covoiturageId: number): Observable<reservation[]> {
  return this.httpClient.get<reservation[]>(`${this.RURL}/${covoiturageId}`);
}
getParticipantsForCovoiturage(covoiturageId: number): Observable<any[]> {
  return this.httpClient.get<any[]>(`http://localhost:3002/p/participants/cov/${covoiturageId}`);
  // Supposons que l'endpoint pour obtenir les participants par ID de covoiturage est disponible dans votre API backend à cet endpoint
}


getClientById(clientId: number): Observable<any> {
  return this.httpClient.get<any>(`${this.log}/${clientId}`);
  //Endpoint pour obtenir les informations du client basées sur l'ID du client
}

deleteCovoiturageById(id: number): Observable<any> {
  return this.httpClient.delete(`${this.baseURL}/${id}`);
}


searchCovoiturages(depart: string, destination: string, date: string): Observable<any> {
  // Assuming you have a corresponding endpoint in your Spring Boot app
  const url = `${this.FURL}covsddd/?depart=${depart}&destination=${destination}&date=${date}`;

  return this.httpClient.get(url);
}



postConfirmation(userId: String, covoiturageId: number): Observable<any> {
  // Create a confirmation request object
  const confirmationRequest = {
    participationID: '2',
    clientID: userId,
    carpoolingID: covoiturageId,
    etat: 1
  };

  // Log the API details
  const jsonBody = JSON.stringify(confirmationRequest);
  const requestDetails = `
    API Method: POST
    API Body: ${jsonBody}
  `;
  console.log('API Details:\n', requestDetails);

  // Construct dynamic URL
  const dynamicUrl = `${this.RURL}?clientID=${confirmationRequest.clientID}&carpoolingID=${confirmationRequest.carpoolingID}&etat=${confirmationRequest.etat}`;
  console.log('API:\n', dynamicUrl);

  // Make the API request with a dynamic URL
  return this.httpClient.post(dynamicUrl, null);
}
getCovoituragesCount(): Observable<number> {
  return this.httpClient.get<number>(`http://localhost:8083/driver/count`);
}

getTotalParticipations(): Observable<number> {
  return this.httpClient.get<number>(`http://localhost:3002/totalParticipants`);
}

}
