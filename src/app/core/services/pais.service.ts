import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface Country {
  name: {
    common: string;
    official: string;
  };
  
}


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl = 'https://restcountries.com/v3.1/all';  // URL de la API

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl).pipe(
      map((countries: Country[]) => {
        // Ordenar alfabéticamente por el nombre común
        return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
      })
    );
  }

}
