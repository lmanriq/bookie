import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import * as convert from 'xml-js';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { FormControl,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books;
  searches=[];
  searchTerm:string=""
  searchField:FormControl;
  private searchTextSubject = new Subject<string>()

  constructor(
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.searchField = new FormControl();
    this.searchField.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged()
    ).subscribe(term =>{
      this.searches.push(term);
      this.searchTerm = term;
    })
    this.bookService.fetchBooks().subscribe((data) => {
      console.log("data", data)
      this.books = data
    });
    
  }

  findBooks(){
    console.log('SearchTerm',this.searchTerm)
    this.bookService.fetchBooks(this.searchTerm).subscribe((data) => {
      console.log("data", data)
      this.books = data
    });
  }


}
