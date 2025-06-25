import { Component, OnInit } from '@angular/core';
import { IBook } from '../../models/i-book';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-showbook-for-admin',
  imports: [
    CommonModule,
    RouterLink,
    NavComponent
],
  templateUrl: './showbook-for-admin.component.html',
  styleUrl: './showbook-for-admin.component.css'
})
export class ShowbookForAdminComponent implements OnInit {
books: IBook[] = [];
  pnum:number=1;
  psize:number=5;
  totalCount: number = 0; 
  Math = Math;
  successMessage: string | null = null;
errorMessage: string | null = null;
messageTimeout: any;
  constructor(private bookservice:BooksService,private loginService:LoginService, private router: Router){}
  ngOnInit(): void {
    this.getallBooks();
  }
  getallBooks(pageNumber: number = 1) {
    this.bookservice.getbooks(pageNumber, this.psize).subscribe({
      next: (data:any) => {
        this.books = data.items;
        this.totalCount = data.totalCount;
        this.pnum = pageNumber;
        // console.log(data)
      },
      error: (err) => {
        console.log(err);
        // alert('Failed to delete book');
      }
    });
  }
 deletebook(){

 }
 confirmDelete(id: string) {
  const confirmed = confirm('Are you sure you want to delete this book?');
  // console.log('Trying to delete book with ID:', id);

  if (confirmed) {
    this.bookservice.DeleteBook(id).subscribe({
      next: () => {
        // alert('Book deleted successfully');
        this.successMessage = 'Book deleted successfully!';
        this.errorMessage = null;
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);

        // this.getallBooks(); 
      },
      error: () => {
        // alert('Failed to delete book');
        this.errorMessage = 'Failed to delete book.';
         this.successMessage = null;
         setTimeout(() => {
          this.errorMessage = null;
        }, 2000);

      }
    });
  }
}
logout() {
    this.loginService.logout(); 
    this.router.navigate(['/login']); 
  }
}
