import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books;

  constructor(
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.bookService.fetchBooks();
    this.books = this.bookService.getBooks();
    console.log(this.books)
  }

}
