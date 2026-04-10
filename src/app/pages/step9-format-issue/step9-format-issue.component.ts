import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-step9-format-issue',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="container">
      <header class="header">
        <h1>Step 9: Legacy Image Formats</h1>
        <nav>
          <a routerLink="/step-8">← Previous</a>
          <a routerLink="/step-10" class="next">Next Step →</a>
        </nav>
      </header>

      <div class="explanation">
        <h2>The Problem</h2>
        <p>
          Using legacy formats like JPEG and PNG results in larger file sizes
          compared to modern formats like WebP and AVIF.
        </p>

        <div class="performance-impact">
          <h3>Issues:</h3>
          <ul>
            <li>Larger file sizes</li>
            <li>Slower page loads</li>
            <li>More bandwidth usage</li>
            <li>Poor compression</li>
          </ul>
        </div>

        <div class="code-example">
          <h3>Problematic Code:</h3>
          <pre><code>
&lt;img
  src="large-image.jpg"
  alt="Legacy format"
/&gt;
          </code></pre>
        </div>
      </div>

      <div class="demo">
        <p class="instructions">
          Compare these image formats in the Network tab. Notice the file sizes:
        </p>

        <div class="format-comparison">
          <div class="format">
            <h3>JPEG Format (Legacy)</h3>
            <img
              ngSrc="images/jpeg.jpeg"
              width="800"
              height="400"
              alt="JPEG image"
              priority="true"
            >
            <p class="size-info">Original JPEG: ~64KB</p>
          </div>

          <div class="format">
            <h3>PNG Format (Legacy)</h3>
            <img
              ngSrc="images/png.png"
              width="800"
              height="400"
              alt="PNG image"
              priority="true"
            >
            <p class="size-info">PNG version: ~276KB</p>
          </div>
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
    .format-comparison {
      display: grid;
      gap: 2rem;
      margin-top: 2rem;
    }
    .format {
      border: 1px solid #e2e8f0;
      padding: 1rem;
      border-radius: 4px;
    }
    .format img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
    .size-info {
      margin-top: 1rem;
      padding: 0.5rem;
      background-color: #ebf8ff;
      border-radius: 4px;
      text-align: center;
    }
  `]
})
export class Step9FormatIssueComponent {}
