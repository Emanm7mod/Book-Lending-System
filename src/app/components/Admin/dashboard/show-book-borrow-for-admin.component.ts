import { Component } from '@angular/core';
import { BorrowingReturningService } from '../../../services/borrowing-returning.service';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../../services/books.service';
import { IBook } from '../../../models/i-book';

@Component({
  selector: 'app-show-book-borrow-for-admin',
  imports: [
    CommonModule
  ],
  templateUrl: './show-book-borrow-for-admin.component.html',
  styleUrl: './show-book-borrow-for-admin.component.css'
})
export class ShowBookBorrowForAdminComponent {
  records: any[] = [];
  overduebooks:any[]=[];
  totalCount = 0;
  pageNumber = 1;
  pageSize = 10;
  totalPages: number = 0;
  books: IBook[] = [];
  totalBooks: number = 0;
  totalOverdue: number = 0;
  totalBorrows: number = 0;
  totalReturned: number = 0;
  isLoading: boolean = false;

  constructor(private borrowService: BorrowingReturningService,
             private bookservice:BooksService
             ) {}

  ngOnInit(): void {
    this.selectTab(this.selectedTab);
    this.loadborrowBooks();
    this.loadAllBorrowedBooks();
    this.getallBooks(this.pageNumber);
    this.getoverdueBooks();
  }
  loadAllBorrowedBooks() {
    this.isLoading=true;
    this.borrowService.getBorrowedBooksforadmin(1, 10000).subscribe({
      next: (res) => {
        const allRecords = res.items;
        this.totalReturned = allRecords.filter((item: any) => item.statusBook === 'Returned').length;
        this.isLoading=false;
      },
      error: (err) => {
        console.error('Error loading all borrowed books', err);
        this.isLoading=false;
      }
    });
  }

  getallBooks(pageNumber: number = 1) {
    this.isLoading=true;
    this.bookservice.getbooks(pageNumber, this.pageSize).subscribe({
      next: (data:any) => {
        this.books = data.items;
        this.totalCount = data.totalCount;
        this.pageNumber = pageNumber;
        this.totalBooks = data.totalCount;
        this.isLoading=false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading=false;
      }
    });
  }
  loadborrowBooks() {
    this.isLoading=true;
    this.borrowService.getBorrowedBooksforadmin(this.pageNumber, this.pageSize).subscribe({
      next: (res) => {
        this.records = res.items;
        this.totalCount = res.totalCount;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
        this.totalBorrows = res.totalCount;
        this.isLoading=false;
      },
      error: (err) => {
        console.error('Error loading overdue books', err);
        this.isLoading=false;
      }
    });
  }

  getoverdueBooks(){
    this.isLoading=true;
    this.borrowService.getbookoverdueforadmin(this.pageNumber,this.pageSize).subscribe({
      next:(data)=>{
        this.overduebooks=data.items;
        this.totalCount = data.totalCount;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
        this.totalOverdue = data.totalCount;
        this.isLoading=false;
      },
      error:(err)=>{
        console.error('Error loading overdue books', err);
        this.isLoading=false;
      }
    })
  }
  selectedTab: 'all' | 'overdue' | 'returned' = 'all'; 

  get filteredRecords(): any[] {
    if (this.selectedTab === 'all') {
      return this.records;
    } else if (this.selectedTab === 'overdue') {
      return this.overduebooks;
    } else if (this.selectedTab === 'returned') {
      return this.records.filter(record => record.statusBook === 'Returned');
    }
    return [];
  }
  selectTab(tab: 'all' | 'overdue' | 'returned') {
    this.selectedTab = tab;
    this.pageNumber = 1;
   this.loadDataForCurrentTab();
  }

  loadDataForCurrentTab() {
  if (this.selectedTab === 'all') {
    this.loadborrowBooks();
  } else if (this.selectedTab === 'overdue') {
    this.getoverdueBooks();
  } else if (this.selectedTab === 'returned') {
    this.loadborrowBooks();
  }
}

  nextPage(): void {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadDataForCurrentTab();
    }
  }
  goToPage(page: number):void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.loadDataForCurrentTab();
    }
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadDataForCurrentTab();
    }
  }
}
