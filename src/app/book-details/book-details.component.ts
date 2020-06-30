import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { BookDetailsService } from "../book-details.service";

@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.scss"],
})
export class BookDetailsComponent implements OnInit {
  book;

  constructor(
    private route: ActivatedRoute,
    private bookDetailsService: BookDetailsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.bookDetailsService.fetchBook(id)
      .subscribe(book => {
        console.log(book)
        this.book = book
      })
  }
}
