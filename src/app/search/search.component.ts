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
    this.search(this.input).then(response => {
      if (!this.input) {
        return
      }
      this.shortened = response.url
    })
  }

  async search(link: string): Promise<{url: string}> {
    return new Promise((resolve, reject) => {
      console.log(link)
      this.http.post<{url: string}>(environment.apiUrl, {link: link}).subscribe({
        next: resolve,
        error: reject
      })
    })
  }
}
