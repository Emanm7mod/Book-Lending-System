import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BooksService } from '../../../services/books.service';
import { IeditBook } from '../../../models/iedit-book';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent implements OnInit {
  bookId!: number;
  bookData: IeditBook = {name: '',
                          quantity: 1,
                          author:'',
                          isbn:'',
                          publishedYear:0,
                          description:'',
                          coverImageUrl:'',
                           isDeleted: false
                          };
  successMessage: string | null = null;
  errorMessage: string | null = null;
  messageTimeout: any;
  currentYear = new Date().getFullYear();
  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id')!);
    console.log('bookId:', this.bookId);

    this.loadBook();
  }

  loadBook() {
    this.bookService.getBookbyId(this.bookId).subscribe({
      next: (data: any) => {
        this.bookData = {
          name: data.name,
          quantity: data.quantity,
          author:data.author,
          isbn:data.isbn,
          publishedYear:data.publishedYear,
          description:data.description,
          coverImageUrl:data.coverImageUrl,
          isDeleted: data.isDeleted ?? false 
        };
        
      },
      error: () => alert('Failed to load book'),
    });
  }

  updateBook() {
  //   console.log('Updating with data:', this.bookData); 
  // console.log('Book ID:', this.bookId); 
    this.bookService.UpdateBook(this.bookId, this.bookData).subscribe({
      next: () => {
        this.successMessage = 'Edit Book successfully!';
        this.errorMessage = null;
         setTimeout(() => {
        this.router.navigate(['/bookforadmin']);
      }, 1500);
      },
      error: () =>{
         this.errorMessage = 'Failed to edit book.';
         this.successMessage = null;
      } 
    });
  }
}
