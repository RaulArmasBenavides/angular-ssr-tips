import { Injectable } from '@angular/core';
import { Card } from '../models/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private readonly CDN_URL = 'https://your-cdn.com/images/';

  getCards(): Card[] {
    return [
      {
        id: 1,
        title: 'Card 1',
        imageUrl: `${this.CDN_URL}card1.jpg`
      },
      {
        id: 2,
        title: 'Card 2',
        imageUrl: `${this.CDN_URL}card2.jpg`
      },
      {
        id: 3,
        title: 'Card 3',
        imageUrl: `${this.CDN_URL}card3.jpg`
      }
    ];
  }
}
