import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { BorrowingReturningService } from '../../services/borrowing-returning.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-book-borrow-for-admin',
  imports: [
    NavComponent,
    CommonModule
  ],
  templateUrl: './show-book-borrow-for-admin.component.html',
  styleUrl: './show-book-borrow-for-admin.component.css'
})
export class ShowBookBorrowForAdminComponent {
  records: any[] = [];
  totalCount = 0;
  pageNumber = 1;
  pageSize = 10;
  totalPages: number = 0;

  constructor(private borrowService: BorrowingReturningService) {}

  ngOnInit(): void {
    this.loadborrowBooks();
  }

  loadborrowBooks() {
    this.borrowService.getOverdueBorrowedBooks(this.pageNumber, this.pageSize).subscribe({
      next: (res) => {
        this.records = res.items;
        this.totalCount = res.totalCount;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
      },
      error: (err) => {
        console.error('Error loading overdue books', err);
      }
    });
  }

  nextPage(): void {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadborrowBooks();
    }
  }
  goToPage(page: number):void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.loadborrowBooks();
    }
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadborrowBooks();
    }
  }
}
