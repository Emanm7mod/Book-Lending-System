import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iborrowbookshow } from '../models/iborrowbookshow';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BorrowingReturningService {
  private readonly borrowapiUrl=`${environment.baseurl}/BorrowBook`;
  constructor(private readonly httpclient:HttpClient) { }
  addBorrow(borrowdata:any){
    return this.httpclient.post(`${this.borrowapiUrl}/Borrow`,borrowdata);

  }
 getBorrowBookforUser(userid:string){
    const userborrowUrl=`${this.borrowapiUrl}/DisplaybooksforOneMember?userId=${userid}`;
    return this.httpclient.get<Iborrowbookshow[]>(userborrowUrl)
  }
  getoverdueReturnBookForMember(userid:string):Observable<any>{
    const overdueReturn_url=`${this.borrowapiUrl}/DisplayNotReturnbooksforOneMember?userId=${userid}`;
    return this.httpclient.get<any>(overdueReturn_url);
  }
  returnBook(bookId: number,userid:string){
      const return_url=`${this.borrowapiUrl}/ReturnBook?BookId=${bookId}&userId=${userid}`;
      return this.httpclient.put(`${return_url}`, null,{ responseType: 'text' });
  }
  
  getBorrowedBooksforadmin(pageNumber: number, pageSize: number): Observable<any> {
    const borrowB_url=`${this.borrowapiUrl}/DisplayAll?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.httpclient.get<any>(borrowB_url);
  }
  getbookoverdueforadmin(pageNumber:number,pageSize:number): Observable<any>{
    const overdue_url=`${this.borrowapiUrl}/DisplaybooksOverDue?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.httpclient.get<any>(overdue_url);
  }
  
}
