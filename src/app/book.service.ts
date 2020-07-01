import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// const convert = require('xml-js');
// import convert = require('xml-js');
import * as convert from 'xml-js';
import { map,catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class BookService {
  books: any = [];
  

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.books;
  }

  fetchBooks(searchText:string='Douglas Adams') {
    console.log(searchText)
    return this.http
      .get(
        "https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=gVaqhjHYCZAaMbj0N03UQA&q="+searchText,
        {
          responseType: "text",
        }
      ).pipe(
        // data manipulation, then catch error
        map(response => {
          const jsonData = convert.xml2json(response, {compact: true, spaces: 4});
          this.books = JSON.parse(jsonData).GoodreadsResponse.search.results.work;
          return this.books;
        }),
        catchError(error=>{return throwError(error)})
      )
  }

}

