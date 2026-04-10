import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Card } from '../../models/card.interface';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cards-container">
      <div class="last-update">
        Last filter update: {{ lastUpdateTime }}
      </div>
      @for (card of cards; track card.id) {
        <div class="card">
          <picture>
            <source
              srcset="https://picsum.photos/400/300.webp?random={{card.id}}"
              type="image/webp"
            >
            <img
              ngSrc="https://picsum.photos/400/300?random={{card.id}}"
              width="400"
              height="300"
              [alt]="card.title"
              [priority]="card.id <= 4"
            >
          </picture>
          <div class="card-content">
            <h3>{{ card.title }}</h3>
            <p class="render-count">
              Renders: {{ getRenderCount(card.id) }}
            </p>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .card {
      border: 1px solid #e2e8f0;
      padding: 1rem;
      border-radius: 4px;
      background: white;
    }
    .card img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
    .card-content {
      padding: 1rem 0;
    }
    .render-count {
      color: #22c55e;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
    .last-update {
      padding: 0.5rem;
      background-color: #f0fff4;
      border-radius: 4px;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }
  `]
})
export class CardsListComponent {
  @Input() cards: Card[] = [];
  lastUpdateTime = new Date().toLocaleTimeString();
  private renderCounts: Record<number, number> = {};

  ngOnChanges() {
    this.lastUpdateTime = new Date().toLocaleTimeString();
  }

  getRenderCount(cardId: number): number {
    this.renderCounts[cardId] = (this.renderCounts[cardId] || 0) + 1;
    console.log(`Card ${cardId} rendered ${this.renderCounts[cardId]} times`);
    return this.renderCounts[cardId];
  }
}
