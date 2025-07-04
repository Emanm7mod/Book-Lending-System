import { Component, OnInit } from '@angular/core';
import { IBook } from '../../../models/i-book';
import { BooksService } from '../../../services/books.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BorrowingReturningService } from '../../../services/borrowing-returning.service';
import { TokenServiceService } from '../../../services/token-service.service';

@Component({
  selector: 'app-books',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  books: IBook[] = [];
  currentPage: number = 1;
  pageSize: number = 16;
  totalCount: number = 0;
  Math = Math;
  borrowedBookIds: number[] = [];
 isLoading: boolean = false;
  constructor(
    private bookservice: BooksService,
    private borrowservice: BorrowingReturningService,
    private tokenser: TokenServiceService
  ) {}

  ngOnInit(): void {
    this.getallBooks();
    this.loadUserBorrowedBooks();
  }

  getallBooks(pageNumber: number = 1) {
     this.isLoading = true;
    this.bookservice.getbooks(pageNumber, this.pageSize).subscribe({
      next: (data: any) => {
        this.books = data.items;
        this.totalCount = data.totalCount;
        this.currentPage = pageNumber;
         this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
         this.isLoading = false;
      }
    });
  }

  loadUserBorrowedBooks() {
    const userId = this.tokenser.getUserId();
    if (userId) {
      this.borrowservice.getBorrowBookforUser(userId).subscribe({
        next: (borrowedBooks) => {
          this.borrowedBookIds = borrowedBooks
            .filter(book => book.statusBook !== 'Returned')
            .map(book => book.bookId);
        },
        error: () => {
          console.log('Failed to fetch borrowed books.');
        }
      });
    }
  } 


get totalPages(): number {
  return Math.ceil(this.totalCount / this.pageSize);
}

goToPage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.getallBooks(page);
}
}
