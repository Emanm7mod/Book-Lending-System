import { Component } from '@angular/core';
import { IBook } from '../../models/i-book';
import { BooksService } from '../../services/books.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-add-book',
  imports: [
    FormsModule,
    CommonModule,
    NavComponent
],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
 
  constructor(private myserv:BooksService, private router:Router){}
  newbook:IBook={id:'',name:'',quantity:0}

  successMessage: string | null = null;
  errorMessage: string | null = null;
  messageTimeout: any;

  addbook() {
    this.myserv.AddBook(this.newbook).subscribe({
      next: () => {
        this.successMessage = 'Book added successfully!';
        this.errorMessage = null;
      
        // this.Message();
        setTimeout(() => {
          this.router.navigate(['/bookforadmin']);
        }, 1500);
      },
      error: () => {
        this.errorMessage = 'Failed to add book.';
        this.successMessage = null;

        // this.Message();
      }
    });
  }

  // Message() {
  //   clearTimeout(this.messageTimeout); // clear previous timeout if any
  //   this.messageTimeout = setTimeout(() => {
  //     this.successMessage = null;
  //     this.errorMessage = null;
  //   }, 1000);
  // }

}
