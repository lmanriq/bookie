import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import * as convert from 'xml-js';

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
    this.bookService.fetchBooks().subscribe((data) => {
      console.log("data", data)
      this.books = data
    });
    
  }

}
