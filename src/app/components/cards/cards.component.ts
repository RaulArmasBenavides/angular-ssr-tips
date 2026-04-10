import { Component } from '@angular/core';
import { Card } from '../../models/card.interface';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  // styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  cards: Card[] = [];

  constructor(private cardsService: CardsService) {
    this.cards = this.cardsService.getCards();
  }

  trackByFn(index: number, card: Card): number {
    return card.id;
  }

  addCard() {
    const newCard: Card = {
      id: this.cards.length + 1,
      title: `Card ${this.cards.length + 1}`,
      imageUrl: `${this.cardsService['CDN_URL']}card${this.cards.length + 1}.jpg`
    };
    this.cards = [...this.cards, newCard];
  }
}
