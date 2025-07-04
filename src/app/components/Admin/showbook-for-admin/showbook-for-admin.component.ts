import { Component, OnInit } from '@angular/core';
import { IBook } from '../../../models/i-book';
import { BooksService } from '../../../services/books.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-showbook-for-admin',
  imports: [
    CommonModule,
    RouterLink
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
  isLoading: boolean = false;
  constructor(private bookservice:BooksService,private loginService:LoginService, private router: Router){}
  ngOnInit(): void {
    this.getallBooks();
  }
  getallBooks(pageNumber: number = 1) {
    this.isLoading=true;
    this.bookservice.getbooks(pageNumber, this.psize).subscribe({
      next: (data:any) => {
        this.books = data.items;
        this.totalCount = data.totalCount;
        this.pnum = pageNumber;
        this.isLoading=false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading=false;
      }
    });
  }
 
 confirmDelete(id: string) {
  this.isLoading=true;
  const confirmed = confirm('Are you sure you want to delete this book?');
  if (confirmed) {
    this.bookservice.DeleteBook(id).subscribe({
      next: () => {
        this.successMessage = 'Book deleted successfully!';
        this.errorMessage = null;
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
        this.getallBooks(); 
        this.isLoading=false;
      },
      error: () => {
        this.errorMessage = 'Failed to delete book.';
         this.successMessage = null;
         setTimeout(() => {
          this.errorMessage = null;
        }, 2000);
        this.isLoading=false;

      }
    });
  }
}
logout() {
    this.loginService.logout(); 
    this.router.navigate(['/login']); 
  }
}
