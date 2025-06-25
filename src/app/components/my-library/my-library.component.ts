import { Component, OnInit,} from '@angular/core';
import { BorrowingReturningService } from '../../services/borrowing-returning.service';
import { TokenServiceService } from '../../services/token-service.service';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-my-library',
  imports: [
    CommonModule,
    HeaderComponent
],
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css']
})
export class MyLibraryComponent implements OnInit{
  borrowedBooks: any[] = [];
  allBooks: any[] = []; 
  userId: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private borrowService: BorrowingReturningService,
    private tokenService: TokenServiceService,
    private booksService: BooksService
  ) {}
  ngOnInit(): void {
    this.userId = this.tokenService.getUserId(); 
    this.loadBorrowedBooks();
  }
loadBorrowedBooks() {
  if (this.userId) {
    this.borrowService.getBorrowBookforUser(this.userId).subscribe({
      next: (data) => {
        this.borrowedBooks = data.filter(book => book.statusBook !== 'Returned');
      },
      error: (err) => {
        console.error('Error fetching borrowed books:', err);
      }
    });
  }
}

  returnBook(book: any) {
  const userId = this.tokenService.getUserId();
  
  if (!book.bookId || !userId) {
    this.errorMessage = 'Cannot return the book. Missing data.';
    return;
  }

  this.borrowService.returnBook(book.bookId, userId).subscribe({
    next: () => {
      this.successMessage = 'Book returned successfully!';
      this.errorMessage = null;
      // this.loadBorrowedBooks();
      this.borrowedBooks = this.borrowedBooks.filter(b => b.bookId !== book.bookId);
      setTimeout(() => (this.successMessage = null), 3000);
    },
    error: () => {
      this.errorMessage = 'Failed to return the book.';
      this.successMessage = null;
      setTimeout(() => (this.errorMessage = null), 3000);
    }
  });
}

}
