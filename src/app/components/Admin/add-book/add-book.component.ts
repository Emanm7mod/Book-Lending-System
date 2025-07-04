import { Component, OnInit } from '@angular/core';
import { IBook } from '../../../models/i-book';
import { BooksService } from '../../../services/books.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-add-book',
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit{
 
  constructor(private myserv:BooksService, private router:Router){}
  ngOnInit(): void {
  }
  currentYear = new Date().getFullYear();
  newbook:IBook={id:0,
                name: '',
                quantity: 1,
                author:'',
                isbn:'',
                publishedYear:0,
                description:'',
                coverImageUrl:''
              }

  successMessage: string | null = null;
  errorMessage: string | null = null;
  messageTimeout: any;

  addbook() {
    this.myserv.AddBook(this.newbook).subscribe({
      next: () => {
        this.successMessage = 'Book added successfully!';
        this.errorMessage = null;
        setTimeout(() => {
          this.router.navigate(['/bookforadmin']);
        }, 1500);
      },
      error: () => {
        this.errorMessage = 'Failed to add book.';
        this.successMessage = null;
      }
    });
  }

}
