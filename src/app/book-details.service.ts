import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import * as convert from 'xml-js';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {
  book;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  fetchBook(id) {
    return this.http
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/show/${id}.json?key=gVaqhjHYCZAaMbj0N03UQA`,
        {
          responseType: "text",
        }
      ).pipe(
        // data manipulation, then catch error
        map(response => {
          const jsonData = convert.xml2json(response, {compact: true, spaces: 4});
          this.book = JSON.parse(jsonData).GoodreadsResponse.book;
          return this.book;
        }),
        catchError(error=>{return throwError(error)})
      )
  }
}
