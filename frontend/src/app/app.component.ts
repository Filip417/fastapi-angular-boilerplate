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
    const url = `${environment.apiUrl}/api/v1/hello`;
    console.log('API URL:', environment.apiUrl);
    console.log('GET', url);
    fetch(url)
      .then((response) => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json() as Promise<{ message?: string }>;
      })
      .then((data) => {
        console.log('Response body:', data);
        this.helloMessage = data.message ?? 'Hello from backend';
      })
      .catch((error) => {
        console.error('Backend request failed:', error);
        this.helloMessage = 'Backend not reachable';
      });
  }
}
