import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpClient) {}

  getCities(): Observable<string[]> {
    const url =
      'https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3Barea%5B%22ISO3166-1%22%3D%22TN%22%5D%5Badmin_level%3D2%5D-%3E.searchArea%3B(node%5B%22place%22%3D%22city%22%5D%28area.searchArea%29%3Bway%5B%22place%22%3D%22city%22%5D%28area.searchArea%29%3Brel%5B%22place%22%3D%22city%22%5D%28area.searchArea%29%3B%29%3Bout%20center%3B';

    return this.http.get<string[]>(url);
  }
}
