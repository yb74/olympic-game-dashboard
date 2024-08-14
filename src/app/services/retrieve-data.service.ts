import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContinentApiData } from '../models/continentApiData';

@Injectable({
  providedIn: 'root'
})
export class RetrieveDataService {

  private jsonUrl = 'assets/json/continents.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<ContinentApiData[]> {
    return this.http.get<ContinentApiData[]>(this.jsonUrl);
  }
}