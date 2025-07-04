import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '../models/i-book';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  // private readonly book_api="https://booklending-api-raghda-test.jahezteam.com/api/Book/GetBooks";
  // private readonly bookId_api="https://booklending-api-raghda-test.jahezteam.com/api/Book/GetBook";
  // private readonly addBook_api="https://booklending-api-raghda-test.jahezteam.com/api/Book";
  constructor(private readonly http:HttpClient) { }
  getbooks(pageNumber: number, pageSize: number): Observable<any> {
    // const url = `https://booklending-api-raghda-test.jahezteam.com/api/Book/GetBooks?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<any>(`${environment.baseurl}/Book/GetBooks?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getBookbyId(id:number){
    return this.http.get(`${environment.baseurl}/Book/GetBook?bookId=${id}`);
  }
  AddBook(bookdata:any){
    return this.http.post(`${environment.baseurl}/Book`,bookdata);
  }
  DeleteBook(id:string){
    return this.http.delete(`${environment.baseurl}/Book?bookId=${id}`);
  }
  UpdateBook(id: number, bookData: any) {
    return this.http.put(`${environment.baseurl}/Book?bookId=${id}`, bookData);
  }
}
