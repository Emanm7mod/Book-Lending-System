import { Component, OnInit,} from '@angular/core';
import { BorrowingReturningService } from '../../../services/borrowing-returning.service';
import { TokenServiceService } from '../../../services/token-service.service';
import { BooksService } from '../../../services/books.service';
import { CommonModule } from '@angular/common';
import { Iborrowbookshow } from '../../../models/iborrowbookshow';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-library',
  imports: [
    CommonModule,
    FormsModule
],
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css']
})
export class MyLibraryComponent implements OnInit{
  borrowedBooks: any[] = [];
  notReturnedBooks: any[] = []; 
  userId: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedFilter: string = 'all';
  isLoading: boolean = false;
  constructor(
    private borrowService: BorrowingReturningService,
    private tokenService: TokenServiceService,
    private booksService: BooksService
  ) {}
  ngOnInit(): void {
    this.userId = this.tokenService.getUserId(); 
    this.loadBorrowedBooks();
    this.getnotReturnedBooks();
  }
loadBorrowedBooks() {
  this.isLoading=true;
  if (this.userId) {
    this.borrowService.getBorrowBookforUser(this.userId).subscribe({
      next: (data) => {
      this.borrowedBooks = data;
      this.isLoading=false;
      },
      error: (err) => {
        console.error('Error fetching borrowed books:', err);
        this.isLoading=false;
      }
    });
  }
}
getnotReturnedBooks(){
  this.isLoading=true;
  if(this.userId){
    this.borrowService.getoverdueReturnBookForMember(this.userId).subscribe({
      next:(data)=>{
        this.notReturnedBooks=data;
        this.isLoading=false;
      },
      error:(err)=>{
        console.error('Error fetching overdue returned books:', err);
        this.isLoading=false;
      }
    })
  }
}
onFilterChange(value: string) {
  this.selectedFilter = value;
  if (value === 'all') {
    this.loadBorrowedBooks();
  } else if (value === 'overdue') {
    this.getnotReturnedBooks();
  }
}

returnBook(book: Iborrowbookshow) {
  const userId = this.tokenService.getUserId();
  if (!book.bookId || !userId) {
    this.errorMessage = 'Cannot return the book. Missing data.';
    return;
  }
  this.borrowService.returnBook(book.bookId, userId).subscribe({
    next: (data) => {
      this.successMessage = 'Book returned successfully!';
      this.errorMessage = null;
      console.log('data return ',data)
      this.borrowedBooks = this.borrowedBooks.map(b => {
      if (b.bookId === book.bookId) {
        return {
          ...b,
          statusBook: 'Returned'
        };
      }
      return b;
    });

      setTimeout(() => (this.successMessage = null), 3000);
    },
    error: (err) => {
      console.error('Error while returning book:', err);
      this.errorMessage = 'Failed to return the book.';
      this.successMessage = null;
      setTimeout(() => (this.errorMessage = null), 3000);
    }
  });
}


getExpectedReturnDate(borrowDate: Date): Date {
  const borrow = new Date(borrowDate);
  borrow.setDate(borrow.getDate() + 7);
  return borrow;
}

}
