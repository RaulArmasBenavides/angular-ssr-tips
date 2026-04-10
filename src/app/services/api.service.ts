import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Card } from '../models/card.interface';

interface FakerResponse<T> {
  status: string;
  code: number;
  total: number;
  data: T[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'https://fakerapi.it/api/v1';

  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    // Using faker API to get products and map them to cards
    return this.http.get<FakerResponse<any>>(`${this.API_URL}/products`, {
      params: {
        _quantity: '20',
        _seed: '123' // Using fixed seed to ensure same data
      }
    }).pipe(
      map(response => response.data.map((product: any, index: number) => ({
        id: product.id,
        title: product.name,
        imageUrl: `https://picsum.photos/400/300?random=${index + 1}`
      })))
    );
  }
}
