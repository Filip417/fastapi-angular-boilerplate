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
    const apiUrl = environment.apiUrl?.replace(/\/$/, '') ?? '';
    const isHttpsPage = window.location.protocol === 'https:';
    const isInsecureApi = apiUrl.startsWith('http://');
    const useSameOriginProxy = !apiUrl || (isHttpsPage && isInsecureApi);
    const baseUrl = useSameOriginProxy ? '' : apiUrl;
    console.log('API URL:', apiUrl);
    console.log('Using same-origin proxy:', useSameOriginProxy);

    const url = `${baseUrl}/api/v1/hello`;
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
