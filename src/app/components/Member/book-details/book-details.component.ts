import { Component, OnInit } from '@angular/core';
import { IBook } from '../../../models/i-book';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BooksService } from '../../../services/books.service';
import { CommonModule } from '@angular/common';
import { TokenServiceService } from '../../../services/token-service.service';
import { BorrowingReturningService } from '../../../services/borrowing-returning.service';
import { Iborrowbook } from '../../../models/iborrowbook';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule,RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit{
  book:IBook= {
                id:0,
                name: '',
                quantity: 1,
                author:'',
                isbn:'',
                publishedYear:0,
                description:'',
                coverImageUrl:''
              };
  bookid:number=0;

  successMessage: string | null = null;
  errorMessage: string | null = null;
  borrowedBookIds: number[] = [];
  books: IBook[] = [];
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute,
             private bookService: BooksService,
            private bookservice: BooksService,
            private borrowservice: BorrowingReturningService,
            private tokenser: TokenServiceService){}
  ngOnInit(): void {
    this.bookid = Number(this.route.snapshot.paramMap.get('id')!);
    this.getbookbyid();
    this.loadUserBorrowedBooks();
  }
  getbookbyid(){
     this.isLoading = true;
    this.bookService.getBookbyId(this.bookid).subscribe({
      next: (data: any) => {
        this.book = {
          id:data.id,
          name: data.name,
          quantity: data.quantity,
          author:data.author,
          isbn:data.isbn,
          publishedYear:data.publishedYear,
          description:data.description,
          coverImageUrl:data.coverImageUrl
        };
        console.log('Cover Image URL:', this.book.coverImageUrl);
         this.isLoading = false;

      },
      error: () => {
        alert('Failed to load book');
        this.isLoading=false;
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
  borrowBook(book: IBook) {
      const userId = this.tokenser.getUserId();
      if (!userId) {
        this.errorMessage = 'User not found.';
        setTimeout(() => (this.errorMessage = null), 2000);
        return;
      }
  
      this.borrowservice.getBorrowBookforUser(userId).subscribe({
        next: (borrowedBooks) => {
          const hasUnreturnedBook = borrowedBooks.some(book => book.statusBook !== 'Returned');
          if (hasUnreturnedBook) {
            this.errorMessage = 'You already borrowed a book. Please return it before borrowing another.';
            setTimeout(() => (this.errorMessage = null), 3000);
            return;
          }
  
          const borrowData: Iborrowbook = {
            userId: userId,
            bookId: Number(book.id)
          };
  
          this.borrowservice.addBorrow(borrowData).subscribe({
            next: () => {
              this.successMessage = 'Book borrowed successfully!';
              book.quantity--;
              this.borrowedBookIds.push(book.id);
              setTimeout(() => (this.successMessage = null), 2000);
            },
            error: () => {
              this.errorMessage = 'Failed to borrow book.';
              setTimeout(() => (this.errorMessage = null), 2000);
            }
          });
        },
        error: (err) => {
          this.errorMessage = 'Could not fetch borrowed books.';
          setTimeout(() => (this.errorMessage = null), 2000);
        }
      });
    }

    returnBook(book: IBook): void {
    const userId = this.tokenser.getUserId();
    if (!book.id || !userId) {
      this.errorMessage = 'Cannot return the book. Missing data.';
      return;
    }

    this.borrowservice.returnBook(book.id, userId).subscribe({
      next: () => {
        this.successMessage = 'Book returned successfully!';
        book.quantity++;
        this.borrowedBookIds = this.borrowedBookIds.filter(id => id !== book.id);
        this.books = [...this.books];
        setTimeout(() => (this.successMessage = null), 3000);
      },
      error: () => {
        this.errorMessage = 'Failed to return the book.';
        setTimeout(() => (this.errorMessage = null), 3000);
      }
    });
  }
}
