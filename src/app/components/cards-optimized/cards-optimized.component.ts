import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Card } from '../../models/card.interface';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-cards-optimized',
  template: `
    <div class="hero-section">
      <picture>
        <source
          srcset="
            assets/hero-image-small.avif 300w,
            assets/hero-image-medium.avif 600w,
            assets/hero-image-large.avif 900w
          "
          type="image/avif"
        >
        <source
          srcset="
            assets/hero-image-small.webp 300w,
            assets/hero-image-medium.webp 600w,
            assets/hero-image-large.webp 900w
          "
          type="image/webp"
        >
        <img
          ngSrc="assets/hero-image-fallback.jpg"
          width="900"
          height="600"
          alt="Hero image"
          fetchpriority="high"
          sizes="(max-width: 300px) 300w,
                 (max-width: 600px) 600w,
                 900w"
        >
      </picture>
    </div>

    <button (click)="addCard()">Add Card</button>

    <div class="cards-container">
      <div class="card" *ngFor="let card of cards; trackBy: trackByFn">
        <img [src]="card.imageUrl" [alt]="card.title">
        <h3>{{ card.title }}</h3>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
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
  `]
})
export class CardsOptimizedComponent {
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
