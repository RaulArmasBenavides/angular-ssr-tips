import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/card.interface';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <img [src]="card.imageUrl" [alt]="card.title">
      <h3>{{ card.title }}</h3>
      <p>Component Instance ID: {{ instanceId }}</p>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 4px;
    }
    .card img {
      width: 100%;
      height: auto;
    }
  `]
})
export class CardItemComponent {
  @Input() card!: Card;
  instanceId = Math.random().toString(36).substring(7);

  // ngOnInit() {
  //   console.log(`Card Component ${this.card.id} created with instance ID: ${this.instanceId}`);
  // }
}
