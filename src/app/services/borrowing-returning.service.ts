import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iborrowbookshow } from '../models/iborrowbookshow';

@Injectable({
  providedIn: 'root'
})
export class BorrowingReturningService {

  constructor(private readonly httpclient:HttpClient) { }
  addBorrow(borrowdata:any){
    const borrowapiUrl="https://booklending-api-raghda-test.jahezteam.com/api/BorrowBook/Borrow";
    return this.httpclient.post(borrowapiUrl,borrowdata);

  }
  // getBorrowBookforUser(userid:string):Observable<Iborrowbookshow[]>{
  //   const userborrowUrl="https://booklending-api-raghda-test.jahezteam.com/api/BorrowBook/DisplaybooksforOneMember";
  //   return this.httpclient.get<Iborrowbookshow[]>(`${userborrowUrl}?userId=${userid}`)
  // }
 getBorrowBookforUser(userid:string){
    const userborrowUrl="https://booklending-api-raghda-test.jahezteam.com/api/BorrowBook/DisplaybooksforOneMember";
    return this.httpclient.get<Iborrowbookshow[]>(`${userborrowUrl}?userId=${userid}`)
  }
 returnBook(bookId: number,userid:string){
    const return_url="https://booklending-api-raghda-test.jahezteam.com/api/BorrowBook/ReturnBook"
    return this.httpclient.put(`${return_url}?BookId=${bookId}&userId=${userid}`, {});
  }
  // returnBook(bookId: number,userid:string): Observable<any> {
  //   const return_url="https://booklending-api-raghda-test.jahezteam.com/api/BorrowBook/ReturnBook"
  //   return this.httpclient.put(`${return_url}?BookId=${bookId}&userId=${userid}`, {});
  // }
  getOverdueBorrowedBooks(pageNumber: number, pageSize: number): Observable<any> {
    const borrowB_url=`https://booklending-api-raghda-test.jahezteam.com/api/BorrowBook/DisplayAll?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.httpclient.get<any>(borrowB_url);
  }


}
