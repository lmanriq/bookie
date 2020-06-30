import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { BookDetailsService } from "../book-details.service";
import * as convert from "xml-js";

@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.scss"],
})
export class BookDetailsComponent implements OnInit {
  book;
  similarBooks;
  id;
  
  constructor(
    private route: ActivatedRoute,
    private bookDetailsService: BookDetailsService,
    private location: Location,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.getBook();
  }

  getBook(): void {
    this.bookDetailsService.fetchBook(this.id).subscribe((book) => {
      console.log(book);
      this.book = book;
      this.similarBooks = book.similar_books.book;
    });
  }
}
