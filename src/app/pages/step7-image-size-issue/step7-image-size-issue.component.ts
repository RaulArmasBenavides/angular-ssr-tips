import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-step7-image-size-issue',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 7: Image Size Issues</h1>
        <nav>
          <a routerLink="/step-6">← Previous</a>
          <a routerLink="/step-8" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Problem</h2>
        <p>
          Loading full-size images regardless of the device's screen size wastes bandwidth
          and slows down page load. Check the Network tab to see the actual image sizes being downloaded.
        </p>

        <div class="performance-impact">
          <h3>Issues:</h3>
          <ul>
            <li>Mobile devices download desktop-sized images</li>
            <li>Unnecessary bandwidth usage</li>
            <li>Slower page load times</li>
            <li>Higher data costs for users</li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Problematic Code:</h3>
          <pre><code>
&lt;img
  ngSrc="https://picsum.photos/1080/720"
  width="1080"
  height="720"
  alt="Large image"
/&gt;
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Open Chrome DevTools, go to the Network tab, and check the size of images being downloaded.
          Try resizing your browser window - the same large images are always downloaded.
        </p>

        <div class="image-container">
          <img
            src="https://picsum.photos/1080/720"
            width="1080"
            height="720"
            alt="Large image"
            priority="true"
          >
          <p class="image-info">
            This image is always 1080x720 pixels, even on mobile devices.
            Check the Network tab to see its size.
          </p>
        </div>

        <div class="cards-container">
          @for (i of [1, 2, 3, 4]; track i) {
            <div class="card">
              <img
                src="https://picsum.photos/1080/720?random={{i}}"
                alt="Card image {{i}}"
              >
              <p>Card {{i}}</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    nav a {
      margin-left: 1rem;
      text-decoration: none;
      color: #4a5568;
    }
    .next {
      background-color: #4a5568;
      color: white !important;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }
    .explanation {
      background-color: #fff5f5;
      border: 1px solid #feb2b2;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 2rem;
    }
    .performance-impact {
      background-color: #fffaf0;
      border: 1px solid #fbd38d;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .code-example {
      background-color: #2d3748;
      color: #fff;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .code-example code {
      white-space: pre;
    }
    .instructions {
      background-color: #ebf8ff;
      border: 1px solid #90cdf4;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .image-container {
      margin: 2rem 0;
      border: 1px solid #e2e8f0;
      padding: 1rem;
      border-radius: 4px;
    }
    .image-container img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
    .image-info {
      margin-top: 1rem;
      padding: 1rem;
      background-color: #ebf8ff;
      border-radius: 4px;
    }
    .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .card {
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 4px;
      background: white;
    }
    .card img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
  `]
})
export class Step7ImageSizeIssueComponent {}
