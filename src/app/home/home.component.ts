import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { FormControl,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books;
  filteredResults;
  newSearchField:FormControl;
  filterField:FormControl;

  constructor(
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.newSearchField = new FormControl();
    this.filterField = new FormControl();
    this.bookService.fetchBooks().subscribe((data) => {
      this.books = data
      this.filteredResults = data
    });
    
  }

  findBooks(){
    console.log(this.newSearchField.value)
    this.bookService.fetchBooks(this.newSearchField.value).subscribe((data) => {
      this.books = data
    });
  }

  filterBooks(){
    const filterString = this.filterField.value.toLowerCase()
    this.filteredResults = this.books.filter(book => {
      return(
        book.best_book.author.name._text.toLowerCase().includes(filterString)||
        book.best_book.title._text.toLowerCase().includes(filterString)
      )
    })
    
  }

}
