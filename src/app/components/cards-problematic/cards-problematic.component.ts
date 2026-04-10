import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/card.interface';

@Component({
  selector: 'app-cards-problematic',
  templateUrl: './cards-problematic.component.html',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }
    .card {
      border: 1px solid #ddd;
      padding: 1rem;
    }
    .card img {
      width: 100%;
      height: auto;
    }
    .hero-section img {
      width: 100%;
      height: auto;
    }
  `]
})
export class CardsProblematicComponent {
  cards: Card[] = [
    {
      id: 1,
      title: 'Card 1',
      imageUrl: 'https://domain1.com/images/card1.jpg'
    },
    {
      id: 2,
      title: 'Card 2',
      imageUrl: 'https://different-domain.com/images/card2.jpg'
    },
    {
      id: 3,
      title: 'Card 3',
      imageUrl: 'https://another-domain.com/images/card3.jpg'
    }
  ];

  addCard() {
    const newCard: Card = {
      id: this.cards.length + 1,
      title: `Card ${this.cards.length + 1}`,
      imageUrl: `https://random-domain-${this.cards.length + 1}.com/images/card${this.cards.length + 1}.jpg`
    };
    this.cards = [...this.cards, newCard];
  }
}
