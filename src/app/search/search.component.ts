import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  input = ""
  shortened = ""
  constructor(private http: HttpClient) {}

  enshort() {
    this.search(this.input).then(result => {
      if (!this.input) {
        return
      }
      this.shortened = result
    })
  }

  async search(link: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get<{shorturl: string}>(`${environment.apiUrl}?format=json&url=${link}`).subscribe({
        next: (response) => resolve(response.shorturl),
        error: reject
      })
    })
  }
}
