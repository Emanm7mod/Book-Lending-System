import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenServiceService } from '../../services/token-service.service';
import { IBook } from '../../models/i-book';
import { BooksService } from '../../services/books.service';
@Component({
  selector: 'app-home',
  imports: [
    CommonModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy{
  books: IBook[] = [];
  pageSize: number = 48;
  pagenum:number=1
  currentindex=0;
  autoPlayInterval:any;
  slidesPerView = 4;
  isLoading: boolean = false;

  constructor(private router: Router, 
              private tokenService: TokenServiceService,
              private bookservice:BooksService
            ) {}
  ngOnDestroy(): void {
    if(this.autoPlayInterval){
      clearInterval(this.autoPlayInterval);
    }
  }
  ngOnInit(): void {
    this.getallBooks();
    this.setResponsiveSlides();
  window.addEventListener('resize', this.setResponsiveSlides.bind(this));
  }

  goToStart(): void {
    const token = this.tokenService.gettoken();
    const role = this.tokenService.getRole();

    if (!token) {
      this.router.navigate(['/login']);
    } else if (role === 'Admin') {
      this.router.navigate(['/bookborrowedAdmin']);
    } else {
      this.router.navigate(['/books']);
    }
  }
  getallBooks() {
    this.isLoading=true;
    this.bookservice.getbooks(this.pagenum, this.pageSize).subscribe({
      next: (data: any) => {
        this.books = data.items;
        this.startAutoplay();
        this.isLoading=false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading=false;
      }
    });
  }
  startAutoplay() {
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 3000);
  }

  stopAutoplay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
   next() {
    const maxIndex = Math.ceil(this.books.length / this.slidesPerView) - 1;
    this.currentindex = (this.currentindex + 1) > maxIndex ? 0 : this.currentindex + 1;
  }

  prev() {
    const maxIndex = Math.ceil(this.books.length / this.slidesPerView) - 1;
    this.currentindex = (this.currentindex - 1) < 0 ? maxIndex : this.currentindex - 1;
  }
  get sliderWidth(): number {
  return Math.ceil(this.books.length / this.slidesPerView) * 100;
}
get bookGroups(): IBook[][] {
  const groups: IBook[][] = [];
  for (let i = 0; i < this.books.length; i += this.slidesPerView) {
    groups.push(this.books.slice(i, i + this.slidesPerView));
  }
  return groups;
}

setResponsiveSlides() {
  const width = window.innerWidth;
  if (width < 768) {
    this.slidesPerView = 1;
  } else if (width < 992) {
    this.slidesPerView = 2;
  } else if (width < 1200) {
    this.slidesPerView = 3;
  } else {
    this.slidesPerView = 4;
  }
}
}
