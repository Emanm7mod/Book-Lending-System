import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '../models/i-book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private readonly book_api="https://booklending-api-raghda-test.jahezteam.com/api/Book/GetBooks";
  private readonly bookId_api="https://booklending-api-raghda-test.jahezteam.com/api/Book/GetBook";
  private readonly addBook_api="https://booklending-api-raghda-test.jahezteam.com/api/Book";
  constructor(private readonly http:HttpClient) { }
  // getbooks(){
  //   return this.http.get(this.book_api);
  // }
getbooks(pageNumber: number, pageSize: number): Observable<any> {
  const url = `https://booklending-api-raghda-test.jahezteam.com/api/Book/GetBooks?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return this.http.get<any>(url);
}

getBookbyId(id:number){
  return this.http.get(`${this.bookId_api}?bookId=${id}`);
}
AddBook(bookdata:any){
  return this.http.post(this.addBook_api,bookdata);
}
DeleteBook(id:string){
  return this.http.delete(`${this.addBook_api}?bookId=${id}`);
}
UpdateBook(id: number, bookData: any) {
  return this.http.put(`${this.addBook_api}?bookId=${id}`, bookData);
}

}
