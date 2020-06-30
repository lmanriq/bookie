import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { BookDetailsService } from "../book-details.service";
import * as convert from 'xml-js';

@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.scss"],
})
export class BookDetailsComponent implements OnInit {
  book;
  similarBooks;


  constructor(
    private route: ActivatedRoute,
    private bookDetailsService: BookDetailsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.bookDetailsService.fetchBook(id).subscribe((book) => {
      console.log(book);
      this.book = book;
      this.similarBooks = book.similar_books.book;
    });
  }
}
