import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-boilerplate';
  helloMessage = 'Loading backend...';

  ngOnInit(): void {
    fetch(`${environment.apiUrl}/api/v1/hello`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json() as Promise<{ message?: string }>;
      })
      .then((data) => {
        this.helloMessage = data.message ?? 'Hello from backend';
      })
      .catch(() => {
        this.helloMessage = 'Backend not reachable';
      });
  }
}
