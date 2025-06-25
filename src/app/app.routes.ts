import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { ShowbookForAdminComponent } from './components/showbook-for-admin/showbook-for-admin.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { MyLibraryComponent } from './components/my-library/my-library.component';
import { ShowBookBorrowForAdminComponent } from './components/show-book-borrow-for-admin/show-book-borrow-for-admin.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {path:'books',component:BooksComponent},
    {path:'bookdetails',component:BookDetailsComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegistrationComponent},
    {path:'bookforadmin',component:ShowbookForAdminComponent},
    {path:'bookborrowedAdmin',component:ShowBookBorrowForAdminComponent},
    {path:'addBook',component:AddBookComponent},
    {path:'editBook/:id',component:EditBookComponent},
    {path:'library',component:MyLibraryComponent}
];
