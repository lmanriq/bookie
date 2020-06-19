import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BookService {
  books: any = [];

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.books;
  }

  fetchBooks() {
    this.http
      .get(
        "https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=gVaqhjHYCZAaMbj0N03UQA&q=Douglas+Adams",
        {responseType: 'json'}
      )
      .subscribe((data) => {
        console.log(data)

      });
  }
  
 
}

'<key><subkey1>this</subkey1></key>'
'{key:{subkey1:this}}'