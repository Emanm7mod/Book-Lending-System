import { Component, OnInit } from '@angular/core';
import { IBook } from '../../models/i-book';
import { BooksService } from '../../services/books.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Iborrowbook } from '../../models/iborrowbook';
import { BorrowingReturningService } from '../../services/borrowing-returning.service';
import { log } from 'console';
import { TokenServiceService } from '../../services/token-service.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-books',
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    HeaderComponent
],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{
  books: IBook[] = [];
  pnum:number=1;
  psize:number=8;
  totalCount: number = 0; 
  Math = Math;
  newborrowbook:Iborrowbook[]=[];

  successMessage: string | null = null;
  errorMessage: string | null = null;
  messageTimeout: any;

  constructor(private bookservice:BooksService,
              private borrowservice:BorrowingReturningService,
              private tokenser:TokenServiceService){}
  ngOnInit(): void {
    this.getallBooks();
  }
 
  getallBooks(pageNumber: number = 1) {
  this.bookservice.getbooks(pageNumber, this.psize).subscribe({
    next: (data:any) => {
      console.log(data)
      this.books = data.items;
      this.totalCount = data.totalCount;
      this.pnum = pageNumber;
    },
    error: (err) => {
      console.log(err);
    }
  });
 }

//  borrowBook(book:IBook){
//   const iduser = this.tokenser.getUserId();
// // console.log("iduser",iduser);
// // console.log('book:', book);

//   const borrowData: Iborrowbook = {
//     userId: iduser ??'',
//     // userId:'e4ccd28e-d076-4c45-a21b-6bbf0ea52c92', 
//     id: Number(book.id)
//   };
  
//   return this.borrowservice.addBorrow(borrowData).subscribe({
//     next:(data)=>{
//       console.log(data)
//       console.log("borrow success")
//       this.successMessage = 'Book added successfully!';
//         this.errorMessage = null;
//       setTimeout(() => {
//         this.successMessage = null;
//       }, 1000);
//     },
//     error:(err)=>{
//       console.log(err)
//       console.log("borrow faild")
//       this.errorMessage = 'Failed to add book.';
//         this.successMessage = null;
//         setTimeout(() => {
//         this.errorMessage = null;
//       }, 1000);
//     }
//   })
//  }

borrowBook(book: IBook) {
  const userId = this.tokenser.getUserId();
console.log(userId)
  if (!userId) {
    this.errorMessage = 'User not found.';
    setTimeout(() => (this.errorMessage = null), 2000);
    return;
  }

  
  this.borrowservice.getBorrowBookforUser(userId).subscribe({
    next: (borrowedBooks) => {
      // if (borrowedBooks && borrowedBooks.length > 0) {
      //   this.errorMessage = 'You already borrowed a book. Please return it before borrowing another.';
      //   this.successMessage = null;
      //   setTimeout(() => (this.errorMessage = null), 3000);
      //   return;
      // }

       const hasUnreturnedBook = borrowedBooks.some(book => book.statusBook !== 'Returned');

      if (hasUnreturnedBook) {
        this.errorMessage = 'You already borrowed a book. Please return it before borrowing another.';
        this.successMessage = null;
        setTimeout(() => (this.errorMessage = null), 3000);
        return;
      }
      const borrowData: Iborrowbook = {
        userId: userId,
        bookId: Number(book.id)
      };

      this.borrowservice.addBorrow(borrowData).subscribe({
        next: (data) => {
          this.successMessage = 'Book borrowed successfully!';
          this.errorMessage = null;
          setTimeout(() => (this.successMessage = null), 2000);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = 'Failed to borrow book.';
          this.successMessage = null;
          setTimeout(() => (this.errorMessage = null), 2000);
        }
      });
    },
    error: (err) => {
      console.log(err);
      this.errorMessage = 'Could not fetch borrowed books.';
      setTimeout(() => (this.errorMessage = null), 2000);
    }
  });
}

}
