import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'siapffaa-2025';
    onPrimeClick() {
    console.log('Click PrimeNG');
  }

  onBootstrapClick() {
    console.log('Click Bootstrap');
  }
}
